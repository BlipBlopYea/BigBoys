import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from '../src/app.js';

test('database outages fall back to seeded memory for listings, bookings, and real PayMongo checkouts', async t => {
  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.PAYMONGO_SECRET_KEY;
  const originalAppUrl = process.env.APP_URL;
  const sessions = new Map();
  let sessionNumber = 0;
  const unavailable = async () => {
    throw Object.assign(new Error("Can't reach database server at localhost:5432"), { code: 'P1001' });
  };
  const failedDelegate = new Proxy({}, { get: () => unavailable });
  const prisma = {
    equipment: failedDelegate,
    booking: failedDelegate,
    $transaction: unavailable
  };
  process.env.PAYMONGO_SECRET_KEY = 'sk_test_memory_fallback';
  process.env.APP_URL = 'http://localhost:3000';
  globalThis.fetch = async (url, options = {}) => {
    const urlString = String(url);
    if (urlString.endsWith('/checkout_sessions') && options.method === 'POST') {
      const request = JSON.parse(options.body);
      const id = `cs_test_memory_${++sessionNumber}`;
      const session = {
        id,
        attributes: {
          status: 'unpaid',
          checkout_url: `https://paymongo.example/${id}`,
          line_items: request.data.attributes.line_items
        }
      };
      sessions.set(id, session);
      return Response.json({ data: session }, { status: 201 });
    }
    const id = decodeURIComponent(urlString.split('/').pop());
    const session = sessions.get(id);
    if (!session) return Response.json({ errors: [{ detail: 'Session not found.' }] }, { status: 404 });
    session.attributes.status = 'paid';
    return Response.json({ data: session });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined) delete process.env.PAYMONGO_SECRET_KEY;
    else process.env.PAYMONGO_SECRET_KEY = originalSecret;
    if (originalAppUrl === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = originalAppUrl;
  });

  const server = createApp(prisma).listen(0);
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  }));
  const baseUrl = `http://127.0.0.1:${server.address().port}/api`;
  const get = path => originalFetch(`${baseUrl}${path}`);
  const post = (path, body) => originalFetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const patch = (path, body) => originalFetch(`${baseUrl}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const listingResponse = await get('/equipment');
  assert.equal(listingResponse.status, 200);
  const listingResult = await listingResponse.json();
  assert.ok(listingResult.equipment.some(item => item.id === 'demo-equipment-1'));

  const bookingResponse = await post('/bookings', {
    equipmentId: 'demo-equipment-1',
    renterId: 'renter@example.com',
    rentalHours: 8,
    distanceKm: 12.5,
    startDate: '2030-01-10',
    endDate: '2030-01-10'
  });
  assert.equal(bookingResponse.status, 201);
  const booking = (await bookingResponse.json()).booking;
  assert.match(booking.id, /^memory-booking-/);

  const approvalResponse = await patch(`/bookings/${encodeURIComponent(booking.id)}/approve`, { ownerId: 'demo-owner' });
  assert.equal(approvalResponse.status, 200);
  assert.equal((await approvalResponse.json()).booking.bookingStatus, 'AWAITING_PAYMENT');

  const checkoutResponse = await post('/create-checkout-session', { bookingId: booking.id });
  assert.equal(checkoutResponse.status, 201);
  const checkout = await checkoutResponse.json();
  assert.match(checkout.checkout_url, /^https:\/\/paymongo\.example\/cs_test_memory_/);

  const localCheckoutResponse = await post('/create-checkout-session', {
    mock: true,
    bookingId: 'local-booking-77',
    equipmentId: 77,
    rentalHours: 5,
    distanceKm: 8,
    equipmentName: 'Local Demo Excavator',
    hourlyRate: 999,
    baseDeliveryFee: 1500,
    ratePerKm: 45
  });
  assert.equal(localCheckoutResponse.status, 201);
  const localCheckout = await localCheckoutResponse.json();
  assert.match(localCheckout.checkout_url, /^https:\/\/paymongo\.example\//);
  const localPaymentResponse = await get('/mock-checkouts/local-booking-77/status');
  assert.equal(localPaymentResponse.status, 200);
  assert.equal((await localPaymentResponse.json()).bookingStatus, 'PAID_IN_ESCROW');

  const featureResponse = await post('/equipment/local-77/feature-checkout-session', {
    ownerId: 'owner@example.com',
    localEquipment: {
      name: 'Local Demo Excavator',
      hourlyRate: 999,
      baseDeliveryFee: 1500,
      ratePerKm: 45,
      status: 'AVAILABLE'
    }
  });
  assert.equal(featureResponse.status, 201);
  const featureCheckout = await featureResponse.json();
  const featureSession = sessions.get(featureCheckout.checkout_session_id);
  assert.equal(featureSession.attributes.line_items[0].amount, 29900);

  const featureStatusResponse = await get('/equipment/local-77/feature-status?ownerId=owner%40example.com');
  assert.equal(featureStatusResponse.status, 200);
  const featureStatus = await featureStatusResponse.json();
  assert.equal(featureStatus.featured, true);
  assert.equal(featureStatus.equipment.isFeatured, true);
  assert.equal(featureStatus.equipment.boostRegion, 'Davao Region');
});

test('local-only owner listings can use feature checkout while PostgreSQL is available', async t => {
  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.PAYMONGO_SECRET_KEY;
  const originalAppUrl = process.env.APP_URL;
  let session;
  process.env.PAYMONGO_SECRET_KEY = 'sk_test_local_equipment';
  process.env.APP_URL = 'http://localhost:3000';
  const emptyDelegate = {
    findUnique: async () => null,
    findMany: async () => [],
    findFirst: async () => null
  };
  const prisma = {
    equipment: emptyDelegate,
    booking: emptyDelegate,
    $transaction: async callback => callback({ equipment: emptyDelegate, booking: emptyDelegate })
  };
  globalThis.fetch = async (url, options = {}) => {
    if (String(url).endsWith('/checkout_sessions') && options.method === 'POST') {
      const request = JSON.parse(options.body);
      session = {
        id: 'cs_test_local_equipment',
        attributes: {
          status: 'unpaid',
          checkout_url: 'https://paymongo.example/local-equipment',
          line_items: request.data.attributes.line_items
        }
      };
      return Response.json({ data: session }, { status: 201 });
    }
    session.attributes.status = 'paid';
    return Response.json({ data: session });
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalSecret === undefined) delete process.env.PAYMONGO_SECRET_KEY;
    else process.env.PAYMONGO_SECRET_KEY = originalSecret;
    if (originalAppUrl === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = originalAppUrl;
  });

  const server = createApp(prisma).listen(0);
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  }));
  const baseUrl = `http://127.0.0.1:${server.address().port}/api/equipment/local-2`;
  const checkoutResponse = await originalFetch(`${baseUrl}/feature-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ownerId: 'owner@example.com',
      localEquipment: {
        name: 'Local Owner Machine',
        hourlyRate: 999,
        baseDeliveryFee: 1500,
        ratePerKm: 45,
        status: 'AVAILABLE'
      }
    })
  });
  assert.equal(checkoutResponse.status, 201);

  const statusResponse = await originalFetch(`${baseUrl}/feature-status?ownerId=owner%40example.com`);
  assert.equal(statusResponse.status, 200);
  const status = await statusResponse.json();
  assert.equal(status.featured, true);
  assert.equal(status.equipment.isFeatured, true);
});

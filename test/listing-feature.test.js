import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from '../src/app.js';

test('listing feature requires owner match and activates only after the configured PayMongo payment', async t => {
  const originalFetch = globalThis.fetch;
  const originalSecret = process.env.PAYMONGO_SECRET_KEY;
  const originalAppUrl = process.env.APP_URL;
  let sessionStatus = 'unpaid';
  const session = {
    id: 'cs_test_feature',
    attributes: {
      status: sessionStatus,
      checkout_url: 'https://paymongo.example/checkout',
      line_items: [{ amount: 29900, quantity: 1, currency: 'PHP' }]
    }
  };
  const equipment = {
    id: 'equipment-1',
    ownerId: 'owner-1',
    name: 'Test Excavator',
    isFeatured: false,
    featureCheckoutSessionId: null,
    featureCheckoutUrl: null,
    featureLastPaidSessionId: null
  };
  const prisma = {
    equipment: {
      findUnique: async () => ({ ...equipment }),
      findFirst: async ({ where }) => where.OR.some(condition =>
        equipment.featureCheckoutSessionId === condition.featureCheckoutSessionId
        || equipment.featureLastPaidSessionId === condition.featureLastPaidSessionId
      ) ? { ...equipment } : null,
      update: async ({ data }) => {
        Object.assign(equipment, data);
        return { ...equipment };
      }
    }
  };
  process.env.PAYMONGO_SECRET_KEY = 'sk_test_feature';
  process.env.APP_URL = 'http://localhost:3000';
  globalThis.fetch = async (url, options = {}) => {
    if (String(url).endsWith('/checkout_sessions') && options.method === 'POST') {
      const request = JSON.parse(options.body);
      assert.equal(request.data.attributes.line_items[0].amount, 29900);
      assert.equal(request.data.attributes.line_items[0].currency, 'PHP');
      assert.equal(request.data.attributes.metadata.equipment_id, 'equipment-1');
      return Response.json({ data: session }, { status: 201 });
    }
    session.attributes.status = sessionStatus;
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
  const baseUrl = `http://127.0.0.1:${server.address().port}/api/equipment/equipment-1`;
  const wrongOwner = await originalFetch(`${baseUrl}/feature-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId: 'someone-else' })
  });
  assert.equal(wrongOwner.status, 403);

  const checkoutResponse = await originalFetch(`${baseUrl}/feature-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId: 'owner-1' })
  });
  assert.equal(checkoutResponse.status, 201);
  assert.equal((await checkoutResponse.json()).checkout_url, 'https://paymongo.example/checkout');
  assert.equal(equipment.isFeatured, false);

  sessionStatus = 'paid';
  const confirmationResponse = await originalFetch(`${baseUrl}/feature-status?ownerId=owner-1`);
  const confirmation = await confirmationResponse.json();
  assert.equal(confirmationResponse.status, 200);
  assert.equal(confirmation.featured, true);
  assert.equal(equipment.isFeatured, true);
  assert.equal(equipment.boostRegion, 'Davao Region');
  assert.equal(equipment.featureCheckoutSessionId, null);
  const remainingDays = (equipment.featureExpiresAt.getTime() - Date.now()) / 86400000;
  assert.ok(remainingDays > 29.99 && remainingDays <= 30);
});

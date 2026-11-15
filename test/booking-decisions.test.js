import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from '../src/app.js';

test('equipment owner can decline a pending booking', async t => {
  const booking = {
    id: 'booking-1',
    bookingStatus: 'PENDING_APPROVAL',
    equipment: { ownerId: 'owner-1' }
  };
  const prisma = {
    booking: {
      findUnique: async () => ({ ...booking }),
      updateMany: async ({ data }) => {
        booking.bookingStatus = data.bookingStatus;
        return { count: 1 };
      }
    }
  };
  const server = createApp(prisma).listen(0);
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  }));

  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/bookings/booking-1/decline`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerId: 'owner-1' })
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).booking.bookingStatus, 'DECLINED');
});

test('leased equipment cannot be booked on its return date', async t => {
  const returnDate = new Date();
  returnDate.setUTCDate(returnDate.getUTCDate() + 2);
  const returnDateISO = returnDate.toISOString().slice(0, 10);
  const prisma = {
    equipment: {
      findUnique: async () => ({
        id: 'equipment-1',
        status: 'ON_SITE',
        nextAvailableDate: new Date(`${returnDateISO}T00:00:00.000Z`)
      })
    },
    booking: {
      create: async () => assert.fail('A booking on the return date must not be created.')
    }
  };
  const server = createApp(prisma).listen(0);
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  }));

  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      equipmentId: 'equipment-1',
      renterId: 'renter-1',
      rentalHours: 8,
      distanceKm: 10,
      startDate: returnDateISO,
      endDate: returnDateISO
    })
  });
  assert.equal(response.status, 409);
  assert.match((await response.json()).error, /day after its return date/);
});

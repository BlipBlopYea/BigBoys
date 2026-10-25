import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateBookingFinancials } from '../src/booking-financials.js';

test('calculates round-trip travel and the 8/92 revenue split', () => {
  assert.deepEqual(
    calculateBookingFinancials(1250, 8, 3500, 70, 12),
    {
      rentalCost: 10000,
      travelCharge: 1680,
      baseDelivery: 3500,
      grossTotal: 15180,
      platformFeeRetained: 1214.4,
      ownerNetPayout: 13965.6
    }
  );
});

test('rounds calculated financials to cents', () => {
  assert.deepEqual(
    calculateBookingFinancials(0.1, 3, 0.01, 0.25, 0.5),
    {
      rentalCost: 0.3,
      travelCharge: 0.25,
      baseDelivery: 0.01,
      grossTotal: 0.56,
      platformFeeRetained: 0.04,
      ownerNetPayout: 0.52
    }
  );
});

test('rejects invalid booking inputs', () => {
  assert.throws(() => calculateBookingFinancials(100, 0, 10, 1, 1), /hours must be at least 1/);
  assert.throws(() => calculateBookingFinancials(100, 1.5, 10, 1, 1), /hours must be a finite, non-negative integer/);
  assert.throws(() => calculateBookingFinancials(100, 1, 10, 1, -1), /distanceKm must be a finite, non-negative number/);
});

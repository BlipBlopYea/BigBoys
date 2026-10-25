const MAX_MONEY = 9999999999.99;

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function toDecimal(value, fieldName, { integer = false } = {}) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0 || (integer && !Number.isInteger(num))) {
    throw new TypeError(`${fieldName} must be a finite, non-negative${integer ? ' integer' : ' number'}.`);
  }
  return num;
}

function toAmount(num, fieldName) {
  const amount = roundToTwo(num);
  if (amount > MAX_MONEY) {
    throw new RangeError(`${fieldName} exceeds the supported booking amount.`);
  }
  return amount;
}

export function calculateBookingFinancials(hourlyRate, hours, baseDelivery, perKmRate, distanceKm) {
  const hourlyRateNum = toDecimal(hourlyRate, 'hourlyRate');
  const hoursNum = toDecimal(hours, 'hours', { integer: true });
  const baseDeliveryNum = toDecimal(baseDelivery, 'baseDelivery');
  const perKmRateNum = toDecimal(perKmRate, 'perKmRate');
  const distanceNum = toDecimal(distanceKm, 'distanceKm');

  if (hoursNum < 1) {
    throw new TypeError('hours must be at least 1.');
  }

  const rentalCost = toAmount(hourlyRateNum * hoursNum, 'rentalCost');
  const travelCharge = toAmount(distanceNum * 2 * perKmRateNum, 'travelCharge');
  const baseDeliveryAmount = toAmount(baseDeliveryNum, 'baseDelivery');
  const grossTotal = toAmount(rentalCost + baseDeliveryAmount + travelCharge, 'grossTotal');
  const platformFeeRetained = toAmount(grossTotal * 0.08, 'platformFeeRetained');
  const ownerNetPayout = toAmount(grossTotal - platformFeeRetained, 'ownerNetPayout');

  return {
    rentalCost,
    travelCharge,
    baseDelivery: baseDeliveryAmount,
    grossTotal,
    platformFeeRetained,
    ownerNetPayout
  };
}
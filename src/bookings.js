import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { calculateBookingFinancials } from './booking-financials.js';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function requireText(value, fieldName) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ApiError(400, `${fieldName} is required.`);
  }
  return value.trim();
}

function requireNumber(value, fieldName, { integer = false } = {}) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new ApiError(400, `${fieldName} must be a valid number.`);
  }
  const number = value;
  if (number < 0 || (integer && !Number.isInteger(number))) {
    throw new ApiError(400, `${fieldName} must be a non-negative${integer ? ' integer' : ' number'}.`);
  }
  return number;
}

function parseDate(value, fieldName) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new ApiError(400, `${fieldName} must be a date in YYYY-MM-DD format.`);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new ApiError(400, `${fieldName} must be a valid calendar date.`);
  }
  return date;
}

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function createBookingsRouter(prisma) {
  const router = Router();

  router.get('/', asyncHandler(async (req, res) => {
    const renterId = typeof req.query.renterId === 'string' ? req.query.renterId.trim() : '';
    const ownerId = typeof req.query.ownerId === 'string' ? req.query.ownerId.trim() : '';
    if (Boolean(renterId) === Boolean(ownerId)) {
      throw new ApiError(400, 'Provide exactly one of renterId or ownerId.');
    }
    const bookings = await prisma.booking.findMany({
      where: renterId ? { renterId } : { equipment: { ownerId } },
      include: { equipment: { select: { id: true, ownerId: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ bookings });
  }));

  router.post('/', asyncHandler(async (req, res) => {
    const equipmentId = requireText(req.body?.equipmentId, 'equipmentId');
    const renterId = requireText(req.body?.renterId, 'renterId');
    const rentalHours = requireNumber(req.body?.rentalHours, 'rentalHours', { integer: true });
    const distanceKm = requireNumber(req.body?.distanceKm, 'distanceKm');
    const startDate = parseDate(req.body?.startDate, 'startDate');
    const endDate = parseDate(req.body?.endDate, 'endDate');

    if (rentalHours < 1) {
      throw new ApiError(400, 'rentalHours must be at least 1.');
    }
    if (Boolean(startDate) !== Boolean(endDate)) {
      throw new ApiError(400, 'startDate and endDate must be provided together.');
    }
    if (startDate && endDate < startDate) {
      throw new ApiError(400, 'endDate must be on or after startDate.');
    }

    const equipment = await prisma.equipment.findUnique({ where: { id: equipmentId } });
    if (!equipment) {
      throw new ApiError(404, 'Equipment was not found.');
    }
    if (equipment.status === 'MAINTENANCE') {
      throw new ApiError(409, 'Equipment is currently in maintenance.');
    }
    if (equipment.status === 'ON_SITE') {
      const availableDate = equipment.nextAvailableDate?.toISOString().slice(0, 10);
      if (!startDate || !availableDate || startDate.toISOString().slice(0, 10) < availableDate) {
        throw new ApiError(409, 'Equipment is on site and is not available for the selected dates.');
      }
    }
    if (startDate) {
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          equipmentId,
          bookingStatus: { in: ['AWAITING_PAYMENT', 'PAID_IN_ESCROW'] },
          startDate: { lte: endDate },
          endDate: { gte: startDate }
        },
        select: { id: true }
      });
      if (conflictingBooking) {
        throw new ApiError(409, 'The selected dates overlap with an active booking.');
      }
    }

    const distanceDecimal = new Prisma.Decimal(distanceKm);
    if (distanceDecimal.decimalPlaces() > 3 || distanceDecimal.greaterThan('9999999.999')) {
      throw new ApiError(400, 'distanceKm must have at most 3 decimal places and be no greater than 9999999.999.');
    }
    const billableDistanceKm = distanceDecimal.toFixed(3);
    const financials = calculateBookingFinancials(
      equipment.hourlyRate,
      rentalHours,
      equipment.baseDeliveryFee,
      equipment.ratePerKm,
      billableDistanceKm
    );

    const booking = await prisma.booking.create({
      data: {
        equipmentId,
        renterId,
        rentalHours,
        distanceKm: billableDistanceKm,
        startDate,
        endDate,
        rentalCost: financials.rentalCost.toFixed(2),
        baseDeliveryFee: financials.baseDelivery.toFixed(2),
        travelCharge: financials.travelCharge.toFixed(2),
        grossTotal: financials.grossTotal.toFixed(2),
        platformFeeRetained: financials.platformFeeRetained.toFixed(2),
        ownerNetPayout: financials.ownerNetPayout.toFixed(2)
      }
    });

    res.status(201).json({ booking });
  }));

  router.patch('/:bookingId/approve', asyncHandler(async (req, res) => {
    const bookingId = requireText(req.params.bookingId, 'bookingId');
    const ownerId = requireText(req.body?.ownerId, 'ownerId');
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { equipment: true }
    });

    if (!booking) {
      throw new ApiError(404, 'Booking was not found.');
    }
    if (booking.equipment.ownerId !== ownerId) {
      throw new ApiError(403, 'Only the equipment owner can approve this booking.');
    }
    if (booking.bookingStatus !== 'PENDING_APPROVAL') {
      throw new ApiError(409, 'Only bookings pending approval can be approved.');
    }
    if (booking.startDate && booking.endDate) {
      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          id: { not: booking.id },
          equipmentId: booking.equipmentId,
          bookingStatus: { in: ['AWAITING_PAYMENT', 'PAID_IN_ESCROW'] },
          startDate: { lte: booking.endDate },
          endDate: { gte: booking.startDate }
        },
        select: { id: true }
      });
      if (conflictingBooking) {
        throw new ApiError(409, 'Another active booking already overlaps these dates.');
      }
    }

    const result = await prisma.booking.updateMany({
      where: { id: bookingId, bookingStatus: 'PENDING_APPROVAL' },
      data: { bookingStatus: 'AWAITING_PAYMENT' }
    });
    if (result.count !== 1) {
      throw new ApiError(409, 'Booking status changed before approval could be completed.');
    }

    const approvedBooking = await prisma.booking.findUnique({ where: { id: bookingId } });
    res.json({ booking: approvedBooking });
  }));

  return router;
}

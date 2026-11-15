import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { requireAdmin } from './admin-auth.js';
import { ApiError } from './bookings.js';
import { calculateBookingFinancials } from './booking-financials.js';
import { demoEquipment } from './demo-equipment.js';

const PAYMONGO_API_URL = 'https://api.paymongo.com/v1';
const MAX_SIGNATURE_AGE_SECONDS = 300;
const FEATURE_LISTING_PRICE_PHP = 299;
const FEATURE_LISTING_DURATION_DAYS = 30;

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
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
  if (value < 0 || (integer && !Number.isInteger(value))) {
    throw new ApiError(400, `${fieldName} must be a non-negative${integer ? ' integer' : ' number'}.`);
  }
  return value;
}

function getSandboxSecretKey() {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  if (!secretKey || !secretKey.startsWith('sk_test_')) {
    throw new ApiError(503, 'PayMongo Sandbox is not configured. Set PAYMONGO_SECRET_KEY to a sandbox secret key.');
  }
  return secretKey;
}

function getCheckoutRedirects(bookingId, successPayment, cancelPayment, idParameter = 'bookingId') {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  try {
    const successUrl = new URL('/', appUrl);
    const cancelUrl = new URL('/', appUrl);
    successUrl.searchParams.set('payment', successPayment);
    successUrl.searchParams.set(idParameter, bookingId);
    cancelUrl.searchParams.set('payment', cancelPayment);
    cancelUrl.searchParams.set(idParameter, bookingId);
    return { successUrl: successUrl.toString(), cancelUrl: cancelUrl.toString() };
  } catch {
    throw new ApiError(503, 'APP_URL must be a valid absolute URL for checkout redirects.');
  }
}

async function createPayMongoCheckout({ bookingId, equipmentName, amount, successUrl, cancelUrl, metadata = { booking_id: bookingId }, idempotencyKey = `booking-${bookingId}` }) {
  return paymongoRequest('/checkout_sessions', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({
      data: {
        attributes: {
          line_items: [{
            currency: 'PHP',
            amount,
            name: equipmentName,
            quantity: 1
          }],
          payment_method_types: ['card', 'gcash'],
          success_url: successUrl,
          cancel_url: cancelUrl,
          reference_number: bookingId,
          metadata
        }
      }
    })
  });
}

function requireCheckoutUrl(session) {
  const checkoutUrl = session.attributes?.checkout_url;
  if (typeof checkoutUrl !== 'string' || !checkoutUrl.startsWith('https://')) {
    throw new ApiError(502, 'PayMongo did not return a valid checkout URL.');
  }
  return checkoutUrl;
}

async function paymongoRequest(path, options = {}) {
  const secretKey = getSandboxSecretKey();
  const response = await fetch(`${PAYMONGO_API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });

  const responseText = await response.text();
  let body;
  try {
    body = responseText ? JSON.parse(responseText) : null;
  } catch (error) {
    console.error('PayMongo Sandbox returned invalid JSON:', response.status, error);
    throw new ApiError(502, `PayMongo Sandbox returned an invalid response (HTTP ${response.status}). Check the API key and PayMongo API configuration.`);
  }
  if (!response.ok) {
    const providerMessage = body?.errors?.map(error => error.detail || error.title).filter(Boolean).join('; ');
    console.error('PayMongo Sandbox API error:', response.status, body?.errors || body);
    throw new ApiError(502, providerMessage || 'PayMongo Sandbox could not process the request.');
  }
  if (!body?.data) {
    console.error('PayMongo Sandbox returned an empty response:', response.status, response.headers.get('content-type'));
    throw new ApiError(502, `PayMongo Sandbox returned an empty response (HTTP ${response.status}). Check the API key and PayMongo API configuration.`);
  }
  return body.data;
}

function verifyWebhookSignature(req, webhookSecret) {
  const signatureHeader = req.get('Paymongo-Signature') || '';
  const fields = Object.fromEntries(signatureHeader.split(',').map(part => {
    const separator = part.indexOf('=');
    return separator === -1 ? ['', ''] : [part.slice(0, separator), part.slice(separator + 1)];
  }));
  const timestamp = Number(fields.t);
  const rawBody = req.rawBody;
  if (!Number.isInteger(timestamp) || !Buffer.isBuffer(rawBody)) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > MAX_SIGNATURE_AGE_SECONDS) return false;

  const isTestKey = process.env.PAYMONGO_SECRET_KEY?.startsWith('sk_test_');
  const suppliedSignature = isTestKey ? fields.te : fields.li;
  if (typeof suppliedSignature !== 'string' || !/^[a-f0-9]{64}$/i.test(suppliedSignature)) return false;

  const expectedSignature = createHmac('sha256', webhookSecret)
    .update(`${timestamp}.${rawBody.toString('utf8')}`)
    .digest();
  const actualSignature = Buffer.from(suppliedSignature, 'hex');
  return actualSignature.length === expectedSignature.length
    && timingSafeEqual(actualSignature, expectedSignature);
}

function getCheckoutSessionId(event) {
  const resource = event?.data?.data || event?.data?.attributes?.data;
  const sessionId = resource?.id || event?.data?.id;
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    throw new ApiError(400, 'Webhook does not contain a valid Checkout Session ID.');
  }
  return sessionId;
}

async function markBookingPaid(prisma, bookingId, session, paymentId = null) {
  return prisma.$transaction(async transaction => {
    const booking = await transaction.booking.findUnique({
      where: { id: bookingId },
      include: { equipment: true }
    });
    if (!booking) {
      throw new ApiError(404, 'Booking was not found.');
    }
    if (booking.bookingStatus === 'PAID_IN_ESCROW') {
      return booking;
    }
    if (booking.bookingStatus !== 'AWAITING_PAYMENT') {
      throw new ApiError(409, 'Only bookings awaiting payment can be paid.');
    }
    if (booking.startDate && booking.endDate) {
      const conflictingBooking = await transaction.booking.findFirst({
        where: {
          id: { not: booking.id },
          equipmentId: booking.equipmentId,
          bookingStatus: { in: ['PAID_IN_ESCROW'] },
          startDate: { lte: booking.endDate },
          endDate: { gte: booking.startDate }
        },
        select: { id: true }
      });
      if (conflictingBooking) {
        throw new ApiError(409, 'Another paid booking already overlaps these dates.');
      }
    }

    const expectedAmount = new Prisma.Decimal(booking.grossTotal).mul(100).toDecimalPlaces(0).toNumber();
    const paidPayment = session?.attributes?.payments?.find(payment => payment.attributes?.status === 'paid');
    const sessionAmount = session?.attributes?.line_items?.length
      ? session.attributes.line_items.reduce(
        (total, lineItem) => total + Number(lineItem.amount || 0) * Number(lineItem.quantity || 1),
        0
      )
      : paidPayment?.attributes?.amount ?? paidPayment?.attributes?.net_amount ?? session?.attributes?.amount;
    if (!Number.isFinite(Number(sessionAmount)) || Number(sessionAmount) !== expectedAmount) {
      throw new ApiError(409, 'Paid Checkout Session amount does not match the booking total.');
    }
    const sessionCurrency = paidPayment?.attributes?.currency
      || session?.attributes?.currency
      || session?.attributes?.line_items?.[0]?.currency;
    if (sessionCurrency && sessionCurrency.toUpperCase() !== 'PHP') {
      throw new ApiError(409, 'Paid Checkout Session currency does not match PHP.');
    }
    if (session?.attributes?.status !== 'paid' && !paidPayment) {
      throw new ApiError(409, 'PayMongo has no paid payment recorded for this Checkout Session.');
    }

    const updated = await transaction.booking.updateMany({
      where: { id: bookingId, bookingStatus: 'AWAITING_PAYMENT' },
      data: {
        bookingStatus: 'PAID_IN_ESCROW',
        paymentId,
        paidAt: new Date()
      }
    });
    if (updated.count !== 1) {
      const latest = await transaction.booking.findUnique({ where: { id: bookingId } });
      if (latest?.bookingStatus === 'PAID_IN_ESCROW') return latest;
      throw new ApiError(409, 'Booking status changed before payment could be recorded.');
    }

    await transaction.equipment.update({
      where: { id: booking.equipmentId },
      data: {
        status: 'ON_SITE',
        ...(booking.endDate ? { nextAvailableDate: booking.endDate } : {})
      }
    });

    return transaction.booking.findUnique({
      where: { id: bookingId },
      include: { equipment: true }
    });
  });
}

export function createPaymentsRouter(prisma) {
  const router = Router();
  const mockCheckouts = new Map();
  const mockBookingBySession = new Map();

  function requireMockCheckoutMode() {
    if (process.env.NODE_ENV === 'production') {
      throw new ApiError(404, 'Endpoint was not found.');
    }
  }

  function featurePaymentIsPaid(session) {
    return session.attributes?.status === 'paid'
      || session.attributes?.payments?.some(payment => payment.attributes?.status === 'paid') === true;
  }

  function verifyFeaturePaymentAmount(session) {
    const paidPayment = session.attributes?.payments?.find(payment => payment.attributes?.status === 'paid');
    const lineItemsAmount = session.attributes?.line_items?.reduce(
      (total, lineItem) => total + Number(lineItem.amount || 0) * Number(lineItem.quantity || 1),
      0
    );
    const amount = Number(lineItemsAmount || paidPayment?.attributes?.amount || session.attributes?.amount);
    const currency = paidPayment?.attributes?.currency
      || session.attributes?.currency
      || session.attributes?.line_items?.[0]?.currency;
    if (amount !== FEATURE_LISTING_PRICE_PHP * 100 || (currency && currency.toUpperCase() !== 'PHP')) {
      throw new ApiError(409, 'Paid Checkout Session does not match the listing feature fee.');
    }
  }

  async function activateFeaturedEquipment(equipment, session) {
    if (!featurePaymentIsPaid(session)) {
      throw new ApiError(409, 'PayMongo has no paid payment recorded for this listing boost.');
    }
    verifyFeaturePaymentAmount(session);
    if (equipment.featureLastPaidSessionId === session.id) {
      return equipment;
    }
    const equipmentStore = equipment.id.startsWith('local-') ? prisma.localEquipment : prisma.equipment;
    return equipmentStore.update({
      where: { id: equipment.id },
      data: {
        isFeatured: true,
        boostRegion: 'Davao Region',
        featureExpiresAt: new Date(Date.now() + FEATURE_LISTING_DURATION_DAYS * 24 * 60 * 60 * 1000),
        featureCheckoutSessionId: null,
        featureCheckoutUrl: null,
        featureLastPaidSessionId: session.id
      }
    });
  }

  function markMockCheckoutPaid(session) {
    const paidPayment = session.attributes?.payments?.find(payment => payment.attributes?.status === 'paid');
    const lineItemsAmount = session.attributes?.line_items?.reduce(
      (total, lineItem) => total + Number(lineItem.amount || 0) * Number(lineItem.quantity || 1),
      0
    );
    const amount = Number(lineItemsAmount || paidPayment?.attributes?.amount || session.attributes?.amount);
    const currency = paidPayment?.attributes?.currency
      || session.attributes?.currency
      || session.attributes?.line_items?.[0]?.currency;
    const checkout = mockBookingBySession.get(session.id);
    if (!checkout || !Number.isFinite(amount) || amount !== checkout.amount || (currency && currency.toUpperCase() !== 'PHP')) {
      throw new ApiError(409, 'Paid Checkout Session does not match the mock booking total.');
    }
    checkout.status = 'PAID_IN_ESCROW';
    return checkout;
  }

  async function createMockCheckout(body) {
    const bookingId = requireText(body?.bookingId, 'bookingId');
    if (!/^[a-zA-Z0-9_-]{1,80}$/.test(bookingId)) {
      throw new ApiError(400, 'bookingId contains invalid characters.');
    }

    const equipmentId = requireNumber(body?.equipmentId, 'equipmentId', { integer: true });
    const rentalHours = requireNumber(body?.rentalHours, 'rentalHours', { integer: true });
    const distanceKm = requireNumber(body?.distanceKm, 'distanceKm');
    if (rentalHours < 1 || rentalHours > 720) {
      throw new ApiError(400, 'rentalHours must be between 1 and 720.');
    }
    if (distanceKm > 9999999.999 || new Prisma.Decimal(distanceKm).decimalPlaces() > 3) {
      throw new ApiError(400, 'distanceKm must have at most 3 decimal places and be no greater than 9999999.999.');
    }
    const equipment = demoEquipment.find(item => item.mockId === equipmentId);
    const equipmentName = equipment?.name || requireText(body?.equipmentName, 'equipmentName');
    const hourlyRate = equipment?.hourlyRate ?? requireNumber(body?.hourlyRate, 'hourlyRate');
    const baseDeliveryFee = equipment?.baseDeliveryFee ?? requireNumber(body?.baseDeliveryFee, 'baseDeliveryFee');
    const ratePerKm = equipment?.ratePerKm ?? requireNumber(body?.ratePerKm, 'ratePerKm');
    const existing = mockCheckouts.get(bookingId);
    if (existing) {
      return { checkout_session_id: existing.sessionId, checkout_url: existing.checkoutUrl };
    }

    const financials = calculateBookingFinancials(
      hourlyRate,
      rentalHours,
      baseDeliveryFee,
      ratePerKm,
      distanceKm
    );
    const amount = new Prisma.Decimal(financials.grossTotal).mul(100).toDecimalPlaces(0).toNumber();
    const { successUrl, cancelUrl } = getCheckoutRedirects(bookingId, 'mock_submitted', 'mock_cancelled');
    const session = await createPayMongoCheckout({
      bookingId,
      equipmentName,
      amount,
      successUrl,
      cancelUrl
    });
    const checkoutUrl = requireCheckoutUrl(session);
    const checkout = {
      bookingId,
      equipmentId,
      sessionId: session.id,
      checkoutUrl,
      amount,
      equipmentName,
      financials,
      status: 'AWAITING_PAYMENT'
    };
    mockCheckouts.set(bookingId, checkout);
    mockBookingBySession.set(session.id, checkout);
    return { checkout_session_id: session.id, checkout_url: checkoutUrl };
  }

  router.post('/equipment/:equipmentId/feature-checkout-session', asyncHandler(async (req, res) => {
    const equipmentId = requireText(req.params.equipmentId, 'equipmentId');
    const ownerId = requireText(req.body?.ownerId, 'ownerId');
    const isLocalEquipment = equipmentId.startsWith('local-');
    const equipmentStore = isLocalEquipment ? prisma.localEquipment : prisma.equipment;
    let equipment = await equipmentStore.findUnique({ where: { id: equipmentId } });
    if (!equipment && isLocalEquipment && req.body?.localEquipment && typeof req.body.localEquipment === 'object') {
      const localEquipment = req.body.localEquipment;
      const nextAvailableDate = localEquipment.nextAvailableDate ? new Date(localEquipment.nextAvailableDate) : null;
      if (nextAvailableDate && Number.isNaN(nextAvailableDate.getTime())) {
        throw new ApiError(400, 'localEquipment.nextAvailableDate must be a valid date.');
      }
      const equipmentStatus = localEquipment.status || 'AVAILABLE';
      if (!['AVAILABLE', 'ON_SITE', 'MAINTENANCE'].includes(equipmentStatus)) {
        throw new ApiError(400, 'localEquipment.status is invalid.');
      }
      equipment = await prisma.localEquipment.create({
        data: {
          id: equipmentId,
          ownerId,
          name: requireText(localEquipment.name, 'localEquipment.name'),
          hourlyRate: String(requireNumber(localEquipment.hourlyRate, 'localEquipment.hourlyRate')),
          baseDeliveryFee: String(requireNumber(localEquipment.baseDeliveryFee, 'localEquipment.baseDeliveryFee')),
          ratePerKm: String(requireNumber(localEquipment.ratePerKm, 'localEquipment.ratePerKm')),
          status: equipmentStatus,
          nextAvailableDate,
          isFeatured: false
        }
      });
    }
    if (!equipment) throw new ApiError(404, 'Equipment was not found.');
    if (equipment.ownerId !== ownerId) throw new ApiError(403, 'Only this equipment owner can purchase a listing boost.');
    if (equipment.isFeatured && (!equipment.featureExpiresAt || equipment.featureExpiresAt > new Date())) {
      return res.json({ featured: true, equipment });
    }

    if (equipment.featureCheckoutSessionId && equipment.featureCheckoutUrl) {
      const previousSession = await paymongoRequest(`/checkout_sessions/${encodeURIComponent(equipment.featureCheckoutSessionId)}`);
      if (featurePaymentIsPaid(previousSession)) {
        equipment = await activateFeaturedEquipment(equipment, previousSession);
        return res.json({ featured: true, equipment });
      }
      if (!['expired', 'canceled', 'cancelled'].includes(previousSession.attributes?.status)) {
        return res.json({
          checkout_session_id: equipment.featureCheckoutSessionId,
          checkout_url: equipment.featureCheckoutUrl
        });
      }
    }

    const boostRequestId = randomUUID();
    const { successUrl, cancelUrl } = getCheckoutRedirects(
      equipmentId,
      'feature_submitted',
      'feature_cancelled',
      'equipmentId'
    );
    const session = await createPayMongoCheckout({
      bookingId: boostRequestId,
      equipmentName: `30-day featured listing: ${equipment.name}`,
      amount: FEATURE_LISTING_PRICE_PHP * 100,
      successUrl,
      cancelUrl,
      idempotencyKey: `feature-${boostRequestId}`,
      metadata: {
        purpose: 'listing_feature',
        equipment_id: equipmentId,
        feature_duration_days: String(FEATURE_LISTING_DURATION_DAYS)
      }
    });
    const checkoutUrl = requireCheckoutUrl(session);
    equipment = await equipmentStore.update({
      where: { id: equipmentId },
      data: {
        featureCheckoutSessionId: session.id,
        featureCheckoutUrl: checkoutUrl
      }
    });
    res.status(201).json({ checkout_session_id: session.id, checkout_url: checkoutUrl });
  }));

  router.get('/equipment/:equipmentId/feature-status', asyncHandler(async (req, res) => {
    const equipmentId = requireText(req.params.equipmentId, 'equipmentId');
    const ownerId = requireText(req.query.ownerId, 'ownerId');
    const equipmentStore = equipmentId.startsWith('local-') ? prisma.localEquipment : prisma.equipment;
    const equipment = await equipmentStore.findUnique({ where: { id: equipmentId } });
    if (!equipment) throw new ApiError(404, 'Equipment was not found.');
    if (equipment.ownerId !== ownerId) throw new ApiError(403, 'Only this equipment owner can verify a listing boost.');

    if (!equipment.featureCheckoutSessionId) {
      const isFeatured = equipment.isFeatured
        && (!equipment.featureExpiresAt || equipment.featureExpiresAt > new Date());
      return res.json({ featured: isFeatured, equipment: { ...equipment, isFeatured } });
    }
    const session = await paymongoRequest(`/checkout_sessions/${encodeURIComponent(equipment.featureCheckoutSessionId)}`);
    if (!featurePaymentIsPaid(session)) return res.json({ featured: false, status: 'AWAITING_PAYMENT' });
    const featuredEquipment = await activateFeaturedEquipment(equipment, session);
    res.json({ featured: true, equipment: featuredEquipment });
  }));

  router.post('/create-checkout-session', asyncHandler(async (req, res) => {
    const bookingId = requireText(req.body?.bookingId, 'bookingId');
    const booking = req.body?.mock === true
      ? null
      : await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { equipment: true }
      });
    if (booking) {
      if (booking.bookingStatus !== 'AWAITING_PAYMENT') {
        throw new ApiError(409, 'Only approved bookings can start checkout.');
      }
      if (booking.paymentCheckoutUrl) {
        return res.json({
          checkout_session_id: booking.paymentCheckoutSessionId,
          checkout_url: booking.paymentCheckoutUrl
        });
      }
      const amount = new Prisma.Decimal(booking.grossTotal).mul(100).toDecimalPlaces(0).toNumber();
      const { successUrl, cancelUrl } = getCheckoutRedirects(booking.id, 'submitted', 'cancelled');
      const session = await createPayMongoCheckout({
        bookingId: booking.id,
        equipmentName: booking.equipment.name,
        amount,
        successUrl,
        cancelUrl
      });
      const checkoutUrl = requireCheckoutUrl(session);
      await prisma.booking.update({
        where: { id: booking.id },
        data: { paymentCheckoutSessionId: session.id, paymentCheckoutUrl: checkoutUrl }
      });
      return res.status(201).json({ checkout_session_id: session.id, checkout_url: checkoutUrl });
    }
    requireMockCheckoutMode();
    const result = await createMockCheckout(req.body);
    return res.status(201).json(result);
  }));

  router.post('/mock-checkouts', asyncHandler(async (req, res) => {
    requireMockCheckoutMode();
    const result = await createMockCheckout(req.body);
    return res.status(201).json(result);
  }));

  router.get('/mock-checkouts/:bookingId/status', asyncHandler(async (req, res) => {
    requireMockCheckoutMode();
    const bookingId = requireText(req.params.bookingId, 'bookingId');
    const checkout = mockCheckouts.get(bookingId);
    if (!checkout) {
      throw new ApiError(404, 'Mock checkout was not found. It may have expired after the server restarted.');
    }
    if (checkout.status !== 'PAID_IN_ESCROW') {
      const session = await paymongoRequest(`/checkout_sessions/${encodeURIComponent(checkout.sessionId)}`);
      if (session.attributes?.status === 'paid') {
        markMockCheckoutPaid(session);
      }
    }
    res.json({
      bookingId: checkout.bookingId,
      bookingStatus: checkout.status,
      equipmentName: checkout.equipmentName,
      grossTotal: checkout.financials.grossTotal
    });
  }));

  router.get('/admin/transactions', requireAdmin, asyncHandler(async (req, res) => {
    const bookings = await prisma.booking.findMany({
      where: { bookingStatus: 'PAID_IN_ESCROW' },
      include: { equipment: { select: { name: true } } },
      orderBy: { paidAt: 'desc' }
    });
    res.json({
      transactions: bookings.map(booking => ({
        bookingId: booking.id,
        equipmentName: booking.equipment.name,
        grossCollected: booking.grossTotal.toString(),
        platformFeeRetained: booking.platformFeeRetained.toString(),
        ownerNetPayout: booking.ownerNetPayout.toString(),
        bookingStatus: booking.bookingStatus
      }))
    });
  }));

  router.get('/bookings/:bookingId/checkout-details', asyncHandler(async (req, res) => {
    const bookingId = requireText(req.params.bookingId, 'bookingId');
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { equipment: true }
    });
    if (!booking) {
      throw new ApiError(404, 'Booking was not found.');
    }
    res.json({
      booking: {
        id: booking.id,
        bookingStatus: booking.bookingStatus,
        rentalHours: booking.rentalHours,
        distanceKm: booking.distanceKm,
        rentalCost: booking.rentalCost,
        baseDeliveryFee: booking.baseDeliveryFee,
        travelCharge: booking.travelCharge,
        grossTotal: booking.grossTotal,
        equipmentName: booking.equipment.name
      }
    });
  }));

  router.post('/bookings/:bookingId/checkout-session', asyncHandler(async (req, res) => {
    const bookingId = requireText(req.params.bookingId, 'bookingId');
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { equipment: true }
    });
    if (!booking) {
      throw new ApiError(404, 'Booking was not found.');
    }
    if (booking.bookingStatus !== 'AWAITING_PAYMENT') {
      throw new ApiError(409, 'Only approved bookings can start checkout.');
    }
    if (booking.paymentCheckoutUrl) {
      return res.json({
        checkout_session_id: booking.paymentCheckoutSessionId,
        checkout_url: booking.paymentCheckoutUrl
      });
    }

    const amount = new Prisma.Decimal(booking.grossTotal).mul(100).toDecimalPlaces(0).toNumber();
    const { successUrl, cancelUrl } = getCheckoutRedirects(booking.id, 'submitted', 'cancelled');
    const session = await createPayMongoCheckout({
      bookingId: booking.id,
      equipmentName: booking.equipment.name,
      amount,
      successUrl,
      cancelUrl
    });
    const checkoutUrl = requireCheckoutUrl(session);

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentCheckoutSessionId: session.id,
        paymentCheckoutUrl: checkoutUrl
      }
    });

    res.status(201).json({ checkout_session_id: session.id, checkout_url: checkoutUrl });
  }));

  router.post('/payments/paymongo/webhook', asyncHandler(async (req, res) => {
    const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new ApiError(503, 'PayMongo webhook verification is not configured.');
    }
    if (!verifyWebhookSignature(req, webhookSecret)) {
      throw new ApiError(400, 'PayMongo webhook signature is invalid or expired.');
    }

    const event = req.body;
    const eventType = event?.data?.type || event?.data?.attributes?.type;
    if (eventType !== 'checkout_session.payment.paid') {
      return res.status(200).json({ received: true, ignored: true });
    }

    const sessionId = getCheckoutSessionId(event);
    const confirmedSession = await paymongoRequest(`/checkout_sessions/${encodeURIComponent(sessionId)}`);
    if (confirmedSession.attributes?.status !== 'paid') {
      throw new ApiError(409, 'PayMongo has not marked this Checkout Session as paid.');
    }
    const mockCheckout = mockBookingBySession.get(sessionId);
    if (mockCheckout) {
      markMockCheckoutPaid(confirmedSession);
      return res.status(200).json({
        received: true,
        bookingId: mockCheckout.bookingId,
        bookingStatus: mockCheckout.status,
        mock: true
      });
    }

    const featuredEquipment = await prisma.equipment.findFirst({
      where: {
        OR: [
          { featureCheckoutSessionId: sessionId },
          { featureLastPaidSessionId: sessionId }
        ]
      }
    });
    if (featuredEquipment) {
      const updatedEquipment = await activateFeaturedEquipment(featuredEquipment, confirmedSession);
      return res.status(200).json({
        received: true,
        equipmentId: updatedEquipment.id,
        isFeatured: updatedEquipment.isFeatured,
        featureExpiresAt: updatedEquipment.featureExpiresAt
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { paymentCheckoutSessionId: sessionId }
    });
    if (!booking) {
      throw new ApiError(404, 'No booking is linked to this Checkout Session.');
    }
    const paymentId = confirmedSession.attributes?.payments?.find(payment => payment.attributes?.status === 'paid')?.id || null;
    const paidBooking = await markBookingPaid(prisma, booking.id, confirmedSession, paymentId);
    return res.status(200).json({
      received: true,
      bookingId: paidBooking.id,
      bookingStatus: paidBooking.bookingStatus
    });
  }));

  router.post('/bookings/:bookingId/simulate-payment', asyncHandler(async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      throw new ApiError(404, 'Endpoint was not found.');
    }
    const bookingId = requireText(req.params.bookingId, 'bookingId');
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      throw new ApiError(404, 'Booking was not found.');
    }
    if (booking.bookingStatus === 'PAID_IN_ESCROW') {
      return res.json({ booking });
    }
    if (booking.bookingStatus !== 'AWAITING_PAYMENT') {
      throw new ApiError(409, 'Only approved bookings can be marked paid.');
    }

    const amount = new Prisma.Decimal(booking.grossTotal).mul(100).toDecimalPlaces(0).toNumber();
    const simulation = {
      attributes: {
        amount,
        status: 'paid'
      }
    };
    const paidBooking = await markBookingPaid(prisma, booking.id, simulation, `sandbox_sim_${booking.id}`);
    res.json({ booking: paidBooking, simulated: true });
  }));

  return router;
}

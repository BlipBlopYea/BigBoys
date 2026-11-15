import { randomUUID } from 'node:crypto';
import { demoEquipment } from './demo-equipment.js';

const clone = value => value == null ? value : structuredClone(value);

export function isDatabaseUnavailable(error) {
  const pending = [error];
  const visited = new Set();
  while (pending.length) {
    const current = pending.pop();
    if (!current || typeof current !== 'object' || visited.has(current)) continue;
    visited.add(current);
    if (['P1001', 'P1002', 'P1008', 'P1017', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT'].includes(current.code)) {
      return true;
    }
    if (/can't reach database server|cannot reach database server|connection refused|connection terminated|connection timed out|database server is not available/i.test(current.message || '')) {
      return true;
    }
    pending.push(current.cause);
    if (Array.isArray(current.errors)) pending.push(...current.errors);
  }
  return false;
}

function matchesWhere(record, where, equipmentById, bookingById) {
  if (!where) return true;
  for (const [key, condition] of Object.entries(where)) {
    if (key === 'OR' && !condition.some(clause => matchesWhere(record, clause, equipmentById, bookingById))) return false;
    else if (key === 'AND' && !condition.every(clause => matchesWhere(record, clause, equipmentById, bookingById))) return false;
    else if (key === 'NOT' && matchesWhere(record, condition, equipmentById, bookingById)) return false;
    else if (key === 'equipment') {
      const equipment = equipmentById.get(record.equipmentId);
      if (!matchesWhere(equipment || {}, condition, equipmentById, bookingById)) return false;
    } else if (key === 'bookingStatus' && condition && typeof condition === 'object') {
      if (condition.in && !condition.in.includes(record.bookingStatus)) return false;
      if (condition.not && record.bookingStatus === condition.not) return false;
    } else if (key === 'startDate' || key === 'endDate') {
      const actual = record[key] ? new Date(record[key]).getTime() : null;
      if (condition?.lte && (actual === null || actual > new Date(condition.lte).getTime())) return false;
      if (condition?.gte && (actual === null || actual < new Date(condition.gte).getTime())) return false;
    } else if (condition && typeof condition === 'object' && !Array.isArray(condition)) {
      if ('not' in condition && record[key] === condition.not) return false;
      if ('in' in condition && !condition.in.includes(record[key])) return false;
      if ('lte' in condition && record[key] > condition.lte) return false;
      if ('gte' in condition && record[key] < condition.gte) return false;
    } else if (record[key] !== condition) {
      return false;
    }
  }
  return true;
}

function projectBooking(booking, args, equipmentById) {
  const result = clone(booking);
  if (args?.include?.equipment) {
    const equipment = clone(equipmentById.get(booking.equipmentId) || null);
    const selection = args.include.equipment.select;
    result.equipment = selection && equipment
      ? Object.fromEntries(Object.keys(selection).filter(key => selection[key]).map(key => [key, equipment[key]]))
      : equipment;
  }
  return result;
}

function createMemoryStore() {
  const equipmentById = new Map(demoEquipment.map(item => {
    const { mockId, ...details } = item;
    return [details.id, {
      ...details,
      ownerId: 'demo-owner',
      hourlyRate: String(details.hourlyRate),
      baseDeliveryFee: String(details.baseDeliveryFee),
      ratePerKm: String(details.ratePerKm),
      status: details.status || 'AVAILABLE',
      nextAvailableDate: details.nextAvailableDate || null,
      isFeatured: details.isFeatured === true,
      featureExpiresAt: null,
      featureCheckoutSessionId: null,
      featureCheckoutUrl: null,
      featureLastPaidSessionId: null
    }];
  }));
  const demoBookings = [
    {
      id: 'demo-booking-1',
      equipmentId: 'demo-equipment-1',
      renterId: 'A. Bautista Construction',
      rentalHours: 8,
      distanceKm: '12.500',
      rentalCost: '10000.00',
      baseDeliveryFee: '2500.00',
      travelCharge: '1375.00',
      grossTotal: '13875.00',
      platformFeeRetained: '1110.00',
      ownerNetPayout: '12765.00',
      startDate: null,
      endDate: null,
      bookingStatus: 'PENDING_APPROVAL',
      paymentCheckoutSessionId: null,
      paymentCheckoutUrl: null,
      paymentId: null,
      paidAt: null,
      createdAt: new Date('2026-10-01T08:00:00.000Z')
    },
    {
      id: 'demo-booking-2',
      equipmentId: 'demo-equipment-2',
      renterId: 'Northline Builders',
      rentalHours: 8,
      distanceKm: '10.000',
      rentalCost: '7840.00',
      baseDeliveryFee: '1800.00',
      travelCharge: '960.00',
      grossTotal: '10600.00',
      platformFeeRetained: '848.00',
      ownerNetPayout: '9752.00',
      startDate: new Date('2026-10-30T00:00:00.000Z'),
      endDate: new Date('2026-11-01T00:00:00.000Z'),
      bookingStatus: 'PAID_IN_ESCROW',
      paymentCheckoutSessionId: null,
      paymentCheckoutUrl: null,
      paymentId: null,
      paidAt: new Date('2026-10-29T08:00:00.000Z'),
      createdAt: new Date('2026-10-28T08:00:00.000Z')
    },
    {
      id: 'demo-booking-3',
      equipmentId: 'demo-equipment-3',
      renterId: 'Prime Works Group',
      rentalHours: 8,
      distanceKm: '10.000',
      rentalCost: '11600.00',
      baseDeliveryFee: '2800.00',
      travelCharge: '1160.00',
      grossTotal: '15560.00',
      platformFeeRetained: '1244.80',
      ownerNetPayout: '14315.20',
      startDate: null,
      endDate: null,
      bookingStatus: 'COMPLETED',
      paymentCheckoutSessionId: null,
      paymentCheckoutUrl: null,
      paymentId: null,
      paidAt: null,
      createdAt: new Date('2026-09-30T08:00:00.000Z')
    }
  ];
  const bookingsById = new Map(demoBookings.map(item => [item.id, item]));

  const equipment = {
    findMany: async args => {
      const records = [...equipmentById.values()].filter(item => matchesWhere(item, args?.where, equipmentById, bookingsById));
      if (args?.orderBy?.name) records.sort((a, b) => a.name.localeCompare(b.name) * (args.orderBy.name === 'desc' ? -1 : 1));
      return records.map(clone);
    },
    findUnique: async args => clone([...equipmentById.values()].find(item =>
      Object.entries(args?.where || {}).every(([key, value]) => item[key] === value)
    ) || null),
    findFirst: async args => clone([...equipmentById.values()].find(item => matchesWhere(item, args?.where, equipmentById, bookingsById)) || null),
    create: async args => {
      const record = {
        id: args.data.id || `memory-equipment-${randomUUID()}`,
        ownerId: args.data.ownerId || 'demo-owner',
        status: 'AVAILABLE',
        isFeatured: false,
        featureExpiresAt: null,
        featureCheckoutSessionId: null,
        featureCheckoutUrl: null,
        featureLastPaidSessionId: null,
        ...clone(args.data)
      };
      equipmentById.set(record.id, record);
      return clone(record);
    },
    update: async args => {
      const record = [...equipmentById.values()].find(item =>
        Object.entries(args.where || {}).every(([key, value]) => item[key] === value)
      );
      if (!record) throw Object.assign(new Error('Equipment was not found.'), { code: 'P2025' });
      Object.assign(record, clone(args.data));
      return clone(record);
    },
    upsert: async args => {
      const record = [...equipmentById.values()].find(item =>
        Object.entries(args.where || {}).every(([key, value]) => item[key] === value)
      );
      if (record) {
        Object.assign(record, clone(args.update));
        return clone(record);
      }
      const created = {
        id: args.create.id || `memory-equipment-${randomUUID()}`,
        ownerId: args.create.ownerId || 'demo-owner',
        status: 'AVAILABLE',
        isFeatured: false,
        featureExpiresAt: null,
        featureCheckoutSessionId: null,
        featureCheckoutUrl: null,
        featureLastPaidSessionId: null,
        ...clone(args.create)
      };
      equipmentById.set(created.id, created);
      return clone(created);
    }
  };

  const booking = {
    findMany: async args => {
      let records = [...bookingsById.values()].filter(item => matchesWhere(item, args?.where, equipmentById, bookingsById));
      if (args?.orderBy?.createdAt) {
        records.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)) * (args.orderBy.createdAt === 'asc' ? -1 : 1));
      }
      return records.map(item => projectBooking(item, args, equipmentById));
    },
    findUnique: async args => {
      const record = [...bookingsById.values()].find(item =>
        Object.entries(args?.where || {}).every(([key, value]) => item[key] === value)
      );
      return record ? projectBooking(record, args, equipmentById) : null;
    },
    findFirst: async args => {
      const record = [...bookingsById.values()].find(item => matchesWhere(item, args?.where, equipmentById, bookingsById));
      return record ? projectBooking(record, args, equipmentById) : null;
    },
    create: async args => {
      const record = {
        id: `memory-booking-${randomUUID()}`,
        bookingStatus: 'PENDING_APPROVAL',
        createdAt: new Date(),
        paymentCheckoutSessionId: null,
        paymentCheckoutUrl: null,
        paymentId: null,
        paidAt: null,
        ...clone(args.data)
      };
      bookingsById.set(record.id, record);
      return clone(record);
    },
    updateMany: async args => {
      let count = 0;
      for (const record of bookingsById.values()) {
        if (matchesWhere(record, args.where, equipmentById, bookingsById)) {
          Object.assign(record, clone(args.data));
          count += 1;
        }
      }
      return { count };
    },
    update: async args => {
      const record = [...bookingsById.values()].find(item =>
        Object.entries(args.where || {}).every(([key, value]) => item[key] === value)
      );
      if (!record) throw Object.assign(new Error('Booking was not found.'), { code: 'P2025' });
      Object.assign(record, clone(args.data));
      return clone(record);
    }
  };

  const localEquipment = {
    findUnique: equipment.findUnique,
    create: args => equipment.upsert({
      where: { id: args.data.id },
      create: args.data,
      update: {}
    }),
    update: equipment.update
  };

  return {
    equipment,
    booking,
    localEquipment,
    async $transaction(callback) {
      return callback({ equipment, booking });
    }
  };
}

export function createRuntimeStore(prisma, logger = console) {
  const memory = createMemoryStore();
  let useMemory = false;
  let loggedFallback = false;

  function delegate(name) {
    return new Proxy({}, {
      get(_target, method) {
        return async (...args) => {
          if (useMemory) return memory[name][method](...args);
          try {
            return await prisma[name][method](...args);
          } catch (error) {
            if (!isDatabaseUnavailable(error)) throw error;
            useMemory = true;
            if (!loggedFallback) {
              loggedFallback = true;
              logger.warn('PostgreSQL is unavailable; continuing with the in-memory demo store.');
            }
            return memory[name][method](...args);
          }
        };
      }
    });
  }

  return new Proxy({}, {
    get(_target, property) {
      if (property === 'isUsingMemoryFallback') return useMemory;
      if (property === 'localEquipment') return memory.localEquipment;
      if (property === 'equipment' || property === 'booking') return delegate(property);
      if (property === '$transaction') {
        return async (callback, ...args) => {
          if (useMemory) return memory.$transaction(callback);
          try {
            return await prisma.$transaction(callback, ...args);
          } catch (error) {
            if (!isDatabaseUnavailable(error)) throw error;
            useMemory = true;
            if (!loggedFallback) {
              loggedFallback = true;
              logger.warn('PostgreSQL is unavailable; continuing with the in-memory demo store.');
            }
            return memory.$transaction(callback);
          }
        };
      }
      const value = prisma?.[property];
      return typeof value === 'function' ? value.bind(prisma) : value;
    }
  });
}

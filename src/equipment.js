import { Router } from 'express';

export function createEquipmentRouter(prisma) {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const equipment = await prisma.equipment.findMany({
        orderBy: { name: 'asc' },
        select: {
          id: true,
          ownerId: true,
          name: true,
          hourlyRate: true,
          baseDeliveryFee: true,
          ratePerKm: true,
          status: true,
          nextAvailableDate: true
        }
      });
      res.json({
        equipment: equipment.map(item => ({
          ...item,
          hourlyRate: item.hourlyRate.toString(),
          baseDeliveryFee: item.baseDeliveryFee.toString(),
          ratePerKm: item.ratePerKm.toString()
        }))
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

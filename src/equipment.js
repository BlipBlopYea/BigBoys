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
          nextAvailableDate: true,
          isFeatured: true,
          boostRegion: true,
          featureExpiresAt: true
        }
      });
      res.json({
        equipment: equipment.map(item => ({
          ...item,
          isFeatured: item.isFeatured && (!item.featureExpiresAt || item.featureExpiresAt > new Date()),
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

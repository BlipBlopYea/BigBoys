import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { demoEquipment } from '../src/demo-equipment.js';

const prisma = new PrismaClient();

try {
  await prisma.equipment.createMany({
    data: demoEquipment.map(({ mockId, ...item }) => ({
      ownerId: 'demo-owner',
      ...item
    })),
    skipDuplicates: true
  });
  console.log(`Seeded ${demoEquipment.length} demo equipment records (existing records were left unchanged).`);
} finally {
  await prisma.$disconnect();
}

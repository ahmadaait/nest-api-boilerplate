import { PrismaClient, userType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Administrator',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('password', 12),
      userType: userType.admin,
    },
  });
  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

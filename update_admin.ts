import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  });

  if (admin) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { email: 'givon676@gmail.com' }
    });
    console.log("Admin email updated successfully to givon676@gmail.com");
  } else {
    console.log("Admin user not found.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

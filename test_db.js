const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const props = await prisma.property.findMany({
    select: { id: true, title: true, mainImage: true, images: true, videos: true, documents: true }
  });
  console.log(JSON.stringify(props, null, 2));
}

main().finally(() => prisma.$disconnect());

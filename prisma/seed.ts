import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ivonnemarin.com' },
    update: {},
    create: {
      email: 'admin@ivonnemarin.com',
      name: 'Ivonne Marín',
      // En producción esto debe estar hasheado con bcrypt, pero para el prototipo NextAuth con credentials
      // o usaremos bcryptjs.
      password: 'admin', 
      role: 'ADMIN',
    },
  })
  
  const setting = await prisma.setting.upsert({
    where: { key: 'whatsapp' },
    update: {},
    create: {
      key: 'whatsapp',
      value: '+573000000000'
    }
  })

  console.log({ admin, setting })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

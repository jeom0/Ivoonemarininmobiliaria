import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ivonnemarin.com' },
    update: {},
    create: {
      email: 'admin@ivonnemarin.com',
      name: 'Ivonne Marín',
      password: hashedPassword, 
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

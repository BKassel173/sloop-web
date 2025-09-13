import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.upsert({
    where: { slug: 'iphone-16-pro' },
    update: {},
    create: {
      slug: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      brand: 'Apple',
      model: '16 Pro',
      shortDesc: 'Premium device rental',
      pricePerWeek: 39,
      imageUrl: '/placeholder-iphone.png',
      variants: {
        create: [
          { color: 'Natural', capacity: '256GB' },
          { color: 'Black',   capacity: '512GB' }
        ]
      }
    }
  })
  console.log('Seeded: iPhone 16 Pro')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

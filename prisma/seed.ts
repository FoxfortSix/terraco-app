// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const products = [
  {
    name: 'Terracotta Classic Round',
    subtitle: 'Heritage Collection',
    category: 'terracotta',
    size: 'Medium',
    dimensions: '30cm × 28cm',
    price: 'Rp 450.000',
    description: 'Pot terracotta klasik dengan bentuk bulat yang timeless. Ideal untuk tanaman indoor maupun outdoor.',
    image: 'https://images.unsplash.com/photo-1616694547880-621ed1943d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90JTIwcm91bmR8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    tag: 'Best Seller',
    color: '#d99a73',
    stock: 'In Stock'
  },
  {
    name: 'Concrete Cylinder',
    subtitle: 'Contemporary Series',
    category: 'concrete',
    size: 'Medium',
    dimensions: '28cm × 30cm',
    price: 'Rp 580.000',
    description: 'Pot beton silinder dengan finishing halus dan minimalis. Desain kontemporer untuk interior modern.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHBsYW50ZXIlMjBjeWxpbmRlcnxlbnwxfHx8fDE3NjQ4MzE2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    tag: 'New',
    color: '#9cab8a',
    stock: 'In Stock'
  },
  // ... Tambahkan data lain dari CollectionPage.tsx di sini jika mau
]

async function main() {
  console.log('Start seeding ...')
  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log('Seeding finished.')
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
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const products = [
  {
    name: 'Terracotta Signature',
    subtitle: 'Raw Earth Series',
    description: 'Keindahan ketidaksempurnaan alami. Tekstur tanah liat mentah yang dibakar sempurna.',
    image: '/images/IMG_20251129_101902.bak.bak.jpg',
    category: 'terracotta',
    tag: 'Signature',
    color: '#d99a73',
    featured: true,
    variants: {
      create: [
        { size: 'Small', dimensions: '15cm x 15cm', price: 150000, stock: 'In Stock' },
        { size: 'Medium', dimensions: '25cm x 25cm', price: 280000, stock: 'In Stock' },
        { size: 'Large', dimensions: '40cm x 40cm', price: 450000, stock: 'Limited' },
      ]
    }
  },
  {
    name: 'Artisan Curve',
    subtitle: 'Handmade Craft',
    description: 'Lengkungan dinamis yang dibentuk dengan tangan pengrajin ahli.',
    image: '/images/IMG_20251129_102102.bak.jpg',
    category: 'terracotta',
    tag: 'Best Seller',
    color: '#9cab8a',
    featured: true,
    variants: {
      create: [
        { size: 'Medium', dimensions: '30cm x 28cm', price: 320000, stock: 'In Stock' },
        { size: 'Large', dimensions: '45cm x 42cm', price: 550000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Modern Cylinder',
    subtitle: 'Minimalist Form',
    description: 'Siluet tegas dan bersih untuk hunian kontemporer.',
    image: '/images/IMG_20251129_102636.bak.bak.jpg',
    category: 'concrete',
    tag: 'New Arrival',
    color: '#7a746d',
    featured: true,
    variants: {
      create: [
        { size: 'Small', dimensions: '20cm x 20cm', price: 180000, stock: 'In Stock' },
        { size: 'Medium', dimensions: '30cm x 30cm', price: 290000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Heritage Pot',
    subtitle: 'Timeless Classic',
    description: 'Inspirasi bentuk kuno dengan finishing natural.',
    image: '/images/IMG_20251129_110211.bak.bak.jpg',
    category: 'artisan',
    tag: 'Exclusive',
    color: '#d8d2c7',
    featured: true,
    variants: {
      create: [
        { size: 'One Size', dimensions: '35cm x 35cm', price: 420000, stock: 'Limited' },
      ]
    }
  }
]

async function main() {
  console.log('Start seeding ...')
  // Hapus data lama agar tidak duplikat
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()

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
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Data Produk Baru Sesuai Request
const products = [
  // --- KATEGORI 1: LUNA TERRAZO NATURAL ---
  {
    name: 'Luna Terrazo Cylinder',
    subtitle: 'Natural Stone Series',
    description: 'Pot silinder dengan tekstur terrazo alami yang unik. Memberikan sentuhan artistik dan kokoh untuk tanaman indoor maupun outdoor.',
    image: '/images/LunaTerrazoNatural (1).jpg',
    category: 'luna-terrazo',
    tag: 'Best Seller',
    color: '#E0D8CC', // Warna krem/batu
    featured: true,
    variants: {
      create: [
        { size: 'S', dimensions: '20cm x 20cm', price: 185000, stock: 'In Stock' },
        { size: 'M', dimensions: '30cm x 30cm', price: 325000, stock: 'In Stock' },
        { size: 'L', dimensions: '40cm x 40cm', price: 550000, stock: 'Limited' },
      ]
    }
  },
  {
    name: 'Luna Terrazo Bowl',
    subtitle: 'Wide Planter',
    description: 'Bentuk mangkuk lebar yang elegan, sempurna untuk tanaman berakar serabut atau penataan succulent.',
    image: '/images/LunaTerrazoNatural (2).jpg',
    category: 'luna-terrazo',
    tag: 'New',
    color: '#E0D8CC',
    featured: false,
    variants: {
      create: [
        { size: 'M', dimensions: '35cm x 15cm', price: 295000, stock: 'In Stock' },
        { size: 'L', dimensions: '50cm x 20cm', price: 480000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Luna Terrazo Vase',
    subtitle: 'Tall Statement',
    description: 'Pot tinggi ramping yang ideal untuk sudut ruangan atau pintu masuk.',
    image: '/images/LunaTerrazoNatural (3).jpg',
    category: 'luna-terrazo',
    tag: 'Premium',
    color: '#E0D8CC',
    featured: false,
    variants: {
      create: [
        { size: 'M', dimensions: '25cm x 50cm', price: 450000, stock: 'In Stock' },
        { size: 'L', dimensions: '35cm x 70cm', price: 750000, stock: 'Limited' },
      ]
    }
  },

  // --- KATEGORI 2: LUNA NATURAL ---
  {
    name: 'Luna Natural Series',
    subtitle: 'Authentic Earth',
    description: 'Kembali ke alam dengan finishing tanah liat natural. Memiliki porositas yang baik untuk kesehatan akar tanaman.',
    image: '/images/LunaNatural.jpg',
    category: 'luna-natural',
    tag: 'Classic',
    color: '#A89F91', // Warna tanah/abu
    featured: true,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 23000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 28000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 32500, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 44500, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 44500, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 55000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 55000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 70000, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 92500, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 155000, stock: 'In Stock' },
      ]
    }
  },

  // --- KATEGORI 3: LUNA GLOSY ---
  {
    name: 'Luna Glosy Black',
    subtitle: 'Modern sleek',
    description: 'Finishing mengkilap yang mewah dan modern. Mudah dibersihkan dan tahan lama.',
    image: '/images/LunaGlossy (5).jpg',
    category: 'luna-glosy',
    tag: 'Modern',
    color: '#333333', // Hitam
    featured: true,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 40000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 45000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 60000, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 80000, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 80000, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 93000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 93000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 112500, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 150000, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 225000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Luna Glosy White',
    subtitle: 'Clean Minimalist',
    description: 'Warna putih bersih dengan lapisan glossy untuk tampilan minimalis yang terang.',
    image: '/images/LunaGlossy (6).jpg',
    category: 'luna-glosy',
    tag: 'Minimalist',
    color: '#F5F5F5', // Putih
    featured: false,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 40000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 45000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 60000, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 80000, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 80000, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 93000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 93000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 112500, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 150000, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 225000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Luna Glosy Grey',
    subtitle: 'Industrial Chic',
    description: 'Abu-abu glossy yang netral, cocok untuk tema industrial atau monokrom.',
    image: '/images/LunaGlossy (7).jpg',
    category: 'luna-glosy',
    tag: 'Industrial',
    color: '#808080', // Abu
    featured: false,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 40000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 45000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 60000, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 80000, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 80000, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 93000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 93000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 112500, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 150000, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 225000, stock: 'In Stock' },
      ]
    }
  },

  // --- KATEGORI 4: NARA GLOSY ---
  {
    name: 'Nara Glosy Curve',
    subtitle: 'Elegant Series',
    description: 'Desain Nara dengan lengkungan halus dan finishing glossy premium. Pilihan tepat untuk kemewahan.',
    image: '/images/NaraGlossy (1).jpg',
    category: 'nara-glosy',
    tag: 'Exclusive',
    color: '#D8C8B8', // Krem/Goldish
    featured: true,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 40000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 45000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 60000, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 80000, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 80000, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 93000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 93000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 112500, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 150000, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 225000, stock: 'In Stock' },
      ]
    }
  },
  {
    name: 'Nara Glosy Tall',
    subtitle: 'Statement Piece',
    description: 'Varian tinggi dari seri Nara. Sangat memukau sebagai focal point ruangan.',
    image: '/images/NaraGlossy (4).jpg',
    category: 'nara-glosy',
    tag: 'Luxury',
    color: '#D8C8B8',
    featured: false,
    variants: {
      create: [
        { size: 'XXS', dimensions: '15cm x 15cm', price: 40000, stock: 'In Stock' },
        { size: 'XS', dimensions: '15cm x 20cm', price: 45000, stock: 'In Stock' },
        { size: 'S', dimensions: '20cm x 20cm', price: 60000, stock: 'In Stock' },
        { size: 'XXM', dimensions: '20cm x 30cm', price: 80000, stock: 'In Stock' },
        { size: 'XM', dimensions: '25cm x 25cm', price: 80000, stock: 'In Stock' },
        { size: 'M', dimensions: '25cm x 35cm', price: 93000, stock: 'In Stock' },
        { size: 'L', dimensions: '30cm x 30cm', price: 93000, stock: 'In Stock' },
        { size: 'XL', dimensions: '30cm x 40cm', price: 112500, stock: 'In Stock' },
        { size: 'XXL', dimensions: '40cm x 40cm', price: 150000, stock: 'In Stock' },
        { size: 'XXXL', dimensions: '25cm x 55cm', price: 225000, stock: 'In Stock' },
      ]
    }
  }
]

async function main() {
  console.log('Start seeding ...')
  // Bersihkan data lama
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
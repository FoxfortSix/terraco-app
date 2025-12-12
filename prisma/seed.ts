const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// --- DAFTAR HARGA & UKURAN ---

// 1. Harga Basic (Untuk Luna Natural)
const variantsNatural = [
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
];

// 2. Harga Premium (Untuk Glossy & Terrazzo)
const variantsPremium = [
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
];

const products = [
  // --- KATEGORI 1: LUNA TERRAZZO (Premium) ---
  {
    name: 'Luna Terrazzo Pearl Grey',
    subtitle: 'Natural Stone Series',
    description: 'Putih keabu-abuan dengan terrazzo hitam yang halus. Memberikan kesan elegan dan bersih pada berbagai jenis ruangan.',
    image: '/images/LunaTerrazoNatural (1).jpg',
    category: 'luna-terrazo',
    tag: 'Best Seller',
    color: '#DADADA',
    featured: true,
    variants: { create: variantsPremium }
  },
  {
    name: 'Luna Terrazzo Ivory Cream',
    subtitle: 'Natural Stone Series',
    description: 'Krem lembut dengan tekstur terrazzo natural yang hangat. Sempurna untuk menciptakan suasana yang tenang dan estetik.',
    image: '/images/LunaTerrazoNatural (2).jpg',
    category: 'luna-terrazo',
    tag: 'New',
    color: '#E7DDC7',
    featured: false,
    variants: { create: variantsPremium }
  },
  {
    name: 'Luna Terrazzo Frost White',
    subtitle: 'Natural Stone Series',
    description: 'Terrazzo putih bersih dengan taburan batu hitam. Memberikan tampilan minimalis yang tetap memiliki karakter.',
    image: '/images/LunaTerrazoNatural (3).jpg',
    category: 'luna-terrazo',
    tag: 'Premium',
    color: '#F4F4F4',
    featured: false,
    variants: { create: variantsPremium }
  },
  {
    name: 'Luna Terrazzo Ebony',
    subtitle: 'Natural Stone Series',
    description: 'Hitam gelap dengan speckle terrazzo putih yang kontras. Modern, tegas, dan sangat cocok untuk tanaman tropis.',
    image: '/images/LunaTerrazoNatural (4).jpg',
    category: 'luna-terrazo',
    tag: 'Durable',
    color: '#1C1C1C',
    featured: false,
    variants: { create: variantsPremium }
  },

  // --- KATEGORI 2: LUNA NATURAL (Basic) ---
  {
    name: 'Luna Terracotta',
    subtitle: 'Authentic Earth',
    description: 'Warna tanah liat natural yang hangat dan tradisional. Menawarkan porositas optimal untuk kesehatan akar tanaman.',
    image: '/images/LunaNatural.jpg',
    category: 'luna-natural',
    tag: 'Classic',
    color: '#C07A47',
    featured: true,
    variants: { create: variantsNatural }
  },

  // --- KATEGORI 3: LUNA GLOSSY (Premium) ---
  {
    name: 'Luna Obsidian Black',
    subtitle: 'Modern Sleek',
    description: 'Hitam glossy pekat dengan refleksi kuat. Memberikan kontras dramatis yang mempertegas warna daun tanaman.',
    image: '/images/LunaGlossy (5).jpg',
    category: 'luna-glosy',
    tag: 'Modern',
    color: '#2A2A2A',
    featured: true,
    variants: { create: variantsPremium }
  },
  {
    name: 'Luna Mustard',
    subtitle: 'Clean Minimalist',
    description: 'Kuning mustard lembut dengan finishing mengkilap. Membawa sentuhan hangat dan playful pada dekorasi modern.',
    image: '/images/LunaGlossy (6).jpg',
    category: 'luna-glosy',
    tag: 'Minimalist',
    color: '#D6A84B',
    featured: false,
    variants: { create: variantsPremium }
  },
  {
    name: 'Luna Porcelain White',
    subtitle: 'Industrial Chic',
    description: 'Putih porselen mengkilap yang bersih dan elegan. Memberikan kesan modern dan mudah dipadupadankan.',
    image: '/images/LunaGlossy (7).jpg',
    category: 'luna-glosy',
    tag: 'Industrial',
    color: '#F5F5F5',
    featured: false,
    variants: { create: variantsPremium }
  },

  // --- KATEGORI 4: NARA GLOSSY (Premium) ---
  {
    name: 'Nara Lavender',
    subtitle: 'Elegant Curve',
    description: 'Ungu lavender pastel yang lembut dengan finishing glossy. Memberikan kesan tenang dan elegan.',
    image: '/images/NaraGlossy (1).jpg',
    category: 'nara-glosy',
    tag: 'Exclusive',
    color: '#C9B6E3',
    featured: true,
    variants: { create: variantsPremium }
  },
  {
    name: 'Nara Blush Pink',
    subtitle: 'Elegant Curve',
    description: 'Pink pastel lembut yang manis dan modern. Pilihan ideal untuk tampilan ruangan yang cerah dan welcoming.',
    image: '/images/NaraGlossy (2).jpg',
    category: 'nara-glosy',
    tag: 'Luxury',
    color: '#F2C5CE',
    featured: false,
    variants: { create: variantsPremium }
  },
  {
    name: 'Nara Pale Teal',
    subtitle: 'Elegant Curve',
    description: 'Pale teal dengan nuansa biru kehijauan yang menenangkan. Memberikan karakter lembut namun tetap modern.',
    image: '/images/NaraGlossy (3).jpg',
    category: 'nara-glosy',
    tag: 'Elegant',
    color: '#A7C9C5',
    featured: false,
    variants: { create: variantsPremium }
  },
  {
    name: 'Nara Mist Blue',
    subtitle: 'Statement Piece',
    description: 'Biru dusty lembut dengan sentuhan abu-abu. Warna unik yang memberikan nuansa tenang dan estetik.',
    image: '/images/NaraGlossy (4).jpg',
    category: 'nara-glosy',
    tag: 'Statement',
    color: '#9AB3C8',
    featured: false,
    variants: { create: variantsPremium }
  }
];

async function main() {
  console.log('Start seeding ...');
  
  try {
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    console.log('Deleted old data.');
  } catch (e) {
    console.log('No data to delete or tables not exist yet.');
  }

  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

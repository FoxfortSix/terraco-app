"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Filter, Grid3x3, LayoutGrid, Search, X } from 'lucide-react';
import Link from 'next/link';
import { Footer } from './Footer';
import { Logo } from './Logo';

// Extended product data with detailed information
const products = [
  // Terracotta Classic Collection
  {
    id: 1,
    name: 'Terracotta Classic Round',
    collection: 'Terracotta Classic',
    category: 'terracotta',
    size: 'Medium',
    dimensions: '30cm × 28cm',
    price: 'Rp 450.000',
    description: 'Pot terracotta klasik dengan bentuk bulat yang timeless. Ideal untuk tanaman indoor maupun outdoor.',
    image: 'https://images.unsplash.com/photo-1616694547880-621ed1943d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90JTIwcm91bmR8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'In Stock'
  },
  {
    id: 2,
    name: 'Terracotta Classic Tall',
    collection: 'Terracotta Classic',
    category: 'terracotta',
    size: 'Large',
    dimensions: '35cm × 45cm',
    price: 'Rp 650.000',
    description: 'Pot terracotta tinggi dengan desain elegan, sempurna untuk tanaman besar seperti fiddle leaf fig.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90JTIwdGFsbHxlbnwxfHx8fDE3NjQ4MzE2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  },
  {
    id: 3,
    name: 'Terracotta Classic Mini Set',
    collection: 'Terracotta Classic',
    category: 'terracotta',
    size: 'Small',
    dimensions: '12cm × 10cm',
    price: 'Rp 180.000',
    description: 'Set 3 pot mini terracotta untuk succulent dan kaktus. Sempurna untuk dekorasi meja.',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMHRlcnJhY290dGElMjBwb3RzfGVufDF8fHx8MTc2NDgzMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  },
  {
    id: 4,
    name: 'Terracotta Rustic Bowl',
    collection: 'Terracotta Classic',
    category: 'terracotta',
    size: 'Large',
    dimensions: '40cm × 20cm',
    price: 'Rp 520.000',
    description: 'Bowl terracotta lebar dengan finishing natural, cocok untuk tanaman trailing atau arrangement.',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwYm93bCUyMHBsYW50ZXJ8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'In Stock'
  },
  
  // Concrete Modern Collection
  {
    id: 5,
    name: 'Concrete Cylinder',
    collection: 'Concrete Modern',
    category: 'concrete',
    size: 'Medium',
    dimensions: '28cm × 30cm',
    price: 'Rp 580.000',
    description: 'Pot beton silinder dengan finishing halus dan minimalis. Desain kontemporer untuk interior modern.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHBsYW50ZXIlMjBjeWxpbmRlcnxlbnwxfHx8fDE3NjQ4MzE2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'In Stock'
  },
  {
    id: 6,
    name: 'Concrete Geometric',
    collection: 'Concrete Modern',
    category: 'concrete',
    size: 'Small',
    dimensions: '15cm × 15cm',
    price: 'Rp 320.000',
    description: 'Pot beton dengan bentuk geometric yang unik. Statement piece untuk tanaman kecil.',
    image: 'https://images.unsplash.com/photo-1597018945042-c0c8a0f0e421?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBjb25jcmV0ZSUyMHBsYW50ZXJ8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  },
  {
    id: 7,
    name: 'Concrete Square Modern',
    collection: 'Concrete Modern',
    category: 'concrete',
    size: 'Large',
    dimensions: '35cm × 35cm',
    price: 'Rp 720.000',
    description: 'Pot beton kotak dengan proporsi sempurna. Ideal untuk tanaman statement atau pohon kecil.',
    image: 'https://images.unsplash.com/photo-1610725664285-7c57e3f9c22f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcXVhcmUlMjBjb25jcmV0ZSUyMHBsYW50ZXJ8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'Limited'
  },
  {
    id: 8,
    name: 'Concrete Minimal White',
    collection: 'Concrete Modern',
    category: 'concrete',
    size: 'Medium',
    dimensions: '25cm × 25cm',
    price: 'Rp 480.000',
    description: 'Pot beton dengan finishing putih matte. Clean dan minimal untuk estetika Scandinavian.',
    image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNvbmNyZXRlJTIwcGxhbnRlcnxlbnwxfHx8fDE3NjQ4MzE2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'In Stock'
  },

  // Professional Series
  {
    id: 9,
    name: 'Professional Standard Set',
    collection: 'Professional Series',
    category: 'professional',
    size: 'Medium',
    dimensions: '30cm × 28cm',
    price: 'Rp 2.400.000',
    description: 'Set 6 pot dengan ukuran dan desain konsisten. Ideal untuk landscaping dan commercial space.',
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3QlMjBzZXQlMjBwbGFudHN8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  },
  {
    id: 10,
    name: 'Professional Large Planter',
    collection: 'Professional Series',
    category: 'professional',
    size: 'Extra Large',
    dimensions: '50cm × 50cm',
    price: 'Rp 1.250.000',
    description: 'Pot extra large untuk outdoor landscaping. Tahan cuaca dengan drainage system optimal.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMG91dGRvb3IlMjBwbGFudGVyfGVufDF8fHx8MTc2NDgzMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  },
  {
    id: 11,
    name: 'Professional Indoor Series',
    collection: 'Professional Series',
    category: 'professional',
    size: 'Mixed',
    dimensions: 'Various',
    price: 'Rp 3.200.000',
    description: 'Complete set untuk interior commercial space. Includes 10 pots dalam berbagai ukuran.',
    image: 'https://images.unsplash.com/photo-1604762511190-3b21a5d38846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudCUyMHBvdHN8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'Pre-order'
  },

  // Artisan Collection
  {
    id: 12,
    name: 'Artisan Handcrafted Unique',
    collection: 'Artisan Collection',
    category: 'artisan',
    size: 'Medium',
    dimensions: '32cm × 30cm',
    price: 'Rp 890.000',
    description: 'Pot handcrafted dengan detail tekstur unik. Setiap piece memiliki karakter berbeda.',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kY3JhZnRlZCUyMHBvdHRlcnl8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'Limited'
  },
  {
    id: 13,
    name: 'Artisan Textured Collection',
    collection: 'Artisan Collection',
    category: 'artisan',
    size: 'Small',
    dimensions: '20cm × 18cm',
    price: 'Rp 520.000',
    description: 'Pot dengan surface tekstur artisan yang detail. Limited edition dengan nomor seri.',
    image: 'https://images.unsplash.com/photo-1615673439830-bd1896a4ae1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMGNlcmFtaWMlMjBwb3R8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'Limited'
  },
  {
    id: 14,
    name: 'Artisan Sculptural Form',
    collection: 'Artisan Collection',
    category: 'artisan',
    size: 'Large',
    dimensions: '38cm × 40cm',
    price: 'Rp 1.150.000',
    description: 'Pot dengan bentuk sculptural yang artistic. Karya kolaborasi dengan ceramic artist.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmFsJTIwcG90dGVyeXxlbnwxfHx8fDE3NjQ4MzE2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    stock: 'Pre-order'
  },
  {
    id: 15,
    name: 'Artisan Glaze Special',
    collection: 'Artisan Collection',
    category: 'artisan',
    size: 'Medium',
    dimensions: '28cm × 26cm',
    price: 'Rp 780.000',
    description: 'Pot dengan special glaze finish yang reactive. Warna dan pattern unik pada setiap piece.',
    image: 'https://images.unsplash.com/photo-1635699892462-31a570570e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGF6ZWQlMjBjZXJhbWljJTIwcG90fGVufDF8fHx8MTc2NDgzMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    stock: 'In Stock'
  }
];

const categories = [
  { id: 'all', name: 'Semua Produk', color: '#7a746d' },
  { id: 'terracotta', name: 'Terracotta Classic', color: '#d99a73' },
  { id: 'concrete', name: 'Concrete Modern', color: '#9cab8a' },
  { id: 'professional', name: 'Professional Series', color: '#7a746d' },
  { id: 'artisan', name: 'Artisan Collection', color: '#d8d2c7' }
];

const sizes = ['All Sizes', 'Small', 'Medium', 'Large', 'Extra Large'];

export function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by size
    if (selectedSize !== 'All Sizes') {
      filtered = filtered.filter(p => p.size === selectedSize);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSize, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#d99a73] to-[#7a746d] text-white py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-6 relative">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
              whileHover={{ x: -3 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <Logo className="w-16 h-16 md:w-20 md:h-20" color="white" />
              <div>
                <motion.p
                  className="tracking-[0.3em] text-sm mb-2 text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  KOLEKSI LENGKAP
                </motion.p>
                <h1 className="text-5xl md:text-7xl leading-tight">
                  Katalog <span className="italic">Produk</span>
                </h1>
              </div>
            </div>
            <p className="text-2xl text-white/90 leading-relaxed">
              Temukan pot yang sempurna untuk setiap sudut ruangan Anda. 
              Dari klasik hingga modern, dari minimalis hingga artistic.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-12 mt-12"
          >
            <div>
              <div className="text-5xl mb-2">{products.length}</div>
              <div className="text-white/70">Produk</div>
            </div>
            <div>
              <div className="text-5xl mb-2">4</div>
              <div className="text-white/70">Koleksi</div>
            </div>
            <div>
              <div className="text-5xl mb-2">100%</div>
              <div className="text-white/70">Handcrafted</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-[#d8d2c7]/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a746d]/40" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-[#d8d2c7] focus:outline-none focus:border-[#d99a73] transition-colors bg-[#f7f6f3]"
              />
            </div>

            {/* Category Pills */}
            <div className="hidden lg:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="px-6 py-2 rounded-full text-sm transition-all"
                  style={{
                    backgroundColor: selectedCategory === cat.id ? cat.color : '#f7f6f3',
                    color: selectedCategory === cat.id ? 'white' : '#7a746d',
                    border: `2px solid ${selectedCategory === cat.id ? cat.color : '#d8d2c7'}`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 rounded-full bg-[#d99a73] text-white"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

            {/* View Toggle */}
            <div className="hidden md:flex gap-2 bg-[#f7f6f3] p-1 rounded-full">
              <button
                onClick={() => setGridView('grid')}
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: gridView === 'grid' ? '#d99a73' : 'transparent',
                  color: gridView === 'grid' ? 'white' : '#7a746d'
                }}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridView('list')}
                className="p-2 rounded-full transition-colors"
                style={{
                  backgroundColor: gridView === 'list' ? '#d99a73' : 'transparent',
                  color: gridView === 'list' ? 'white' : '#7a746d'
                }}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mt-6"
              >
                <div className="space-y-4 pb-4">
                  <div>
                    <p className="text-sm text-[#7a746d] mb-3">Kategori</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className="px-4 py-2 rounded-full text-sm transition-all"
                          style={{
                            backgroundColor: selectedCategory === cat.id ? cat.color : '#f7f6f3',
                            color: selectedCategory === cat.id ? 'white' : '#7a746d',
                            border: `1px solid ${selectedCategory === cat.id ? cat.color : '#d8d2c7'}`
                          }}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#7a746d] mb-3">Ukuran</p>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className="px-4 py-2 rounded-full text-sm transition-all"
                          style={{
                            backgroundColor: selectedSize === size ? '#9cab8a' : '#f7f6f3',
                            color: selectedSize === size ? 'white' : '#7a746d',
                            border: `1px solid ${selectedSize === size ? '#9cab8a' : '#d8d2c7'}`
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Products Grid/List */}
      <section className="container mx-auto px-6 py-16">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#7a746d]">
            Menampilkan <span className="font-medium">{filteredProducts.length}</span> produk
          </p>
          
          {/* Size Filter Desktop */}
          <div className="hidden lg:flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  backgroundColor: selectedSize === size ? '#9cab8a' : 'transparent',
                  color: selectedSize === size ? 'white' : '#7a746d',
                  border: `1px solid ${selectedSize === size ? '#9cab8a' : '#d8d2c7'}`
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        {gridView === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image Container */}
                  <motion.div 
                    className="relative aspect-square overflow-hidden rounded-2xl bg-white mb-4 shadow-md"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Overlay on Hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.featured && (
                        <span className="px-3 py-1 bg-[#d99a73] text-white text-xs rounded-full">
                          Featured
                        </span>
                      )}
                      <span
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: product.stock === 'In Stock' ? '#9cab8a' : 
                                          product.stock === 'Limited' ? '#d99a73' : '#7a746d',
                          color: 'white'
                        }}
                      >
                        {product.stock}
                      </span>
                    </div>

                    {/* Quick View Button - Langsung muncul saat hover */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <motion.button
                        className="px-6 py-2 bg-white text-[#7a746d] rounded-full text-sm shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        Lihat Detail
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <p className="text-xs text-[#7a746d]/60 tracking-wider uppercase">
                      {product.collection}
                    </p>
                    <h3 className="text-xl text-[#7a746d] group-hover:text-[#d99a73] transition-colors duration-500">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-[#7a746d]/60 text-sm">{product.dimensions}</p>
                      <p className="text-[#d99a73]">{product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* List View */}
        {gridView === 'list' && (
          <motion.div layout className="space-y-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-80 aspect-square md:aspect-auto overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xs text-[#7a746d]/60 tracking-wider uppercase mb-2">
                              {product.collection}
                            </p>
                            <h3 className="text-3xl text-[#7a746d] group-hover:text-[#d99a73] transition-colors mb-2">
                              {product.name}
                            </h3>
                            <p className="text-[#7a746d]/60">{product.dimensions}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl text-[#d99a73] mb-2">{product.price}</p>
                            <span
                              className="inline-block px-3 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: product.stock === 'In Stock' ? '#9cab8a' :
                                                product.stock === 'Limited' ? '#d99a73' : '#7a746d',
                                color: 'white'
                              }}
                            >
                              {product.stock}
                            </span>
                          </div>
                        </div>
                        <p className="text-[#7a746d]/70 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-6">
                        <motion.button
                          className="flex items-center gap-2 px-6 py-3 bg-[#d99a73] text-white rounded-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Lihat Detail
                        </motion.button>
                        {product.featured && (
                          <span className="px-4 py-2 bg-[#f7f6f3] text-[#d99a73] text-sm rounded-full">
                            ★ Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <div className="text-8xl text-[#7a746d]/20 mb-6">¯\_(ツ)_/¯</div>
            <h3 className="text-3xl text-[#7a746d] mb-4">Tidak ada produk ditemukan</h3>
            <p className="text-[#7a746d]/60 mb-8">
              Coba ubah filter atau pencarian Anda
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('All Sizes');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-[#d99a73] text-white rounded-full"
            >
              Reset Filter
            </button>
          </motion.div>
        )}
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-[#7a746d]" />
                </button>

                {/* Image */}
                <div className="aspect-video md:aspect-video overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-12">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0 mb-6">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-[#7a746d]/60 tracking-wider uppercase mb-2">
                        {selectedProduct.collection}
                      </p>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#7a746d] mb-3 md:mb-4">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-base md:text-xl text-[#7a746d]/60">
                        {selectedProduct.dimensions} • {selectedProduct.size}
                      </p>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto">
                      <p className="text-3xl md:text-4xl text-[#d99a73] mb-2 md:mb-3">
                        {selectedProduct.price}
                      </p>
                      <span
                        className="inline-block px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full"
                        style={{
                          backgroundColor: selectedProduct.stock === 'In Stock' ? '#9cab8a' :
                                          selectedProduct.stock === 'Limited' ? '#d99a73' : '#7a746d',
                          color: 'white'
                        }}
                      >
                        {selectedProduct.stock}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-[#d8d2c7] my-6 md:my-8" />

                  <p className="text-base md:text-xl text-[#7a746d]/80 leading-relaxed mb-6 md:mb-8">
                    {selectedProduct.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-[#7a746d]/60">Material</p>
                      <p className="text-sm md:text-lg text-[#7a746d]">
                        {selectedProduct.category === 'terracotta' ? 'Terracotta' :
                         selectedProduct.category === 'concrete' ? 'Concrete' :
                         selectedProduct.category === 'professional' ? 'Mixed' : 'Ceramic'}
                      </p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-[#7a746d]/60">Drainage</p>
                      <p className="text-sm md:text-lg text-[#7a746d]">Yes</p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-xs md:text-sm text-[#7a746d]/60">Weight</p>
                      <p className="text-sm md:text-lg text-[#7a746d]">
                        {selectedProduct.size === 'Small' ? '0.5-1 kg' :
                         selectedProduct.size === 'Medium' ? '2-3 kg' :
                         selectedProduct.size === 'Large' ? '4-6 kg' : '8-10 kg'}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <motion.button
                      className="flex-1 py-3 md:py-4 bg-[#d99a73] text-white rounded-full text-base md:text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Hubungi Kami
                    </motion.button>
                    <motion.button
                      className="flex-1 md:flex-initial px-6 md:px-8 py-3 md:py-4 border-2 border-[#d8d2c7] text-[#7a746d] rounded-full text-base md:text-lg hover:border-[#d99a73] hover:text-[#d99a73] transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Tanya Produk
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
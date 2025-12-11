"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Filter, Grid3x3, LayoutGrid, Search, X } from 'lucide-react';
import Link from 'next/link';
import { Footer } from './Footer';
import { Logo } from './Logo';

// Definisi tipe data sesuai dengan database Prisma
type Product = {
  id: number;
  name: string;
  subtitle?: string | null;
  description: string;
  image: string;
  tag?: string | null;
  color?: string | null;
  size?: string | null;
  dimensions?: string | null;
  price: string;
  category: string;
  featured: boolean;
  stock: string;
  collection?: string | null; 
};

// Kategori filter tetap statis karena ini bagian UI
const categories = [
  { id: 'all', name: 'Semua Produk', color: '#7a746d' },
  { id: 'terracotta', name: 'Terracotta Classic', color: '#d99a73' },
  { id: 'concrete', name: 'Concrete Modern', color: '#9cab8a' },
  { id: 'professional', name: 'Professional Series', color: '#7a746d' },
  { id: 'artisan', name: 'Artisan Collection', color: '#d8d2c7' }
];

const sizes = ['All Sizes', 'Small', 'Medium', 'Large', 'Extra Large'];

export function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleContact = (product: Product) => {
    const phoneNumber = "6285157979618"; 

    const message = `Halo Terraco, saya tertarik dan ingin bertanya mengenai produk: *${product.name}*. Apakah stok masih tersedia?`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products'); 
        if (!res.ok) throw new Error('Gagal mengambil data');
        const data = await res.json();
        
        const mappedData = data.map((item: any) => ({
          ...item,
          collection: item.subtitle || item.category 
        }));

        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedSize !== 'All Sizes' && product.size?.toLowerCase() !== selectedSize.toLowerCase()) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center">
        <div className="text-2xl text-[#7a746d] animate-pulse">Memuat Produk...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#d99a73] to-[#7a746d] text-white py-7 overflow-hidden">
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

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 rounded-full bg-[#d99a73] text-white"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>

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
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#7a746d]">
            Menampilkan <span className="font-medium">{filteredProducts.length}</span> produk
          </p>
          
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
                    
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    
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

                  <div className="space-y-2">
                    <p className="text-xs text-[#7a746d]/60 tracking-wider uppercase">
                      {product.collection || product.category}
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
                    <div className="md:w-80 aspect-square md:aspect-auto overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xs text-[#7a746d]/60 tracking-wider uppercase mb-2">
                              {product.collection || product.category}
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

        {filteredProducts.length === 0 && !loading && (
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
                        {selectedProduct.collection || selectedProduct.category}
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

                  {/* CTA - Single WhatsApp Button */}
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <motion.button
                      onClick={() => handleContact(selectedProduct)}
                      className="flex-1 py-3 md:py-4 bg-[#d99a73] text-white rounded-full text-base md:text-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Tanya Produk Ini
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
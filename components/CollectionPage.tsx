"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Filter, Grid3x3, LayoutGrid, Search, X } from 'lucide-react';
import Link from 'next/link';
import { Footer } from './Footer';
import { Logo } from './Logo';

// Tipe Data Baru dengan Variants
type Variant = {
  id: number;
  size: string;
  dimensions: string | null;
  price: number;
  stock: string;
};

type Product = {
  id: number;
  name: string;
  subtitle?: string | null;
  description: string;
  image: string;
  tag?: string | null;
  color?: string | null;
  category: string;
  featured: boolean;
  variants: Variant[]; // Array Varian
  collection?: string | null;
};

const categories = [
  { id: 'all', name: 'Semua Produk', color: '#7a746d' },
  { id: 'terracotta', name: 'Terracotta Classic', color: '#d99a73' },
  { id: 'concrete', name: 'Concrete Modern', color: '#9cab8a' },
  { id: 'professional', name: 'Professional Series', color: '#7a746d' },
  { id: 'artisan', name: 'Artisan Collection', color: '#d8d2c7' }
];

export function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Helper untuk format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper untuk mendapatkan range harga
  const getPriceRange = (variants: Variant[]) => {
    if (!variants || variants.length === 0) return 'Hubungi Kami';
    const prices = variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    if (min === max) return formatRupiah(min);
    return `${formatRupiah(min)} - ${formatRupiah(max)}`;
  };

  // Helper WhatsApp dengan Varian
  const handleContact = (product: Product) => {
    const phoneNumber = "6281234567890"; // Ganti nomor Anda
    
    // List varian untuk pesan
    const variantsList = product.variants.map(v => `- ${v.size} (${v.dimensions}): ${formatRupiah(v.price)}`).join('\n');
    
    const message = `Halo Terraco, saya tertarik dengan produk: *${product.name}*.\n\nSaya melihat varian:\n${variantsList}\n\nApakah stok tersedia?`;
    
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
      <section className="relative bg-gradient-to-br from-[#d99a73] to-[#7a746d] text-white py-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
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
                <motion.p className="tracking-[0.3em] text-sm mb-2 text-white/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  KOLEKSI LENGKAP
                </motion.p>
                <h1 className="text-5xl md:text-7xl leading-tight">
                  Katalog <span className="italic">Produk</span>
                </h1>
              </div>
            </div>
            <p className="text-2xl text-white/90 leading-relaxed">
              Temukan pot yang sempurna untuk setiap sudut ruangan Anda.
            </p>
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
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm transition-all border ${
                    selectedCategory === cat.id 
                      ? `bg-[${cat.color}] text-white border-[${cat.color}]` 
                      : 'bg-[#f7f6f3] text-[#7a746d] border-[#d8d2c7]'
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="hidden md:flex gap-2 bg-[#f7f6f3] p-1 rounded-full">
              <button onClick={() => setGridView('grid')} className={`p-2 rounded-full transition-colors ${gridView === 'grid' ? 'bg-[#d99a73] text-white' : 'text-[#7a746d]'}`}>
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button onClick={() => setGridView('list')} className={`p-2 rounded-full transition-colors ${gridView === 'list' ? 'bg-[#d99a73] text-white' : 'text-[#7a746d]'}`}>
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#7a746d]">Menampilkan <span className="font-medium">{filteredProducts.length}</span> produk</p>
        </div>

        <motion.div layout className={gridView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"}>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group cursor-pointer ${gridView === 'list' ? 'bg-white rounded-2xl overflow-hidden flex' : ''}`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className={`relative ${gridView === 'grid' ? 'aspect-square mb-4' : 'w-80 aspect-square'} overflow-hidden rounded-2xl bg-white shadow-md`}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && <span className="px-3 py-1 bg-[#d99a73] text-white text-xs rounded-full">Featured</span>}
                  </div>
                </div>

                <div className={gridView === 'list' ? 'flex-1 p-8 flex flex-col justify-between' : 'space-y-2'}>
                  <div>
                    <p className="text-xs text-[#7a746d]/60 tracking-wider uppercase mb-1">{product.collection}</p>
                    <h3 className={`text-[#7a746d] group-hover:text-[#d99a73] transition-colors ${gridView === 'list' ? 'text-3xl' : 'text-xl'}`}>
                      {product.name}
                    </h3>
                    {/* MENAMPILKAN RANGE HARGA */}
                    <p className={`text-[#d99a73] font-medium ${gridView === 'list' ? 'text-2xl mt-2' : ''}`}>
                      {getPriceRange(product.variants)}
                    </p>
                    
                    {/* MENAMPILKAN DAFTAR UKURAN (Preview) */}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {product.variants.map((v, i) => (
                        <span key={i} className="text-xs border border-[#d8d2c7] px-2 py-1 rounded text-[#7a746d]/80">
                          {v.size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto h-full bg-gray-100">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-[#7a746d]/60 mb-2">{selectedProduct.collection}</p>
                      <h2 className="text-3xl md:text-4xl text-[#7a746d]">{selectedProduct.name}</h2>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X className="w-6 h-6 text-[#7a746d]" />
                    </button>
                  </div>

                  <p className="text-[#7a746d]/80 leading-relaxed">{selectedProduct.description}</p>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#7a746d] uppercase tracking-wider border-b pb-2">Pilihan Varian</h4>
                    <div className="space-y-3">
                      {selectedProduct.variants.map((variant) => (
                        <div key={variant.id} className="flex justify-between items-center p-3 border rounded-lg hover:border-[#d99a73] transition-colors cursor-default">
                          <div>
                            <span className="font-medium text-[#7a746d]">{variant.size}</span>
                            <span className="text-sm text-[#7a746d]/60 ml-2">({variant.dimensions})</span>
                          </div>
                          <span className="text-[#d99a73] font-medium">{formatRupiah(variant.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleContact(selectedProduct)}
                    className="w-full py-4 bg-[#d99a73] text-white rounded-full text-lg hover:bg-[#c88a65] transition-colors shadow-lg mt-4"
                  >
                    Tanya Produk Ini
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
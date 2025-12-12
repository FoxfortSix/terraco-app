"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, ArrowUpRight, Filter, Grid3x3, LayoutGrid, Search, Star, X } from 'lucide-react';
import Link from 'next/link';
import { Footer } from './Footer';
import { Logo } from './Logo';

// Definisi tipe data
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
  variants: Variant[];
  collection?: string | null;
};

const categories = [
  { id: 'all', name: 'Semua Produk', color: '#7a746d' },
  { id: 'luna-terrazo', name: 'Luna Terrazo', color: '#E0D8CC' }, // Krem Batu
  { id: 'luna-natural', name: 'Luna Natural', color: '#A89F91' }, // Abu Tanah
  { id: 'luna-glosy', name: 'Luna Glosy', color: '#555555' },    // Abu Gelap
  { id: 'nara-glosy', name: 'Nara Glosy', color: '#D8C8B8' }     // Krem Elegan
];

export function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State UI
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [searchQuery, setSearchQuery] = useState('');
  const [gridView, setGridView] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- EFEK PARALLAX ---
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper Functions
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPriceRange = (variants: Variant[]) => {
    if (!variants || variants.length === 0) return 'Hubungi Kami';
    const prices = variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return formatRupiah(min);
    return `${formatRupiah(min)} - ${formatRupiah(max)}`;
  };

  const getAvailableSizes = (variants: Variant[]) => {
    if (!variants || variants.length === 0) return '';
    const uniqueSizes = Array.from(new Set(variants.map(v => v.size)));
    return uniqueSizes.join(', ');
  };

  const handleContact = (product: Product) => {
    const phoneNumber = "6281234567890";
    const variantsList = product.variants.map(v => `- ${v.size} (${v.dimensions}): ${formatRupiah(v.price)}`).join('\n');
    const message = `Halo Terraco, saya tertarik dengan produk: *${product.name}*.\n\nSaya melihat varian:\n${variantsList}\n\nApakah stok tersedia?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Fetch Data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Gagal mengambil data');
        const data = await res.json();
        const mappedData = data.map((item: any) => ({
          ...item,
          collection: item.subtitle || item.category,
          color: item.color || '#7a746d' 
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
    if (selectedSize !== 'All Sizes' && !product.variants.some(v => v.size.toLowerCase().includes(selectedSize.toLowerCase()))) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#d99a73] to-[#7a746d] text-white py-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
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
                  className={`px-6 py-2 rounded-full text-sm transition-all border ${selectedCategory === cat.id ? `text-white` : 'bg-[#f7f6f3] text-[#7a746d] border-[#d8d2c7]'}`}
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

      {/* Main Content */}
      <section ref={sectionRef} className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="flex items-center justify-center py-32">
             <div className="text-2xl text-[#7a746d] animate-pulse">Memuat Produk...</div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#7a746d]">Menampilkan <span className="font-medium">{filteredProducts.length}</span> produk</p>
            </div>

            {/* --- GRID VIEW --- */}
            {gridView === 'grid' && (
              <motion.div 
                layout
                style={{ y }} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-[400px]"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 bg-gray-100"
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <motion.div 
                        className="absolute inset-0"
                        animate={{ scale: isMobile ? 1 : (hoveredId === product.id ? 1.1 : 1) }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 mix-blend-multiply"
                        style={{ backgroundColor: product.color || '#d99a73' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isMobile ? 0 : (hoveredId === product.id ? 0.9 : 0) }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />

                      <div className="relative h-full p-8 flex flex-col justify-between text-white z-20">
                        <div className="self-start">
                          <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full bg-white/20">
                            <Star className="w-3 h-3 fill-white" />
                            <span className="tracking-wider text-xs uppercase">{product.tag || 'Available'}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 tracking-widest text-xs uppercase font-medium">
                            {product.collection || product.category}
                          </p>
                          <h3 className="text-2xl md:text-3xl font-light">{product.name}</h3>
                          
                          <div>
                            <p className="text-[#d99a73] text-lg font-medium">
                              {getPriceRange(product.variants)}
                            </p>
                            {product.variants.length > 0 && (
                              <p className="text-white/70 text-xs mt-1 font-light tracking-wide">
                                Size: {getAvailableSizes(product.variants)}
                              </p>
                            )}
                          </div>

                          {!isMobile && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: hoveredId === product.id ? 'auto' : 0,
                                opacity: hoveredId === product.id ? 1 : 0,
                                marginTop: hoveredId === product.id ? 16 : 0
                              }}
                              className="overflow-hidden"
                            >
                              <div className="w-full py-3 bg-white text-[#7a746d] rounded-full text-center text-sm font-medium uppercase tracking-wider hover:bg-[#d99a73] hover:text-white transition-colors">
                                Lihat Detail
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <motion.div
                        className="absolute top-4 right-4 text-7xl text-white/10 pointer-events-none select-none font-bold"
                        animate={{ scale: hoveredId === product.id ? 1.1 : 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        0{index + 1}
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* --- LIST VIEW (Horizontal Card) --- */}
            {gridView === 'list' && (
              <motion.div layout className="space-y-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-md hover:shadow-xl transition-all duration-500"
                    onClick={() => setSelectedProduct(product)}
                    onMouseEnter={() => !isMobile && setHoveredId(product.id)}
                    onMouseLeave={() => !isMobile && setHoveredId(null)}
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-72 aspect-square md:aspect-auto relative overflow-hidden">
                       <motion.div
                         className="w-full h-full"
                         animate={{ scale: !isMobile && hoveredId === product.id ? 1.1 : 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                       >
                         <ImageWithFallback 
                           src={product.image} 
                           alt={product.name} 
                           className="w-full h-full object-cover" 
                         />
                       </motion.div>
                       {/* Overlay list view */}
                       <motion.div
                          className="absolute inset-0 mix-blend-multiply"
                          style={{ backgroundColor: product.color || '#d99a73' }}
                          animate={{ opacity: !isMobile && hoveredId === product.id ? 0.3 : 0 }}
                          transition={{ duration: 0.6 }}
                       />
                       
                       <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2 px-3 py-1.5 backdrop-blur-md bg-white/30 rounded-full text-white">
                            <Star className="w-3 h-3 fill-white" />
                            <span className="tracking-wider text-[10px] uppercase">{product.tag || 'Available'}</span>
                          </div>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative">
                       <div className="space-y-3">
                          <div>
                             <p className="text-xs text-[#7a746d]/60 tracking-widest uppercase font-medium mb-1">
                               {product.collection || product.category}
                             </p>
                             <h3 className="text-2xl md:text-3xl text-[#7a746d] font-light">
                               {product.name}
                             </h3>
                          </div>

                          <div>
                             <p className="text-[#d99a73] text-xl font-medium">
                               {getPriceRange(product.variants)}
                             </p>
                             {product.variants.length > 0 && (
                                <p className="text-[#7a746d]/70 text-sm mt-1">
                                  Size: {getAvailableSizes(product.variants)}
                                </p>
                             )}
                          </div>

                          <p className="text-[#7a746d]/60 text-sm leading-relaxed line-clamp-2 md:line-clamp-none max-w-2xl">
                            {product.description}
                          </p>

                          {/* Button for Desktop List View */}
                          {!isMobile && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: hoveredId === product.id ? 'auto' : 0,
                                opacity: hoveredId === product.id ? 1 : 0,
                                marginTop: hoveredId === product.id ? 12 : 0
                              }}
                              className="overflow-hidden"
                            >
                               <div className="inline-flex items-center gap-2 text-[#d99a73] font-medium uppercase tracking-wider text-sm hover:underline">
                                  <span>Lihat Detail Lengkap</span>
                                  <ArrowUpRight className="w-4 h-4" />
                               </div>
                            </motion.div>
                          )}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-[#7a746d]/60">
                Tidak ada produk ditemukan.
              </div>
            )}
          </>
        )}
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
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

// Data Koleksi Baru
const collections = [
  {
    id: 1,
    name: 'Terracotta Signature',
    subtitle: 'Raw Earth Series',
    description: 'Keindahan ketidaksempurnaan alami. Tekstur tanah liat mentah yang dibakar sempurna, menciptakan nuansa rustik yang mendalam.',
    image: '/images/IMG_20251129_101902.bak.bak.jpg', 
    tag: 'Signature',
    color: '#d99a73',
  },
  {
    id: 2,
    name: 'Artisan Curve',
    subtitle: 'Handmade Craft',
    description: 'Lengkungan dinamis yang dibentuk dengan tangan. Setiap inci permukaannya menceritakan dedikasi pengrajin.',
    image: '/images/IMG_20251129_102102.bak.jpg',
    tag: 'Best Seller',
    color: '#9cab8a',
  },
  {
    id: 3,
    name: 'Modern Cylinder',
    subtitle: 'Minimalist Form',
    description: 'Siluet tegas dan bersih. Perpaduan sempurna antara fungsi modern dan material tradisional.',
    image: '/images/IMG_20251129_102636.bak.bak.jpg',
    tag: 'New Arrival',
    color: '#7a746d',
  },
  {
    id: 4,
    name: 'Heritage Pot',
    subtitle: 'Timeless Classic',
    description: 'Inspirasi bentuk kuno dengan finishing natural yang menonjolkan karakter asli tanah liat.',
    image: '/images/IMG_20251129_110211.bak.bak.jpg',
    tag: 'Exclusive',
    color: '#d8d2c7',
  }
];

export function Products() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Efek Parallax Scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <motion.span 
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-[#d99a73]"
              />
              <span className="text-[#d99a73] tracking-[0.25em] text-sm font-medium uppercase">Koleksi Terbaru</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#7a746d] font-light leading-tight">
              Eksplorasi <br/>
              {/* font-serif dihapus, hanya italic */}
              <span className="italic text-[#2c2a27]">Karya Tanah Liat</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/collections">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 border border-[#7a746d]/20 rounded-full hover:bg-[#7a746d] hover:text-white transition-all duration-300"
              >
                <span className="tracking-widest text-sm uppercase">Lihat Semua</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Grid Layout dengan Parallax */}
        <motion.div 
          style={{ y }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[320px]"
        >
          
          {/* Card 1: Utama (Besar Vertikal - Kiri) */}
          <Link href="/collections" className="lg:col-span-6 lg:row-span-2 group">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700"
              onMouseEnter={() => setHoveredId(1)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === 1 ? 1.08 : 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src={collections[0].image}
                  alt={collections[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[0].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === 1 ? 0.8 : 0 }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div 
                className="absolute top-6 right-6"
                animate={{ y: hoveredId === 1 ? 0 : -10, opacity: hoveredId === 1 ? 1 : 0.8 }}
              >
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs tracking-wider uppercase flex items-center gap-2">
                    <Star className="w-3 h-3 fill-white" />
                    {collections[0].tag}
                 </div>
              </motion.div>

              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full text-white">
                <div className="overflow-hidden">
                  <motion.p 
                    className="text-[#d99a73] tracking-widest text-sm mb-2 font-medium"
                    animate={{ y: hoveredId === 1 ? 0 : 5 }}
                  >
                    {collections[0].subtitle}
                  </motion.p>
                  
                  {/* font-serif dihapus */}
                  <motion.h3 
                    className="text-3xl md:text-5xl font-light mb-4"
                    animate={{ y: hoveredId === 1 ? 0 : 5 }}
                  >
                    {collections[0].name}
                  </motion.h3>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: hoveredId === 1 ? 1 : 0.7,
                      y: hoveredId === 1 ? 0 : 10
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed pb-2">
                      {collections[0].description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wider mt-4">
                      <span>Lihat Detail</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Lebar Horizontal (Kanan Atas) */}
          <Link href="/collections" className="lg:col-span-6 lg:row-span-1 group">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredId(2)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === 2 ? 1.08 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <ImageWithFallback
                  src={collections[1].image}
                  alt={collections[1].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[1].color }}
                animate={{ opacity: hoveredId === 2 ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />
              
              <div className="absolute bottom-8 left-8 text-white z-10 pr-8">
                <p className="text-xs text-[#d99a73] mb-1 tracking-widest uppercase">{collections[1].subtitle}</p>
                {/* font-serif dihapus */}
                <h3 className="text-3xl font-light mb-2">{collections[1].name}</h3>
                <motion.p 
                   animate={{ 
                     opacity: hoveredId === 2 ? 1 : 0, 
                     height: hoveredId === 2 ? 'auto' : 0,
                     y: hoveredId === 2 ? 0 : 10 
                   }}
                   className="text-sm text-white/90 max-w-sm overflow-hidden"
                >
                  {collections[1].description}
                </motion.p>
              </div>
            </motion.div>
          </Link>

          {/* Card 3: Kotak (Kanan Bawah Kiri) */}
          <Link href="/collections" className="lg:col-span-3 lg:row-span-1 group">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredId(3)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === 3 ? 1.1 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <ImageWithFallback
                  src={collections[2].image}
                  alt={collections[2].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[2].color }}
                animate={{ opacity: hoveredId === 3 ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute bottom-6 left-6 text-white p-2">
                <motion.div animate={{ y: hoveredId === 3 ? -5 : 0 }}>
                  {/* font-serif dihapus */}
                  <h3 className="text-xl font-light mb-1">{collections[2].name}</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">{collections[2].tag}</p>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* Card 4: Kotak (Kanan Bawah Kanan) */}
          <Link href="/collections" className="lg:col-span-3 lg:row-span-1 group">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => setHoveredId(4)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === 4 ? 1.1 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <ImageWithFallback
                  src={collections[3].image}
                  alt={collections[3].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[3].color }}
                animate={{ opacity: hoveredId === 4 ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute bottom-6 left-6 text-white p-2">
                <motion.div animate={{ y: hoveredId === 4 ? -5 : 0 }}>
                  {/* font-serif dihapus */}
                  <h3 className="text-xl font-light mb-1">{collections[3].name}</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">{collections[3].tag}</p>
                </motion.div>
              </div>
            </motion.div>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

// Data Koleksi (Foto Baru + Warna & Style Original)
const collections = [
  {
    id: 1,
    name: 'Luna Terrazo Natural Series',
    subtitle: 'Heritage Collection',
    description: 'Keindahan ketidaksempurnaan alami. Tekstur tanah liat mentah yang dibakar sempurna, menciptakan nuansa rustik yang mendalam.',
    image: '/images/IMG_20251129_101902.bak.bak.jpg', 
    tag: 'Signature',
    color: '#d99a73',
  },
  {
    id: 2,
    name: 'Luna natural Series',
    subtitle: 'Handmade Series',
    description: 'Lengkungan dinamis yang dibentuk dengan tangan. Setiap inci permukaannya menceritakan dedikasi pengrajin.',
    image: '/images/IMG_20251129_102102.bak.jpg',
    tag: 'Best Seller',
    color: '#9cab8a',
  },
  {
    id: 3,
    name: 'Luna glosy Series',
    subtitle: 'Contemporary Series',
    description: 'Siluet tegas dan bersih. Perpaduan sempurna antara fungsi modern dan material tradisional.',
    image: '/images/IMG_20251129_102636.bak.bak.jpg',
    tag: 'New Arrival',
    color: '#7a746d',
  },
  {
    id: 4,
    name: 'Nara glosy Series',
    subtitle: 'Limited Edition',
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

  // Efek Parallax Scroll (Sesuai Original)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header (Original Layout & Animation) */}
        <div className="mb-16 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <span className="text-[#d99a73] tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">KOLEKSI</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#7a746d] leading-tight">
                Karya{' '}
                <span className="italic bg-gradient-to-r from-[#d99a73] to-[#9cab8a] bg-clip-text text-transparent">
                  Kami
                </span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 w-48 bg-gradient-to-r from-[#d99a73] to-[#9cab8a] origin-left"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-[#7a746d]/70 leading-relaxed"
            >
              Setiap koleksi dirancang dengan perhatian pada detail, 
              kualitas, dan estetika yang tak lekang oleh waktu.
            </motion.p>
          </div>
        </div>

        {/* --- GRID LAYOUT BARU + ANIMASI ORIGINAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[320px]">
          
          {/* 1. KARTU UTAMA (KIRI - BESAR) */}
          <Link href="/collections" className="lg:col-span-6 lg:row-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-full w-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700"
              onMouseEnter={() => setHoveredId(collections[0].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Scale Animation */}
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === collections[0].id ? 1.05 : 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src={collections[0].image}
                  alt={collections[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </motion.div>

              {/* Overlay Color Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#d99a73]/90 to-[#7a746d]/90 mix-blend-multiply"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[0].id ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Content */}
              <div className="relative h-full p-10 flex flex-col justify-between text-white">
                {/* Tag */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="self-start"
                >
                  <motion.div 
                    className="flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full"
                    style={{ backgroundColor: `${collections[0].color}40` }}
                    animate={{ 
                      scale: hoveredId === collections[0].id ? 1.05 : 1,
                      backgroundColor: hoveredId === collections[0].id ? 'rgba(255,255,255,0.2)' : `${collections[0].color}40`
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Star className="w-4 h-4 fill-white" />
                    <span className="tracking-wider">{collections[0].tag}</span>
                  </motion.div>
                </motion.div>

                {/* Bottom Text Animations */}
                <div className="space-y-4">
                  <motion.p
                    className="text-white/80 tracking-widest text-sm"
                    animate={{ 
                      y: hoveredId === collections[0].id ? -5 : 0,
                      opacity: hoveredId === collections[0].id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {collections[0].subtitle}
                  </motion.p>
                  
                  <motion.h3 
                    className="text-5xl lg:text-6xl"
                    animate={{ y: hoveredId === collections[0].id ? -5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {collections[0].name}
                  </motion.h3>
                  
                  <motion.p
                    className="text-lg text-white/90 leading-relaxed max-w-lg"
                    animate={{ 
                      y: hoveredId === collections[0].id ? 0 : 20,
                      opacity: hoveredId === collections[0].id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {collections[0].description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-2 text-white group/btn"
                    animate={{ 
                      y: hoveredId === collections[0].id ? 0 : 20,
                      opacity: hoveredId === collections[0].id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <span className="text-lg">Lihat Koleksi</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </motion.div>
                </div>
              </div>

              {/* Number Background */}
              <motion.div
                className="absolute top-8 right-8 text-9xl text-white/10 pointer-events-none select-none"
                animate={{ opacity: hoveredId === collections[0].id ? 0.2 : 0.1 }}
                transition={{ duration: 0.5 }}
              >
                01
              </motion.div>
            </motion.div>
          </Link>

          {/* 2. KARTU KEDUA (KANAN ATAS - WIDE) */}
          <Link href="/collections" className="lg:col-span-6 lg:row-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onMouseEnter={() => setHoveredId(collections[1].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === collections[1].id ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src={collections[1].image}
                  alt={collections[1].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: collections[1].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[1].id ? 0.9 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-8 flex flex-col justify-between text-white">
                <motion.div
                  animate={{ 
                    scale: hoveredId === collections[1].id ? 1.05 : 1,
                    opacity: hoveredId === collections[1].id ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm transition-colors duration-300"
                    style={{ 
                      backgroundColor: hoveredId === collections[1].id ? 'rgba(255,255,255,0.2)' : `${collections[1].color}40`
                    }}
                  >
                    {collections[1].tag}
                  </div>
                </motion.div>

                <div className="space-y-3">
                  <motion.p 
                    className="text-white/70 text-sm tracking-wider"
                    animate={{ 
                      y: hoveredId === collections[1].id ? -3 : 0,
                      opacity: hoveredId === collections[1].id ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {collections[1].subtitle}
                  </motion.p>
                  
                  <motion.h3 
                    className="text-3xl"
                    animate={{ y: hoveredId === collections[1].id ? -3 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {collections[1].name}
                  </motion.h3>
                  
                  <motion.p
                    className="text-sm text-white/90 leading-relaxed"
                    animate={{ 
                      opacity: hoveredId === collections[1].id ? 1 : 0,
                      y: hoveredId === collections[1].id ? 0 : 15
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {collections[1].description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-2 text-white text-sm"
                    animate={{ 
                      y: hoveredId === collections[1].id ? 0 : 15,
                      opacity: hoveredId === collections[1].id ? 1 : 0
                    }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <span>Jelajahi</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute top-4 right-4 text-7xl text-white/10 pointer-events-none"
                  animate={{ opacity: hoveredId === collections[1].id ? 0.2 : 0.1 }}
                  transition={{ duration: 0.5 }}
                >
                  02
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* 3. KARTU KETIGA (KANAN BAWAH - KOTAK KIRI) */}
          <Link href="/collections" className="lg:col-span-3 lg:row-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onMouseEnter={() => setHoveredId(collections[2].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === collections[2].id ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src={collections[2].image}
                  alt={collections[2].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: collections[2].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[2].id ? 0.9 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start w-full">
                   <motion.div 
                    className="px-4 py-1.5 rounded-full text-xs transition-colors duration-300 backdrop-blur-sm"
                    style={{ 
                      backgroundColor: hoveredId === collections[2].id ? 'rgba(255,255,255,0.2)' : `${collections[2].color}40`
                    }}
                  >
                    {collections[2].tag}
                  </motion.div>
                  <motion.div
                    className="text-5xl text-white/10 pointer-events-none"
                    animate={{ opacity: hoveredId === collections[2].id ? 0.2 : 0.1 }}
                  >
                    03
                  </motion.div>
                </div>
                
                <motion.div className="space-y-1" animate={{ y: hoveredId === collections[2].id ? -5 : 0 }}>
                  <p className="text-xs text-white/70 tracking-wider uppercase">{collections[2].subtitle}</p>
                  <h3 className="text-xl md:text-2xl font-medium">{collections[2].name}</h3>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* 4. KARTU KEEMPAT (KANAN BAWAH - KOTAK KANAN) */}
          <Link href="/collections" className="lg:col-span-3 lg:row-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
              onMouseEnter={() => setHoveredId(collections[3].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === collections[3].id ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ImageWithFallback
                  src={collections[3].image}
                  alt={collections[3].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: collections[3].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[3].id ? 0.9 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start w-full">
                   <motion.div 
                    className="px-4 py-1.5 rounded-full text-xs transition-colors duration-300 backdrop-blur-sm"
                    style={{ 
                      backgroundColor: hoveredId === collections[3].id ? 'rgba(255,255,255,0.2)' : `${collections[3].color}40`
                    }}
                  >
                    {collections[3].tag}
                  </motion.div>
                  <motion.div
                    className="text-5xl text-white/10 pointer-events-none"
                    animate={{ opacity: hoveredId === collections[3].id ? 0.2 : 0.1 }}
                  >
                    04
                  </motion.div>
                </div>
                
                <motion.div className="space-y-1" animate={{ y: hoveredId === collections[3].id ? -5 : 0 }}>
                  <p className="text-xs text-white/70 tracking-wider uppercase">{collections[3].subtitle}</p>
                  <h3 className="text-xl md:text-2xl font-medium">{collections[3].name}</h3>
                </motion.div>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}
"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

// Data Koleksi Kategori (Cover Images)
const collections = [
  {
    id: 1,
    name: 'Luna Terrazo Natural',
    subtitle: 'Stone Series',
    description: 'Tekstur batu alami dengan desain modern yang kokoh dan artistik.',
    image: '/images/LunaTerrazoNaturalSeriesCover.jpg', 
    tag: 'Best Seller',
    color: '#E0D8CC', // Krem Batu
  },
  {
    id: 2,
    name: 'Luna Natural',
    subtitle: 'Authentic Clay',
    description: 'Kesederhanaan tanah liat murni untuk nuansa hangat dan membumi.',
    image: '/images/LunaNaturalSeriesCover.jpg',
    tag: 'Classic',
    color: '#A89F91', // Abu Tanah
  },
  {
    id: 3,
    name: 'Luna Glosy',
    subtitle: 'Modern Shine',
    description: 'Finishing mengkilap yang memberikan kesan bersih, modern, dan mewah.',
    image: '/images/LunaGlossy (5).jpg', // Menggunakan salah satu produk sebagai cover representatif
    tag: 'Modern',
    color: '#555555', // Gelap
  },
  {
    id: 4,
    name: 'Nara Glosy',
    subtitle: 'Elegant Curves',
    description: 'Lengkungan elegan dengan lapisan glossy premium untuk ruang eksklusif.',
    image: '/images/NaraGlosySeriesCover.jpg',
    tag: 'Exclusive',
    color: '#D8C8B8', // Krem Elegan
  }
];

export function Products() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Efek Parallax
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
        
        {/* Header */}
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
              Temukan karakter yang sesuai dengan ruang Anda, dari tekstur alami hingga kilau modern.
            </motion.p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Luna Terrazo (Besar Kiri) */}
          <Link href="/collections" className="lg:col-span-6 lg:row-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-full w-full relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700"
              onMouseEnter={() => setHoveredId(collections[0].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{ scale: hoveredId === collections[0].id ? 1.05 : 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <ImageWithFallback src={collections[0].image} alt={collections[0].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[0].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[0].id ? 0.8 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              <div className="relative h-full p-10 flex flex-col justify-between text-white">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="self-start"
                >
                  <div className="flex items-center gap-2 px-6 py-3 backdrop-blur-sm rounded-full bg-white/20">
                    <Star className="w-4 h-4 fill-white" />
                    <span className="tracking-wider">{collections[0].tag}</span>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <p className="text-white/80 tracking-widest text-sm">{collections[0].subtitle}</p>
                  <h3 className="text-5xl lg:text-6xl">{collections[0].name}</h3>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredId === collections[0].id ? 'auto' : 0,
                      opacity: hoveredId === collections[0].id ? 1 : 0,
                      y: hoveredId === collections[0].id ? 0 : 20
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-lg text-white/90 leading-relaxed max-w-lg mb-4">{collections[0].description}</p>
                    <div className="flex items-center gap-2 text-white group/btn">
                      <span className="text-lg">Lihat Koleksi</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div className="absolute top-8 right-8 text-9xl text-white/10 pointer-events-none select-none font-bold">01</motion.div>
            </motion.div>
          </Link>

          {/* Card 2: Luna Natural (Kanan Atas) */}
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
                <ImageWithFallback src={collections[1].image} alt={collections[1].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[1].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[1].id ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-8 flex flex-col justify-between text-white">
                <div className="self-start px-4 py-2 backdrop-blur-sm rounded-full bg-white/20 text-sm">
                  {collections[1].tag}
                </div>

                <div className="space-y-2">
                  <p className="text-white/70 text-sm tracking-wider">{collections[1].subtitle}</p>
                  <h3 className="text-3xl">{collections[1].name}</h3>
                  <motion.p
                    className="text-sm text-white/90 leading-relaxed max-w-md"
                    animate={{ opacity: hoveredId === collections[1].id ? 1 : 0, height: hoveredId === collections[1].id ? 'auto' : 0 }}
                  >
                    {collections[1].description}
                  </motion.p>
                </div>
                <div className="absolute top-4 right-4 text-7xl text-white/10 pointer-events-none font-bold">02</div>
              </div>
            </motion.div>
          </Link>

          {/* Card 3: Luna Glosy (Kanan Bawah Kiri) */}
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
                <ImageWithFallback src={collections[2].image} alt={collections[2].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[2].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[2].id ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-6 flex flex-col justify-end text-white">
                <div className="absolute top-4 right-4 text-5xl text-white/10 pointer-events-none font-bold">03</div>
                <div>
                  <p className="text-xs text-white/70 tracking-wider mb-1 uppercase">{collections[2].subtitle}</p>
                  <h3 className="text-xl md:text-2xl">{collections[2].name}</h3>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 4: Nara Glosy (Kanan Bawah Kanan) */}
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
                <ImageWithFallback src={collections[3].image} alt={collections[3].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-0 mix-blend-multiply"
                style={{ backgroundColor: collections[3].color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collections[3].id ? 0.8 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full p-6 flex flex-col justify-end text-white">
                <div className="absolute top-4 right-4 text-5xl text-white/10 pointer-events-none font-bold">04</div>
                <div>
                  <p className="text-xs text-white/70 tracking-wider mb-1 uppercase">{collections[3].subtitle}</p>
                  <h3 className="text-xl md:text-2xl">{collections[3].name}</h3>
                </div>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>
    </section>
  );
}
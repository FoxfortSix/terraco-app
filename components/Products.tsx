"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';

const collections = [
  {
    id: 1,
    name: 'Terracotta Classic',
    subtitle: 'Heritage Collection',
    description: 'Koleksi pot terracotta dengan desain timeless yang menghadirkan kehangatan natural',
    image: 'https://images.unsplash.com/photo-1763136241763-0801a85b3b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90dGVyeSUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzY0ODMxNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Best Seller',
    color: '#d99a73',
    size: 'large'
  },
  {
    id: 2,
    name: 'Concrete Modern',
    subtitle: 'Contemporary Series',
    description: 'Pot beton premium dengan finishing halus dan desain kontemporer minimalis',
    image: 'https://images.unsplash.com/photo-1758426637680-8a1172a60531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMHBsYW50ZXJzJTIwbW9kZXJufGVufDF8fHx8MTc2NDgzMTY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'New',
    color: '#9cab8a',
    size: 'medium'
  },
  {
    id: 3,
    name: 'Professional Series',
    subtitle: 'Pro Collection',
    description: 'Solusi pot untuk penata taman dan dekorator dengan ukuran dan desain konsisten',
    image: 'https://images.unsplash.com/photo-1701271040533-59a76ac4e887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90cyUyMHBsYW50cyUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Professional',
    color: '#7a746d',
    size: 'medium'
  },
  {
    id: 4,
    name: 'Artisan Collection',
    subtitle: 'Limited Edition',
    description: 'Karya handcrafted dengan detail unik dan finishing eksklusif',
    image: 'https://images.unsplash.com/photo-1617326033821-449e82ca23d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGxhbnQlMjBkZWNvcnxlbnwxfHx8fDE3NjQ4MzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Exclusive',
    color: '#d8d2c7',
    size: 'small'
  }
];

export function Products() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
              Setiap koleksi dirancang dengan perhatian pada detail, 
              kualitas, dan estetika yang tak lekang oleh waktu.
            </motion.p>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Card - Terracotta Classic */}
          <Link href="/collections" className="lg:row-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="h-full min-h-[600px] relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700"
              onMouseEnter={() => setHoveredId(collections[0].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
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

              {/* Overlay Effect */}
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

                {/* Bottom Content */}
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
                    animate={{ 
                      y: hoveredId === collections[0].id ? -5 : 0
                    }}
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

              {/* Number */}
              <motion.div
                className="absolute top-8 right-8 text-9xl text-white/10 pointer-events-none select-none"
                animate={{ 
                  opacity: hoveredId === collections[0].id ? 0.2 : 0.1
                }}
                transition={{ duration: 0.5 }}
              >
                01
              </motion.div>
            </motion.div>
          </Link>

          {/* Medium Cards - Concrete Modern & Professional Series */}
          {collections.slice(1, 3).map((collection, index) => (
            <Link key={collection.id} href="/collections">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="h-[290px] relative group cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ scale: hoveredId === collection.id ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <ImageWithFallback
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: collection.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === collection.id ? 0.9 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between text-white">
                  <motion.div
                    animate={{ 
                      scale: hoveredId === collection.id ? 1.05 : 1,
                      opacity: hoveredId === collection.id ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm transition-colors duration-300"
                      style={{ 
                        backgroundColor: hoveredId === collection.id ? 'rgba(255,255,255,0.2)' : `${collection.color}40`
                      }}
                    >
                      {collection.tag}
                    </div>
                  </motion.div>

                  <div className="space-y-3">
                    <motion.p 
                      className="text-white/70 text-sm tracking-wider"
                      animate={{ 
                        y: hoveredId === collection.id ? -3 : 0,
                        opacity: hoveredId === collection.id ? 1 : 0.7
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {collection.subtitle}
                    </motion.p>
                    
                    <motion.h3 
                      className="text-3xl"
                      animate={{ 
                        y: hoveredId === collection.id ? -3 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {collection.name}
                    </motion.h3>
                    
                    <motion.p
                      className="text-sm text-white/90 leading-relaxed"
                      animate={{ 
                        opacity: hoveredId === collection.id ? 1 : 0,
                        y: hoveredId === collection.id ? 0 : 15
                      }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {collection.description}
                    </motion.p>

                    <motion.div
                      className="flex items-center gap-2 text-white text-sm"
                      animate={{ 
                        y: hoveredId === collection.id ? 0 : 15,
                        opacity: hoveredId === collection.id ? 1 : 0
                      }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <span>Jelajahi</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Number */}
                  <motion.div
                    className="absolute top-4 right-4 text-7xl text-white/10 pointer-events-none"
                    animate={{ 
                      opacity: hoveredId === collection.id ? 0.2 : 0.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    0{index + 2}
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}

          {/* Small Card - Artisan Collection (Full Width) */}
          <Link href="/collections" className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-[250px] relative group cursor-pointer overflow-hidden bg-[#f7f6f3]"
              onMouseEnter={() => setHoveredId(collections[3].id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#d99a73] to-[#7a746d]"
                animate={{ opacity: hoveredId === collections[3].id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative h-full px-10 py-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <motion.div 
                    className="px-6 py-3 rounded-full text-sm transition-colors duration-300"
                    style={{ 
                      backgroundColor: hoveredId === collections[3].id ? 'rgba(255,255,255,0.2)' : collections[3].color,
                      color: hoveredId === collections[3].id ? 'white' : '#7a746d'
                    }}
                    animate={{ 
                      scale: hoveredId === collections[3].id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {collections[3].tag}
                  </motion.div>

                  <div className="space-y-2">
                    <motion.p 
                      className="text-sm tracking-wider transition-colors duration-300"
                      style={{ color: hoveredId === collections[3].id ? 'rgba(255,255,255,0.8)' : 'rgba(122,116,109,0.6)' }}
                      animate={{ 
                        y: hoveredId === collections[3].id ? -2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {collections[3].subtitle}
                    </motion.p>
                    
                    <motion.h3 
                      className="text-4xl transition-colors duration-300"
                      style={{ color: hoveredId === collections[3].id ? 'white' : '#7a746d' }}
                      animate={{ 
                        y: hoveredId === collections[3].id ? -2 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {collections[3].name}
                    </motion.h3>
                    
                    <motion.p
                      className="text-sm max-w-2xl leading-relaxed"
                      style={{ 
                        color: hoveredId === collections[3].id ? 'rgba(255,255,255,0.9)' : 'rgba(122,116,109,0.7)'
                      }}
                      animate={{
                        opacity: hoveredId === collections[3].id ? 1 : 0.7,
                        y: hoveredId === collections[3].id ? 0 : 5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {collections[3].description}
                    </motion.p>
                  </div>
                </div>

                <motion.div
                  className="text-8xl transition-colors duration-300"
                  style={{ 
                    color: hoveredId === collections[3].id ? 'rgba(255,255,255,0.1)' : 'rgba(122,116,109,0.1)'
                  }}
                  animate={{ 
                    opacity: hoveredId === collections[3].id ? 0.2 : 0.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  04
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
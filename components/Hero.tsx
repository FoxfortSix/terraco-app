"use client";
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const parallaxX = (mousePosition.x - windowWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - windowHeight / 2) * 0.02;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-[#f7f6f3] via-[#d8d2c7]/30 to-[#9cab8a]/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d8d2c7]/10 to-transparent pointer-events-none" />
      
      {/* Main Content Container */}
      {/* pt-20 (80px) untuk clear Navbar. justify-center untuk vertikal tengah. pb-12 untuk mengangkat visual center sedikit ke atas. */}
      <div className="relative h-full flex flex-col justify-center pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left: Typography */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-5 z-10 order-2 lg:order-1"
              style={{
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              }}
            >
              {/* Logo with Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-2"
              >
                {/* Font size disesuaikan agar tidak terlalu memakan tempat vertikal */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] tracking-tighter text-[#7a746d] leading-none">
                  TERRACO
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-[#d99a73] via-[#9cab8a] to-transparent"
                />
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="space-y-0"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-[#7a746d] italic opacity-50 leading-tight font-light">
                  Elegant
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-[#d99a73] leading-tight">
                  Minimalist
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-[#9cab8a] italic leading-tight font-light">
                  Pottery
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg text-[#7a746d]/80 max-w-md leading-relaxed pt-2"
              >
                Dimana seni bertemu fungsi. Setiap pot adalah karya yang menceritakan 
                kisah tentang keindahan alami dan craftsmanship yang sempurna.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex gap-6 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-3 bg-[#7a746d] text-white overflow-hidden shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#d99a73] to-[#9cab8a]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 tracking-widest text-xs sm:text-sm uppercase font-medium">Lihat Katalog</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: Artistic Image Composition */}
            {/* Ukuran container disesuaikan agar compact */}
            <div className="relative h-[450px] lg:h-[550px] hidden lg:block order-1 lg:order-2">
               <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  style={{
                    transform: `translate(${-parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`,
                  }}
               >
                  {/* Main Image (Portrait) */}
                  <motion.div 
                    className="absolute right-8 top-0 w-[300px] h-[420px] lg:w-[340px] lg:h-[480px] overflow-hidden shadow-2xl z-10"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1701271040533-59a76ac4e887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90cyUyMHBsYW50cyUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzY0ODMxNjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Terraco Premium Pots"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                  </motion.div>

                  {/* Secondary Image (Accent) */}
                  <motion.div 
                    className="absolute right-[240px] top-[280px] lg:right-[290px] lg:top-[320px] w-[200px] h-[260px] lg:w-[240px] lg:h-[300px] overflow-hidden shadow-xl z-20 border-[6px] border-[#f7f6f3]"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1763136241763-0801a85b3b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwcG90dGVyeSUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzY0ODMxNjkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Pottery Detail"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                  </motion.div>

                  {/* Abstract Line Decoration */}
                  <motion.div 
                    className="absolute right-0 top-[60px] w-[400px] h-[350px] border border-[#d99a73]/20 z-0"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.1 }}
                  />
               </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Dibuat lebih halus posisinya */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          opacity: Math.max(0, 1 - scrollY / 300),
        }}
      >
        <p className="text-[10px] md:text-xs text-[#7a746d]/60 tracking-widest uppercase">Scroll Down</p>
        <ArrowDown className="w-4 h-4 text-[#7a746d]/60" />
      </motion.div>
    </section>
  );
}
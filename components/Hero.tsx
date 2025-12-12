"use client";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  const parallaxX = (mousePosition.x - windowWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - windowHeight / 2) * 0.02;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-gradient-to-br from-[#f7f6f3] via-[#d8d2c7]/30 to-[#9cab8a]/10">
      
      {/* Main Content Container */}
      <div className="relative h-full flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-center">

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-5 z-10 order-2 lg:order-1 lg:pl-8"
              style={{
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter text-[#7a746d] leading-none">
                  TERRACO
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-[#d99a73] via-[#9cab8a] to-transparent"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="space-y-0"
              >
                <p className="text-2xl md:text-4xl text-[#7a746d] italic opacity-50 font-light leading-tight">
                  Elegant
                </p>
                <p className="text-2xl md:text-4xl text-[#d99a73] leading-tight">
                  Minimalist
                </p>
                <p className="text-2xl md:text-4xl text-[#9cab8a] italic font-light leading-tight">
                  Pottery
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-sm md:text-lg text-[#7a746d]/80 max-w-md leading-relaxed pt-2"
              >
                Dimana seni bertemu fungsi. Setiap pot adalah karya yang
                menceritakan kisah tentang keindahan alami dan craftsmanship yang
                sempurna.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="pt-4"
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
                  <span className="relative z-10 tracking-widest text-xs sm:text-sm uppercase font-medium">
                    Lihat Katalog
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Images */}
            <div className="relative h-[430px] lg:h-[500px] order-1 lg:order-2 hidden lg:flex justify-center">
              <motion.div
                className="relative w-[85%] h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                style={{
                  transform: `translate(${-parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`,
                }}
              >
                {/* Main Image */}
                <motion.div
                  className="absolute right-4 top-0 w-[270px] h-[380px] lg:w-[300px] lg:h-[420px] overflow-hidden shadow-xl rounded-sm z-10"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1701271040533-59a76ac4e887?auto=format&q=80&w=1080"
                    alt="Terraco Premium Pots"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Secondary Image */}
                <motion.div
                  className="absolute right-[220px] top-[260px] w-[200px] h-[250px] lg:w-[220px] lg:h-[280px] overflow-hidden shadow-lg z-20 border-[5px] border-[#f7f6f3]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1763136241763-0801a85b3b35?auto=format&q=80&w=1080"
                    alt="Pottery Detail"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                  className="absolute right-2 top-[50px] w-[350px] h-[300px] border border-[#d99a73]/20 z-0"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <p className="text-[10px] md:text-xs text-[#7a746d]/60 tracking-widest uppercase">
          Scroll Down
        </p>
        <ArrowDown className="w-4 h-4 text-[#7a746d]/60" />
      </motion.div>
    </section>
  );
}

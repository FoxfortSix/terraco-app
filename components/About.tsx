"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const missions = [
    'Menghadirkan pot berkualitas tinggi yang memadukan estetika minimalis dengan ketahanan material',
    'Mendukung konsumen dalam menciptakan ruang hijau yang modern dan harmonis',
    'Menyediakan solusi bagi penata taman dengan produk konsisten dan elegan',
    'Mengutamakan proses dan material yang ramah lingkungan'
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#7a746d] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Sticky Image Column */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <motion.div style={{ y: imageY, opacity }}>
              {/* Image Grid */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8 }}
                  className="aspect-[4/5] overflow-hidden"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1617326033821-449e82ca23d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcGxhbnQlMjBkZWNvcnxlbnwxfHx8fDE3NjQ4MzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="About Terraco"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7a746d] via-transparent to-transparent" />
                </motion.div>

                {/* Floating Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 bg-[#d99a73] p-6 md:p-8 max-w-[250px] md:max-w-xs shadow-2xl"
                >
                  <p className="text-white italic text-lg md:text-xl leading-relaxed">
                    "Setiap pot adalah karya seni yang hidup"
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Content Column */}
          <motion.div 
            style={{ y: textY }}
            className="space-y-10 md:space-y-16 text-white"
          >
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 md:w-20 h-px bg-[#d99a73]" />
                <span className="text-[#d99a73] tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">VISI</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Estetika Natural untuk{' '}
                <span className="italic text-[#d99a73]">Setiap Ruang</span>
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed">
                Menjadi penyedia pot terracotta dan beton premium yang menghadirkan 
                estetika natural dan modern ke setiap ruang, baik rumah maupun taman profesional.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px bg-gradient-to-r from-[#d99a73] via-[#9cab8a] to-transparent origin-left"
            />

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 md:w-20 h-px bg-[#9cab8a]" />
                <span className="text-[#9cab8a] tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">MISI</span>
              </div>

              <div className="space-y-4 md:space-y-6">
                {missions.map((mission, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex gap-3 md:gap-4 group cursor-default"
                  >
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="mt-2 w-2 h-2 bg-[#d99a73] shrink-0 group-hover:bg-[#9cab8a] transition-colors"
                    />
                    <p className="text-base md:text-lg text-white/80 group-hover:text-white transition-colors leading-relaxed">
                      {mission}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

const values = [
  {
    number: '01',
    title: 'Kualitas Premium',
    description: 'Material pilihan dengan finishing berkualitas tinggi yang tahan lama'
  },
  {
    number: '02',
    title: 'Desain Timeless',
    description: 'Estetika minimalis yang tidak lekang oleh waktu dan selalu relevan'
  },
  {
    number: '03',
    title: 'Ramah Lingkungan',
    description: 'Proses produksi yang memperhatikan keberlanjutan dan alam'
  }
];

export function Values() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-gradient-to-br from-[#f7f6f3] to-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24 space-y-4 md:space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d99a73] tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">NILAI-NILAI</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#7a746d] mt-4 mb-4 md:mb-6">
              Yang Kami{' '}
              <span className="italic bg-gradient-to-r from-[#d99a73] to-[#9cab8a] bg-clip-text text-transparent">
                Junjung
              </span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 w-20 md:w-32 mx-auto bg-gradient-to-r from-[#d99a73] via-[#9cab8a] to-[#7a746d]"
          />
        </motion.div>

        {/* Values Grid - Simple 3 Columns */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group space-y-4 md:space-y-6"
            >
              {/* Number */}
              <motion.div 
                className="text-6xl md:text-7xl lg:text-8xl text-[#d99a73]/20 group-hover:text-[#d99a73]/40 transition-colors duration-500"
              >
                {value.number}
              </motion.div>
              
              {/* Title */}
              <h4 className="text-2xl md:text-3xl text-[#7a746d] group-hover:text-[#d99a73] transition-colors duration-300">
                {value.title}
              </h4>
              
              {/* Description */}
              <p className="text-base md:text-lg text-[#7a746d]/70 leading-relaxed">
                {value.description}
              </p>

              {/* Decorative Line */}
              <motion.div
                className="h-px bg-gradient-to-r from-[#9cab8a] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

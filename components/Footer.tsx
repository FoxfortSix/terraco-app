"use client";
import { motion } from 'motion/react';
import { Instagram, Facebook, Mail, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    produk: ['Terracotta Classic', 'Concrete Modern', 'Professional Series', 'Custom Order'],
    perusahaan: ['Visi & Misi', 'Nilai-Nilai', 'Hubungi Kami'],
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#7a746d] via-[#7a746d] to-[#9cab8a] text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,.03) 50px, rgba(255,255,255,.03) 100px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,.03) 50px, rgba(255,255,255,.03) 100px)
          `,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer */}
        <div className="py-16 md:py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand Column - Larger */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Logo className="w-12 h-12 md:w-14 md:h-14" color="white" />
                <h3 className="text-4xl md:text-5xl tracking-tighter">TERRACO</h3>
              </div>
              <p className="text-xl md:text-2xl text-[#d99a73] italic">
                Elegant Minimalist Pottery
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-1 w-24 md:w-32 bg-gradient-to-r from-[#d99a73] to-[#9cab8a] origin-left"
              />
            </div>
            
            <p className="text-white/80 leading-relaxed max-w-md text-base md:text-lg">
              Pot premium dengan estetika natural dan modern untuk setiap ruang. 
              Menghadirkan keharmonisan antara seni dan fungsi.
            </p>

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Mail, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -6
                  }}
                  whileTap={{ 
                    scale: 0.95
                  }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[#d99a73] flex items-center justify-center transition-colors duration-500"
                  style={{ 
                    transition: 'background-color 0.5s ease, transform 0.4s ease' 
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (colIndex + 1) }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg md:text-xl tracking-wider uppercase text-[#d99a73]">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li key={index}>
                    <motion.a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors inline-block relative group"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link}</span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-[#d99a73]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Bottom Bar */}
        <div className="py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 text-center md:text-left text-sm md:text-base"
          >
            © 2025 Terraco. All rights reserved. Crafted with passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4 md:gap-6 text-white/60 text-sm md:text-base"
          >
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, backgroundColor: '#d99a73' }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
          >
            <ArrowUp className="w-5 h-5 group-hover:translate-y-[-3px] transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#d99a73]/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
}
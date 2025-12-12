"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'values', 'collections', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '#home', id: 'home' },
    { name: 'Tentang', href: '#about', id: 'about' },
    { name: 'Nilai', href: '#values', id: 'values' },
    { name: 'Koleksi', href: '#collections', id: 'collections' },
    { name: 'Kontak', href: '#contact', id: 'contact' }
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-[#7a746d]/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick('#home');
            }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Logo 
              className="w-10 h-10 transition-all duration-500" 
              color={scrolled ? '#d99a73' : '#7a746d'}
            />
            <h3 
              className={`text-2xl tracking-tighter transition-colors duration-300 ${
                scrolled ? 'text-[#7a746d]' : 'text-[#7a746d]'
              }`}
              style={scrolled ? {} : { textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              TERRACO
            </h3>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.href);
                }}
                className={`relative tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-[#7a746d]' : 'text-[#7a746d]'
                } ${activeSection === item.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                style={scrolled ? {} : { textShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d99a73] to-[#9cab8a]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}

            {/* CTA Button */}
            <motion.a
              href="https://wa.me/6285157979618?text=Halo%20Terraco%2C%20saya%20tertarik%20dengan%20produk%20kalian."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-6 py-3 bg-gradient-to-r from-[#d99a73] to-[#9cab8a] 
                text-white rounded-md shadow-md transition-all duration-300"
            >
              <span className="relative tracking-wider">Hubungi</span>
            </motion.a>

          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden z-50 transition-colors duration-300 ${
              scrolled || isOpen ? 'text-[#7a746d]' : 'text-[#7a746d]'
            }`}
            style={scrolled || isOpen ? {} : { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-[#d8d2c7]"
          >
            <div className="container mx-auto px-6 py-8 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block text-2xl transition-colors ${
                    activeSection === item.id 
                      ? 'text-[#d99a73]' 
                      : 'text-[#7a746d] hover:text-[#d99a73]'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}

            <motion.a
              href="https://wa.me/6285157979618?text=Halo%20Terraco%2C%20saya%20tertarik%20dengan%20produk%20kalian."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block w-full mt-6 py-4 bg-gradient-to-r from-[#d99a73] to-[#9cab8a] 
                text-white text-center text-xl tracking-wider rounded-md shadow"
            >
              Hubungi Kami
            </motion.a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
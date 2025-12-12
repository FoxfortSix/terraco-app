"use client";
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function Contact() {
  const [isInView, setIsInView] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      value: '+62 851-5797-9618',
      color: '#9cab8a'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: 'Lembang, Bandung, Indonesia',
      color: '#7a746d'
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-[#f7f6f3] via-white to-[#d8d2c7]/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-8 md:space-y-12 lg:space-y-16">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-3 md:space-y-4 lg:space-y-6"
            >
              <span className="text-[#d99a73] tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">HUBUNGI KAMI</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#7a746d] leading-tight">
                Mari{' '}
                <span className="italic bg-gradient-to-r from-[#d99a73] to-[#9cab8a] bg-clip-text text-transparent">
                  Berdiskusi
                </span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 w-24 md:w-32 lg:w-48 bg-gradient-to-r from-[#d99a73] to-[#9cab8a] origin-left"
              />
              <p className="text-base md:text-lg lg:text-xl text-[#7a746d]/70 leading-relaxed max-w-lg">
                Baik Anda seorang pecinta dekorasi rumah atau penata taman profesional, 
                kami siap membantu Anda menemukan pot yang sempurna.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="group relative bg-white/80 backdrop-blur-sm p-4 md:p-6 overflow-hidden cursor-pointer"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: info.color }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center gap-4 md:gap-6">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ 
                        backgroundColor: `${info.color}20`,
                      }}
                    >
                      <info.icon 
                        className="w-5 h-5 md:w-7 md:h-7 group-hover:text-[#2c2a27] transition-colors duration-300" 
                        style={{ color: info.color }}
                      />
                    </motion.div>
                    
                    <div className="space-y-0.5 md:space-y-1">
                      <p className="text-xs md:text-sm text-[#7a746d]/60 group-hover:text-[#2c2a27]/80 transition-colors duration-300">
                        {info.title}
                      </p>
                      <p className="text-base md:text-xl text-[#7a746d] group-hover:text-[#2c2a27] transition-colors duration-300 break-all">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Decorative Element */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-br from-[#d99a73]/10 via-[#9cab8a]/10 to-transparent blur-3xl -z-10"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
              <form className="relative z-10 space-y-5 md:space-y-6 lg:space-y-8">
                {/* Name Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'name' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 md:space-y-3"
                >
                  <label className="text-[#7a746d] tracking-wide text-sm md:text-base">Nama</label>
                  <Input
                    placeholder="Nama lengkap Anda"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="border-2 border-[#d8d2c7] focus:border-[#d99a73] transition-all duration-300 py-3 md:py-5 lg:py-6 text-base md:text-lg"
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#d99a73] to-[#9cab8a]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'email' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 md:space-y-3"
                >
                  <label className="text-[#7a746d] tracking-wide text-sm md:text-base">Email</label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="border-2 border-[#d8d2c7] focus:border-[#9cab8a] transition-all duration-300 py-3 md:py-5 lg:py-6 text-base md:text-lg"
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#9cab8a] to-[#d99a73]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'phone' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 md:space-y-3"
                >
                  <label className="text-[#7a746d] tracking-wide text-sm md:text-base">Telepon</label>
                  <Input
                    type="tel"
                    placeholder="+62 812-xxxx-xxxx"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="border-2 border-[#d8d2c7] focus:border-[#7a746d] transition-all duration-300 py-3 md:py-5 lg:py-6 text-base md:text-lg"
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#7a746d] to-[#9cab8a]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'message' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2 md:space-y-3"
                >
                  <label className="text-[#7a746d] tracking-wide text-sm md:text-base">Pesan</label>
                  <Textarea
                    placeholder="Ceritakan kebutuhan Anda..."
                    rows={5}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="border-2 border-[#d8d2c7] focus:border-[#d99a73] transition-all duration-300 resize-none text-base md:text-lg p-3 md:p-4"
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#d99a73] via-[#9cab8a] to-[#7a746d]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full py-4 md:py-5 lg:py-6 bg-gradient-to-r from-[#7a746d] to-[#9cab8a] text-white overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#d99a73] to-[#d8d2c7]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg tracking-wider md:tracking-widest">
                    <span>KIRIM PESAN</span>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
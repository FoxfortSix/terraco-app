"use client";
import { Logo } from './Logo';
import { Instagram, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    const message = "Halo, saya ingin bertanya seputar produk Terraco.";
    window.open(`https://wa.me/6285157979618?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com/terraco.indonesia', '_blank');
  };

  return (
    <footer className="bg-[#7a746d] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <Logo color="white" className="w-8 h-8" />
              <span className="text-2xl font-bold tracking-widest">TERRACO</span>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
              Menghadirkan keindahan alami tanah liat Indonesia ke dalam ruang modern Anda. Kualitas ekspor, buatan tangan pengrajin lokal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6 tracking-widest">MENU</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">Koleksi Produk</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6 tracking-widest">KONTAK</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li>Lembang, Bandung</li>
              <li>Indonesia</li>
              <li>+62 851-5797-9618</li>
              <li>terraco.indonesia@gmail.com</li>
            </ul>
          </div>

          {/* Social Buttons (Hanya IG & WA) */}
          <div>
            <h4 className="text-lg font-medium mb-6 tracking-widest">SOSIAL MEDIA</h4>
            <div className="flex gap-4">
              <button 
                onClick={handleInstagram}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#7a746d] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={handleWhatsApp}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#7a746d] transition-all"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {currentYear} Terraco Indonesia. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
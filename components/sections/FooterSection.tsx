'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#4a3034_0%,#2e1e20_100%)] py-20 text-white text-center border-t border-white/5">
      {/* Subtle Ornaments */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#ecd5b0]/30 bg-white/5 px-5 py-2">
            <Sparkles className="h-4 w-4 text-[#ecd5b0] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#ecd5b0] font-bold">Thank You</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-white font-light tracking-tight mb-8">
            VISHMITHA <span className="text-[#ecd5b0] italic font-normal">&amp;</span> BINURI
          </h2>

          <div className="flex flex-col items-center gap-6 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold text-white/90">
            <div className="flex items-center gap-4 py-4 border-y border-[#ecd5b0]/40 px-6 sm:px-8">
              <span>Wed</span>
              <div className="h-5 w-px bg-[#ecd5b0]/50" />
              <span className="text-[#ecd5b0] text-base sm:text-lg">30 . 12 . 2026</span>
              <div className="h-5 w-px bg-[#ecd5b0]/50" />
              <span>December</span>
            </div>

            <div className="mt-10 space-y-5 text-white/90 font-medium">
              <p className="text-xs sm:text-sm tracking-[0.3em]">&copy; {new Date().getFullYear()} VISHMITHA &amp; BINURI</p>

              <p className="text-[11px] sm:text-xs tracking-[0.15em] leading-relaxed text-white/85">
                DESIGN AND CREATED BY <span className="font-bold text-[#ecd5b0]">INVITEMINT</span>
                <span className="hidden sm:inline"> | </span>
                <br className="sm:hidden" />
                CONNECT WHATSAPP:{' '}
                <a href="https://wa.me/94707819074" target="_blank" rel="noopener noreferrer" className="font-bold text-[#ecd5b0] hover:underline">+94 70 781 9074</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

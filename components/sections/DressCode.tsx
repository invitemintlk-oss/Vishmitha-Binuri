'use client';

import { motion } from 'framer-motion';
import { Shirt } from 'lucide-react';

const palette = [
  { name: 'Ivory', hex: '#F5F1E8' },
  { name: 'Champagne', hex: '#D8B78C' },
  { name: 'Blush Pink', hex: '#E8B4B8' },
  { name: 'Dusty Rose', hex: '#C97B8B' },
  { name: 'Antique Gold', hex: '#B8915A' },
];

export default function DressCode() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf3f1_0%,#f3dfdb_100%)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      {/* Corner Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-72 md:h-72 pointer-events-none z-0 opacity-95">
        <img src="/images/44.png" alt="" className="w-full h-full object-contain object-top-right" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-[400px] md:w-64 md:h-[600px] pointer-events-none z-0 opacity-95">
        <img src="/images/f.png" alt="" className="w-full h-full object-contain object-bottom-left" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
            <Shirt className="h-7 w-7 text-secondary" />
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-secondary">What to wear</p>
          <h2 className="font-serif text-5xl font-light text-foreground md:text-7xl">
            Dress <span className="italic text-primary">Code</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl text-foreground/80 md:text-2xl">
            Elegant Formal / Traditional Attire
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-foreground/80 md:text-base">
            We would love to see you in soft, romantic shades from our wedding colour palette.
          </p>
        </motion.div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10">
          {palette.map((c, i) => (
            <motion.div
              key={c.hex}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', bounce: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="h-16 w-16 rounded-full border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] ring-1 ring-black/5 md:h-20 md:w-20"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/85">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

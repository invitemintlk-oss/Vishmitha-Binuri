'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

type Photo = { src: string; w: number; h: number };

// Each column = 1 portrait + 1 landscape, so both columns end at the same height.
const columns: Photo[][] = [
  [
    { src: '/pre/pre-1.jpeg', w: 854, h: 1280 },
    { src: '/pre/pre-2.jpeg', w: 1280, h: 854 },
  ],
  [
    { src: '/pre/pre-4.jpeg', w: 1280, h: 854 },
    { src: '/pre/pre-3.jpeg', w: 854, h: 1280 },
  ],
];

function Frame({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: (src: string) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(photo.src)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group relative block w-full overflow-hidden rounded-[1.5rem] border-4 border-white shadow-lg"
    >
      <img
        src={photo.src}
        alt="Our moment"
        width={photo.w}
        height={photo.h}
        loading="lazy"
        className="block h-auto w-full transition-transform duration-700 group-hover:scale-105"
      />
    </motion.button>
  );
}

export default function PreShootGallery() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf3f1_0%,#f3dfdb_100%)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      {/* Corner Decor */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-40 w-40 opacity-95 md:h-72 md:w-72">
        <img src="/images/44.png" alt="" className="h-full w-full object-contain object-top-right" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[400px] w-32 opacity-95 md:h-[600px] md:w-64">
        <img src="/images/f.png" alt="" className="h-full w-full object-contain object-bottom-left" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-14 text-center md:mb-20"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-secondary">Little pieces of forever</p>
          <h2 className="font-serif text-5xl font-light text-foreground md:text-7xl">
            Our <span className="italic text-primary">Moments</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3 text-primary">
            <div className="h-px w-16 bg-primary/50" />
            <Heart className="h-3.5 w-3.5 fill-current" />
            <div className="h-px w-16 bg-primary/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 items-start gap-3 md:gap-5">
          {columns.map((col, c) => (
            <div key={c} className="flex flex-col gap-3 md:gap-5">
              {col.map((p, i) => (
                <Frame key={p.src} photo={p} index={c * 2 + i} onOpen={setActive} />
              ))}
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-16 max-w-md text-center font-serif text-lg italic text-foreground/80"
        >
          &ldquo;Every moment with you is a memory we&rsquo;ll treasure forever.&rdquo;
        </motion.p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <button type="button" aria-label="Close" className="absolute right-4 top-4 text-white/80 hover:text-white">
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={active}
              alt="Our moment"
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

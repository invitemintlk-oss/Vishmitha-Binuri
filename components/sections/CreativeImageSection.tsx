'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CreativeImageSectionProps {
  imageSrc: string;
  altText?: string;
  overlayText?: string;
}

export default function CreativeImageSection({ imageSrc, altText, overlayText }: CreativeImageSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-[#1a1a1a]"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <div 
          className="h-full w-full bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      </motion.div>

      {/* Premium Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/10" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Animated Light Leak */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
          x: [-20, 20, -20]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 -left-1/2 z-15 h-full w-full rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />

      {/* Content */}
      {overlayText && (
        <div className="relative z-20 flex h-full w-full items-center justify-center text-center px-6">
          <motion.div
            style={{ opacity }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/80 font-bold">Eternal Love</span>
              <span className="h-px w-8 bg-white/40" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-white tracking-widest uppercase font-light drop-shadow-2xl">
              {overlayText}
            </h2>
          </motion.div>
        </div>
      )}

      {/* Monogram Watermark */}
      <div className="absolute bottom-10 right-10 z-20 opacity-20 hidden md:block">
        <img 
          src="/vb-monogram.png" 
          alt="Monogram" 
          className="h-20 w-20 object-contain invert brightness-200" 
        />
      </div>

      {/* Scroll indicator for the transition */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-20" />
    </section>
  );
}

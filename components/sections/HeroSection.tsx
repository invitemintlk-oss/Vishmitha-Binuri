'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cross, Heart, Sparkles } from 'lucide-react';
import { useCoupleOrder } from '@/lib/couple-order';

export default function HeroSection() {
  const { first, second } = useCoupleOrder();
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 15, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-[center_30%] bg-no-repeat"
        style={{ backgroundImage: 'url(/pre/story-3.jpeg)' }}
      />

      {/* Dark Premium Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.35)_0%,rgba(20,14,10,0.45)_50%,rgba(20,14,10,0.88)_100%)]" />



      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-8 inline-flex items-center gap-4 rounded-full border border-[#ecd5b0]/40 bg-white/5 px-6 py-2.5 backdrop-blur-xl"
        >
          <div className="h-px w-8 bg-[#ecd5b0]/60" />
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-[#ecd5b0]">
            We Are Getting Married
          </span>
          <div className="h-px w-8 bg-[#ecd5b0]/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-script text-7xl sm:text-8xl md:text-9xl leading-[1.05] bg-gradient-to-b from-[#f3e3c0] via-[#d8b78c] to-[#a8823a] bg-clip-text text-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] px-4"
        >
          {first}
          <span className="block text-3xl sm:text-4xl md:text-5xl text-white/85 my-1 sm:my-2" style={{ WebkitTextFillColor: 'rgba(255,255,255,0.85)' }}>and</span>
          {second}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/90 uppercase tracking-[0.2em] font-medium"
        >
          Together with our families, we joyfully invite you to celebrate our wedding
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.45 }}
          className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group hover:border-[#ecd5b0]/40 transition-all duration-500"
        >
          <div className="flex flex-col items-center">
             <p className="text-[10px] uppercase tracking-[0.6em] text-[#ecd5b0] font-bold mb-4 opacity-70 group-hover:opacity-100 transition-opacity">Save the Date</p>
             <h2 className="font-serif text-3xl text-white sm:text-5xl tracking-wide">
               WEDNESDAY <span className="text-[#ecd5b0] mx-2">30</span> DECEMBER 2026
             </h2>
             <div className="mt-6 flex items-center gap-6 text-white/40">
                <div className="h-px w-12 bg-white/20" />
                <Heart className="h-5 w-5 fill-white" />
                <div className="h-px w-12 bg-white/20" />
             </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

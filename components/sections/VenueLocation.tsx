'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, MapPin, Navigation, Sparkles } from 'lucide-react';

const LOCATION_URL = 'https://www.google.com/maps/search/?api=1&query=Cinnamon+Lakeside+Colombo+Sri+Lanka';

export default function VenueLocation() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#faf3ea_0%,#efdfc8_100%)] px-4 py-24 sm:px-6 lg:px-8 md:py-32"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 55, 0], y: [0, 35, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[12%] -top-[8%] h-[52vw] w-[52vw] rounded-full bg-gradient-to-br from-primary/20 to-secondary/15 opacity-75 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, -45, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-[10%] top-[34%] h-[44vw] w-[44vw] rounded-full bg-gradient-to-tl from-[#eadcff] to-[#ffdfe9] opacity-60 blur-[110px]"
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 11px 11px, rgba(181,124,83,0.38) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, type: 'spring', stiffness: 100 }}
          className="mb-14 text-center md:mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-secondary sm:text-sm">
              Wedding Venue
            </span>
          </motion.div>

          <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-7xl">
            Venue <span className="relative inline-block text-primary">
              Location
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.05)] border-2 border-white text-center hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform">
              <MapPin className="h-10 w-10 text-white" />
            </div>

            <div className="mt-8 mb-8 overflow-hidden rounded-2xl border-4 border-white shadow-[0_15px_40px_rgba(90,60,40,0.18)]">
              <img
                src="/venue-cinnamon-lakeside.jpeg"
                alt="Cinnamon Lakeside Hotel, Colombo"
                width={1400}
                height={929}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-3">Kings Court</p>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground font-semibold mb-4 uppercase">CINNAMON LAKESIDE HOTEL</h3>
            <p className="text-sm text-foreground/80 mb-10 uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">115 Sir Chittampalam A. Gardiner Mawatha, <br /> Colombo 02, Sri Lanka</p>

            <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 shadow-inner">
              <iframe
                title="Cinnamon Lakeside Colombo map"
                src="https://www.google.com/maps?q=Cinnamon+Lakeside+Colombo&output=embed"
                className="h-72 w-full md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-4 bg-primary text-white px-10 py-6 rounded-2xl text-[12px] font-bold uppercase tracking-[0.3em] shadow-[0_15px_35px_rgba(255,190,198,0.3)] hover:scale-[1.03] active:scale-95 transition-all lg:w-auto lg:px-16"
            >
              Get Directions
              <Navigation className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

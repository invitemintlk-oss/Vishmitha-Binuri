'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Brush-stroke edge mask (SVG turbulence displaces a soft rectangle)
const brushMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 320' preserveAspectRatio='none'>
    <filter id='b' x='-10%' y='-10%' width='120%' height='120%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.035 0.09' numOctaves='3' seed='7'/>
      <feDisplacementMap in='SourceGraphic' scale='38'/>
      <feGaussianBlur stdDeviation='1.2'/>
    </filter>
    <rect x='30' y='16' width='340' height='288' rx='40' fill='white' filter='url(#b)'/>
  </svg>`
)}")`;

const phases = [
  {
    img: '/pre/story-1.jpeg',
    title: ['Once', 'Upon a Time'],
    sub: 'Little hearts',
    position: 'object-[center_35%]',
    gray: false,
  },
  {
    img: '/pre/story-2.jpeg',
    aspect: 'aspect-[4/3]',
    title: ['The Journey', 'Brought Us Here'],
    sub: 'Side by side',
    position: 'object-top',
    gray: false,
  },
  {
    img: '/pre/story-3.jpeg',
    title: ['Forever', 'Starts Now'],
    sub: '30 . 12 . 2026',
    position: 'object-[center_30%]',
    gray: false,
  },
];

function Watercolor({ className }: { className: string }) {
  return <div className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

export default function OurStory() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#ecd8d2_0%,#e6d0c4_45%,#dcc3a6_100%)] px-4 py-20 sm:px-6 md:py-28">
      {/* Watercolor wash */}
      <Watercolor className="-left-24 -top-20 h-80 w-80 bg-[#d9a7a7]/45" />
      <Watercolor className="-right-24 top-1/3 h-96 w-72 bg-[#d4b08a]/40" />
      <Watercolor className="-bottom-24 left-1/4 h-80 w-96 bg-[#cf9fa3]/40" />
      <Watercolor className="right-1/4 top-10 h-40 w-40 bg-[#e2c79c]/50" />
      {/* Corner Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-72 md:h-72 pointer-events-none z-0 opacity-95">
        <img src="/images/44.png" alt="" className="w-full h-full object-contain object-top-right" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-[400px] md:w-64 md:h-[600px] pointer-events-none z-0 opacity-95">
        <img src="/images/f.png" alt="" className="w-full h-full object-contain object-bottom-left" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="font-serif text-sm uppercase tracking-[0.5em] text-[#4f3b3d] md:text-base">We are</p>
          <h2 className="font-script text-6xl leading-tight text-[#8f4f5c] md:text-8xl">Getting Married</h2>
          <div className="mt-2 flex items-center justify-center gap-3 text-[#8f4f5c]">
            <div className="h-px w-16 bg-[#a8636f]/50" />
            <Heart className="h-3.5 w-3.5 fill-current" />
            <div className="h-px w-16 bg-[#a8636f]/50" />
          </div>
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {phases.map((p, i) => (
            <motion.div
              key={p.img}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="flex items-center gap-4 md:gap-8"
            >
              <div className="relative w-[62%] shrink-0">
                {!p.gray && (
                  <div className="absolute inset-0 scale-110 rounded-full bg-[#d8a8a4]/60 blur-2xl" />
                )}
                <div
                  className={`relative w-full ${(p as { aspect?: string }).aspect ?? 'aspect-[5/4]'}`}
                  style={{
                    WebkitMaskImage: brushMask,
                    maskImage: brushMask,
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.title.join(' ')}
                    className={`h-full w-full object-cover ${p.position} ${p.gray ? 'grayscale contrast-[1.05]' : ''}`}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-lg leading-snug text-[#4a3f3d] md:text-2xl">
                  {p.title[0]}
                  <br />
                  {p.title[1]}
                </h3>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#7a5a2e] md:text-[11px]">{p.sub}</p>
                <div className="mt-3 flex items-center gap-2 text-[#8f4f5c]">
                  <Heart className="h-3 w-3 fill-current" />
                  <div className="h-px w-16 bg-[#a8636f]/40 md:w-24" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3 text-[#8f4f5c]/80">
          <span className="tracking-[0.3em]">⟡ ≈</span>
          <Heart className="h-3.5 w-3.5 fill-current" />
          <span className="tracking-[0.3em]">≈ ⟡</span>
        </div>
      </div>
    </section>
  );
}

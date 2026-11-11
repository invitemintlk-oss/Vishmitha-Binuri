'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeOpenerProps {
  onEnvelopeOpen: () => void;
  guestName?: string;
}

const GOLD_TEXT =
  'bg-[linear-gradient(180deg,#a8742a_0%,#d9ad62_38%,#93641f_68%,#6f4a14_100%)] bg-clip-text text-transparent';

/* Ornamental gold divider: fine lines with a central fleuron */
function Ornament({ tail = false }: { tail?: boolean }) {
  return (
    <svg viewBox="0 0 520 40" className="mx-auto h-7 w-[min(86vw,520px)] md:h-10" aria-hidden="true">
      <defs>
        <linearGradient id={`og${tail ? 't' : ''}`} gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="520" y2="20">
          <stop offset="0" stopColor="#b8894a" stopOpacity="0" />
          <stop offset="0.15" stopColor="#a8792f" />
          <stop offset="0.5" stopColor="#e2bf82" />
          <stop offset="0.85" stopColor="#a8792f" />
          <stop offset="1" stopColor="#b8894a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke={`url(#og${tail ? 't' : ''})`} fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M20 20 H205" />
        <path d="M315 20 H500" />
        <path d="M150 20 h-40" strokeWidth="2.4" />
        <path d="M370 20 h40" strokeWidth="2.4" />
        {/* side scrolls */}
        <path d="M205 20 c8 -10 20 -10 24 -2 c3 6 -4 10 -8 6" />
        <path d="M315 20 c-8 -10 -20 -10 -24 -2 c-3 6 4 10 8 6" />
        <path d="M205 20 c8 10 20 10 24 2" />
        <path d="M315 20 c-8 10 -20 10 -24 2" />
        {tail && <path d="M410 20 c30 0 60 -2 85 10 c-20 -2 -30 2 -38 8" />}
      </g>
      {/* central fleuron */}
      <g fill="#a8792f">
        <path d="M260 6 C255 14 255 20 260 24 C265 20 265 14 260 6Z" />
        <path d="M260 34 C257 29 257 26 260 24 C263 26 263 29 260 34Z" />
        <path d="M244 20 C250 16 255 18 258 21 C254 23 249 23 244 20Z" />
        <path d="M276 20 C270 16 265 18 262 21 C266 23 271 23 276 20Z" />
        <circle cx="236" cy="20" r="2" />
        <circle cx="284" cy="20" r="2" />
      </g>
    </svg>
  );
}

/* Flowing satin ribbons with gold edges (corner decoration) */
function SatinSwirl({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3cfc9" />
          <stop offset="0.5" stopColor="#e8b9b3" />
          <stop offset="1" stopColor="#f6dcd6" />
        </linearGradient>
        <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8894a" />
          <stop offset="0.5" stopColor="#f0d49b" />
          <stop offset="1" stopColor="#b8894a" />
        </linearGradient>
      </defs>
      <path d="M0 0 H260 C200 40 140 60 90 130 C55 180 30 240 0 280 Z" fill="url(#satin)" opacity="0.85" />
      <path d="M0 0 H180 C130 50 90 80 60 140 C40 180 20 200 0 215 Z" fill="#f8e3de" opacity="0.7" />
      <path d="M260 0 C200 40 140 60 90 130 C55 180 30 240 0 280" stroke="url(#goldEdge)" strokeWidth="3" fill="none" />
      <path d="M330 0 C250 60 170 90 120 170 C90 220 50 280 0 330" stroke="url(#goldEdge)" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M180 0 C130 50 90 80 60 140 C40 180 20 200 0 215" stroke="url(#goldEdge)" strokeWidth="1.2" fill="none" opacity="0.7" />
    </svg>
  );
}

export function EnvelopeOpener({ onEnvelopeOpen }: EnvelopeOpenerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setShowContent(true);
      onEnvelopeOpen();
    }, 1000);
  };

  // Gold leaf petals drifting down (generated after mount to avoid hydration mismatch)
  const [leaves, setLeaves] = useState<
    { id: number; left: string; delay: number; duration: number; scale: number; drift: number; rot: number }[]
  >([]);
  useEffect(() => {
    setLeaves(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 10,
        scale: 0.6 + Math.random() * 0.8,
        drift: Math.random() * 120 - 60,
        rot: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showContent && (
        <motion.section
          key="envelope-section"
          exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.9, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Pink satin background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#fdf1ee_0%,#f6dcd7_40%,#edc7c1_75%,#e3b6b0_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.35] mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, rgba(255,255,255,0.0) 0px, rgba(255,255,255,0.35) 2px, rgba(255,255,255,0.0) 6px)',
            }}
          />

          {/* Satin swirls in corners */}
          <SatinSwirl className="pointer-events-none absolute left-0 top-0 h-[38vh] w-[60vw] max-w-[520px] md:h-[45vh]" />
          <SatinSwirl className="pointer-events-none absolute bottom-0 right-0 h-[38vh] w-[60vw] max-w-[520px] rotate-180 md:h-[45vh]" />

          {/* Gold leaf petals */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {leaves.map((l) => (
              <motion.div
                key={l.id}
                className="absolute top-[-6%]"
                style={{ left: l.left }}
                animate={{
                  y: ['0vh', '112vh'],
                  x: [0, l.drift, l.drift * -0.4],
                  rotate: [l.rot, l.rot + 180, l.rot + 320],
                  opacity: [0, 0.9, 0.8, 0],
                }}
                transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'linear' }}
              >
                <div
                  className="h-3 w-5 bg-[linear-gradient(135deg,#f3dba6_0%,#d4a659_50%,#a87a35_100%)] shadow-[0_2px_6px_rgba(168,122,53,0.35)]"
                  style={{ transform: `scale(${l.scale})`, borderRadius: '100% 0 100% 0' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Soft glow behind content */}
          <div className="pointer-events-none absolute left-1/2 top-[18%] h-[28rem] w-[40rem] max-w-[100vw] -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

          {/* Main content */}
          <div className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="mb-6 text-center md:mb-8"
            >
              <p className={`font-serif text-xl font-bold uppercase leading-snug tracking-[0.34em] sm:text-2xl md:text-4xl [-webkit-text-stroke:0.4px_#8a5d1c] ${GOLD_TEXT}`}>
                The Wedding
                <br />
                Invitation
              </p>

              <div className="my-3 md:my-4">
                <Ornament />
              </div>

              <h1 className={`font-script px-2 text-[2.6rem] leading-[1.3] sm:text-7xl md:text-8xl ${GOLD_TEXT} [-webkit-text-stroke:1.1px_#93641f] drop-shadow-[0_3px_3px_rgba(110,70,20,0.3)]`}>
                Vishmitha{' '}
                <span className="font-[Georgia,'Times_New_Roman',serif] italic text-[0.8em] [-webkit-text-stroke:0.6px_#93641f]">&amp;</span>{' '}
                Binuri
              </h1>

              <div className="mt-1 md:mt-2">
                <Ornament tail />
              </div>

            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-[10%] -z-10 rounded-[2.5rem] bg-[#c98f8f]/30 blur-3xl"
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.button
                type="button"
                onClick={handleEnvelopeClick}
                whileHover={!isOpen ? { scale: 1.015, y: -4 } : {}}
                whileTap={!isOpen ? { scale: 0.995 } : {}}
                className="group relative block cursor-pointer isolate"
                aria-label="Open the invitation"
              >
                <motion.div
                  animate={isOpen ? { y: 100, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img
                    src="/envelope-rose-gold.png"
                    alt="Vishmitha & Binuri wedding envelope"
                    className="h-auto w-[min(92vw,540px)] drop-shadow-[0_25px_40px_rgba(120,70,60,0.28)]"
                  />
                </motion.div>
              </motion.button>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={!isOpen ? { opacity: [0.55, 1, 0.55], y: 0 } : { opacity: 0, y: -6 }}
                transition={!isOpen ? { duration: 2.4, repeat: Infinity } : { duration: 0.4 }}
                className="mt-4 text-center text-xs font-bold uppercase tracking-[0.45em] text-[#7a5418] md:text-sm"
              >
                Touch to Unveil
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

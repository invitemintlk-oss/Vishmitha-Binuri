'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeOpenerProps {
  onEnvelopeOpen: () => void;
  guestName?: string;
}

export function EnvelopeOpener({ onEnvelopeOpen, guestName }: EnvelopeOpenerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnvelopeClick = () => {
    if (isAnimating || isOpen) return;

    setIsAnimating(true);
    setIsOpen(true);

    setTimeout(() => {
      setShowContent(true);
      onEnvelopeOpen();
    }, 1000);
  };

  const petals = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2.5,
    duration: 10 + Math.random() * 8,
    scale: 0.5 + Math.random() * 0.9,
    drift: Math.random() * 120 - 60,
  }));

  const sparkles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <AnimatePresence mode="wait">
      {!showContent && (
        <motion.section
          key="envelope-section"
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.9, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Lighter Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,140,0.15),transparent_40%),linear-gradient(135deg,#f6e4e0_0%,#efd6d0_38%,#f3e3d4_65%,#ead2bd_100%)]" />

          {/* Soft ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.8, 1, 0.85],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-[-12rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute bottom-[-10rem] left-1/2 h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </motion.div>

          {/* Spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.4, 0.6, 0.45],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute left-1/2 top-0 h-[40rem] w-[24rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,240,200,0.16),rgba(255,240,200,0.04)_35%,transparent_72%)] blur-2xl" />
          </motion.div>

          {/* Christian-inspired geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20px 20px, rgba(201,162,39,0.35) 1.2px, transparent 1.2px),
                  linear-gradient(rgba(201,162,39,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,162,39,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px, 80px 80px, 80px 80px',
                backgroundPosition: '0 0, 0 0, 0 0',
              }}
            />
          </div>





          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {sparkles.map((item) => (
              <motion.span
                key={item.id}
                className="absolute h-1 w-1 rounded-full bg-[#f8e6a6]"
                style={{ left: item.left, top: item.top }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.6, 1.2, 0.6],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Floating lotus petals */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute top-[-10%]"
                style={{ left: petal.left }}
                animate={{
                  y: ['0vh', '115vh'],
                  x: [0, petal.drift, petal.drift * -0.35],
                  rotate: [0, 120, 240],
                  opacity: [0, 0.8, 0.65, 0],
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="h-5 w-3 rounded-full bg-gradient-to-b from-[#d9d1c6] via-[#d8b78c] to-[#a57b16] shadow-[0_0_14px_rgba(216,183,140,0.18)]"
                  style={{
                    transform: `scale(${petal.scale}) rotate(18deg)`,
                    borderRadius: '70% 30% 70% 30% / 70% 30% 70% 30%',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.75%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")',
            }}
          />

          {/* Main content */}
          <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6">
            {/* Intro label */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="mb-12 text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b78c]/70" />
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-[#8c6a16]">
                  The Wedding Invitation
                </p>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b78c]/70" />
              </div>
              <h1 className="font-script text-2xl md:text-6xl tracking-[0.05em] text-[#8c6a16] capitalize">
                Vishmitha <span className="text-secondary/80">&amp;</span> Binuri
              </h1>
            </motion.div>

            {/* Envelope stage */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8 -z-20 rounded-[3rem] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(201,154,107,0.0),rgba(201,154,107,0.2),rgba(201,154,107,0.0),rgba(201,154,107,0.18),rgba(201,154,107,0.0))] blur-2xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />

              {/* Outer aura */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[#c98f8f]/20 blur-3xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.55, 0.8, 0.55],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />



              <motion.button
                type="button"
                onClick={handleEnvelopeClick}
                whileHover={!isOpen ? { scale: 1.015, y: -4 } : {}}
                whileTap={!isOpen ? { scale: 0.995 } : {}}
                className="group relative block cursor-pointer isolate"
              >


                {/* Envelope Image */}
                <motion.div
                  animate={isOpen ? { y: 100, opacity: 0, scale: 0.9 } : { y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="relative z-10"
                >
                  <img
                    src="/envelope-rose-gold.png"
                    alt="Vishmitha & Binuri wedding envelope"
                    className="w-[450px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  />
                </motion.div>

              </motion.button>

              {/* Instruction moved outside the envelope for better readability on mobile */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={!isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="mt-6 text-center text-[11px] uppercase tracking-[0.45em] text-[#8c6a16]/80"
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
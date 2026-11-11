'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCoupleOrder } from '@/lib/couple-order';

interface IntroVideoProps {
  onFinish: () => void;
}

export default function IntroVideo({ onFinish }: IntroVideoProps) {
  const { first, second } = useCoupleOrder();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onFinish, 900);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // If autoplay is blocked, don't trap the guest on a black screen
      finish();
    });
    // Safety net in case 'ended' never fires
    const t = setTimeout(finish, 30000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.9 }}
      className="fixed inset-0 z-[90] bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/Bride_and_groom_dancing_202608091909.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.65)_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-16 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/85 sm:text-xs"
        >
          We are getting married
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-3 font-script text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] sm:text-7xl"
        >
          {first} <span className="text-[#ecd5b0]">&amp;</span> {second}
        </motion.h2>
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md hover:bg-black/50"
      >
        Skip
      </button>
    </motion.div>
  );
}

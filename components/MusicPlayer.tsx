'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SONG_SRC = '/cant-help-falling-in-love.mp3';

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        setMounted(true);
        const audio = new Audio(SONG_SRC);
        audio.loop = true;
        audio.volume = 0.4;
        audioRef.current = audio;

        // Attempt autoplay
        const playAudio = () => {
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setShowHint(false);
                })
                .catch(() => {
                    setShowHint(true);
                    // Add interaction listeners if autoplay is blocked
                    const startOnInteraction = () => {
                        audio.play()
                            .then(() => {
                                setIsPlaying(true);
                                setShowHint(false);
                            })
                            .catch(() => { });
                        removeListeners();
                    };

                    const removeListeners = () => {
                        ['click', 'touchstart', 'scroll'].forEach((evt) =>
                            document.removeEventListener(evt, startOnInteraction)
                        );
                    };

                    ['click', 'touchstart', 'scroll'].forEach((evt) =>
                        document.addEventListener(evt, startOnInteraction, { once: true, passive: true })
                    );
                });
        };

        playAudio();

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => { });
            setShowHint(false);
        }
    }, [isPlaying]);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 pointer-events-none">
            {/* Tap hint badge */}
            <AnimatePresence>
                {showHint && !isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="bg-white/90 backdrop-blur-md border border-secondary/30 rounded-full px-4 py-2 shadow-xl flex items-center gap-2 mb-2"
                        style={{ borderColor: 'rgba(158, 170, 148, 0.3)' }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-lg"
                        >
                            🎵
                        </motion.span>
                        <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                            Tap for Wedding Music
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Music FAB Button */}
            <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(176,117,131,0.4)] border-2 border-white group"
                style={{
                    background: 'linear-gradient(135deg, #c48b95 0%, #b8915a 100%)',
                }}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {/* Visual waves effect - outer */}
                {isPlaying && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full border border-secondary/40"
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            style={{ borderColor: 'rgba(158, 170, 148, 0.4)' }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-[#D4AF37]/40"
                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                            style={{ borderColor: 'rgba(216, 183, 140, 0.4)' }}
                        />
                    </>
                )}

                {/* Main animated icon container */}
                <motion.div
                    animate={isPlaying ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 0.95, 1]
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    {isPlaying ? (
                        <div className="flex items-center gap-0.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [8, 16, 8] }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    className="w-1 bg-white rounded-full"
                                />
                            ))}
                        </div>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-7 h-7"
                        >
                            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                        </svg>
                    )}
                </motion.div>

                {/* Small indicator dot for status */}
                <motion.div
                    animate={isPlaying ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] } : { scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isPlaying ? 'bg-[#e6cfae]' : 'bg-[#a8636f]'}`}
                />
            </motion.button>
        </div>
    );
}

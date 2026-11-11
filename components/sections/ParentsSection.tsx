'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart } from 'lucide-react';
import { useCoupleOrder } from '@/lib/couple-order';

interface ParentsSectionProps {
  /** Guest name from the admin-generated link (?t=Title&to=Name) */
  guestName?: string;
}

const [groom, bride] = [
  {
    name: 'Vishmitha',
    relation: 'Son of',
    parents: ['Dr. Niranjan Fernando', 'Dr. Deepani De Silva'],
  },
  {
    name: 'Binuri',
    relation: 'Daughter of',
    parents: ['Dr. Dilruk De Silva', 'Dr. Kumudini De Silva'],
  },
];

export default function ParentsSection({ guestName }: ParentsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const couple = useCoupleOrder().order(groom, bride);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#faf3ea_0%,#efdfc8_100%)] px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      {/* Corner Decor */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-40 w-40 opacity-95 md:h-72 md:w-72">
        <img src="/images/44.png" alt="" className="h-full w-full object-contain object-top-right" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-xs font-bold uppercase tracking-[0.35em] text-secondary md:mb-14 md:text-sm"
        >
          With the blessings of our beloved parents
        </motion.p>

        {/* Couple with parents */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-6">
          {couple.map((c, i) => (
            <div key={c.name} className="contents">
              {i === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-center justify-center md:mt-10"
                >
                  <span className="font-script text-5xl text-primary md:text-6xl">&amp;</span>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.25 }}
                className="w-full max-w-sm rounded-[2rem] border border-primary/25 bg-white/70 px-6 py-10 shadow-[0_20px_50px_rgba(156,116,66,0.12)] backdrop-blur-sm"
              >
                <h2 className="font-script text-6xl leading-tight text-foreground md:text-7xl">{c.name}</h2>
                <div className="my-4 flex items-center justify-center gap-3 text-primary">
                  <span className="h-px w-10 bg-primary/50" />
                  <Heart className="h-3 w-3 fill-current" />
                  <span className="h-px w-10 bg-primary/50" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">{c.relation}</p>
                <p className="mt-3 font-serif text-base font-semibold uppercase leading-relaxed tracking-wider text-foreground md:text-lg">
                  {c.parents[0]}
                  <br />
                  <span className="text-primary">&amp;</span> {c.parents[1]}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Invitation line (guest name comes from the admin link) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mx-auto mt-16 max-w-2xl md:mt-20"
        >
          <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.3em] text-secondary md:text-base">
            We cordially invite
          </p>
          <p className="my-4 font-script text-5xl leading-tight text-primary md:text-6xl">
            {guestName || 'you'}
          </p>
          <p className="font-serif text-sm font-semibold uppercase leading-relaxed tracking-[0.25em] text-foreground md:text-base">
            to celebrate our special day with us
          </p>
        </motion.div>
      </div>
    </section>
  );
}

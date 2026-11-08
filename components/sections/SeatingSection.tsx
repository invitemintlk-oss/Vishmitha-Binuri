'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Armchair } from 'lucide-react';

const order = [
  { title: 'Arrival & Welcome', text: 'Kindly arrive by 9.00 AM at Kings Court, Cinnamon Lakeside.' },
  { title: 'Find Your Table', text: 'Our ushers and the seating chart at the entrance will guide you to your table.' },
  { title: 'Poruwa Ceremony', text: 'Please be seated before 9.34 AM for the auspicious Poruwa ceremony.' },
];

function SeatingContent() {
  const params = useSearchParams();
  const table = params.get('table');

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#faf3ea_0%,#efdfc8_100%)] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
            <Armchair className="h-7 w-7 text-secondary" />
          </div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-secondary">Reserved for you</p>
          <h2 className="font-serif text-5xl font-light text-foreground md:text-7xl">
            Seating <span className="italic text-primary">Order</span>
          </h2>
        </motion.div>

        {table && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-12 max-w-md rounded-[2rem] border border-primary/30 bg-white p-10 shadow-[0_20px_50px_rgba(216,183,140,0.25)]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">Your Table</p>
            <p className="mt-3 font-serif text-6xl text-primary md:text-7xl">{table}</p>
          </motion.div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-5 text-left md:grid-cols-3">
          {order.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="rounded-[1.8rem] border border-secondary/20 bg-white p-7 shadow-sm"
            >
              <span className="font-serif text-3xl text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-xl text-foreground">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{o.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SeatingSection() {
  return (
    <Suspense fallback={<div className="h-40" />}>
      <SeatingContent />
    </Suspense>
  );
}

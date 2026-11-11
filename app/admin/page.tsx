'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Link as LinkIcon, MessageCircle } from 'lucide-react';
import {
  COUPLE,
  PREFIXES,
  type Prefix,
  buildInviteLink,
  buildInviteMessage,
  formatDisplayName,
} from '@/lib/guest';

export default function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [link, setLink] = useState('');
  const [toast, setToast] = useState('');

  const previewName = formatDisplayName(prefix, name);
  const message = link ? buildInviteMessage(displayName, link) : '';

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const generate = () => {
    if (!previewName) return;
    setDisplayName(previewName);
    setLink(buildInviteLink(window.location.origin, previewName));
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(label);
    } catch {
      setToast('Copy failed – please copy manually');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(165deg,#fbf3f1_0%,#f3e0dc_50%,#efdfc8_100%)] px-4 py-12 text-foreground md:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">Admin</p>
          <h1 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Invitation Link Generator</h1>
          <p className="mt-3 font-script text-4xl text-primary">
            {COUPLE.groom} &amp; {COUPLE.bride}
          </p>
        </header>

        <div className="rounded-3xl border border-primary/25 bg-white/80 p-6 shadow-[0_20px_50px_rgba(156,116,66,0.12)] md:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
            className="space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">Prefix</span>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value as Prefix)}
                  className="w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  {PREFIXES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">Guest Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  className="w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            {previewName && (
              <p className="rounded-xl bg-[#fbf3f1] px-4 py-3 text-sm">
                <span className="font-semibold text-secondary">Greeting preview:</span> Dear {previewName} ❤️
              </p>
            )}

            <button
              type="submit"
              disabled={!previewName}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LinkIcon className="h-4 w-4" /> Generate Link
            </button>
          </form>

          <div className="mt-8 space-y-5 border-t border-primary/20 pt-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Generated Link</p>
              <div className="break-all rounded-xl border border-primary/25 bg-white px-4 py-3 font-mono text-sm">
                {link || <span className="text-foreground/50">Generate a link to see it here</span>}
              </div>
            </div>

            {message && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Message Preview</p>
                <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-primary/25 bg-white px-4 py-3 font-sans text-sm leading-relaxed">
                  {message}
                </pre>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={!link}
                onClick={() => copy(link, 'Link copied!')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary transition hover:bg-[#fbf3f1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Copy className="h-4 w-4" /> Copy Link Only
              </button>
              <button
                type="button"
                disabled={!link}
                onClick={() => copy(message, 'Message copied!')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle className="h-4 w-4" /> Copy Full Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white shadow-lg"
          >
            <Check className="h-4 w-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Link as LinkIcon, MessageCircle } from 'lucide-react';
import {
  COUPLE,
  PREFIXES,
  type Prefix,
  type Side,
  coupleNames,
  buildInviteLink,
  buildInviteMessage,
  formatDisplayName,
} from '@/lib/guest';

export default function AdminPage() {
  const [side, setSide] = useState<Side>('groom');
  const [linkSide, setLinkSide] = useState<Side>('groom');
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [customPrefix, setCustomPrefix] = useState('');
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [link, setLink] = useState('');
  const [toast, setToast] = useState('');

  const previewName = formatDisplayName(prefix, name, customPrefix);
  const message = link ? buildInviteMessage(displayName, link, linkSide) : '';

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const generate = () => {
    if (!previewName) return;
    setDisplayName(previewName);
    setLinkSide(side);
    setLink(buildInviteLink(window.location.origin, previewName, side));
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
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">Invited By</span>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ['groom', "Groom's side", COUPLE.groom],
                  ['bride', "Bride's side", COUPLE.bride],
                ] as const).map(([value, label, person]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSide(value)}
                    aria-pressed={side === value}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      side === value
                        ? 'border-primary bg-primary text-white shadow-md'
                        : 'border-primary/30 bg-white text-foreground hover:bg-[#fbf3f1]'
                    }`}
                  >
                    {label}
                    <span className="block text-xs font-normal opacity-80">{person}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-foreground/60">
                Invitation will show <strong>{coupleNames(side).join(' & ')}</strong>, with{' '}
                {side === 'bride' ? "the bride's" : "the groom's"} name and parents first.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">Prefix</span>
                  <select
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value as Prefix)}
                    className="w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {PREFIXES.map((p) => (
                      <option key={p} value={p}>
                        {p === 'Custom' ? 'Custom (type…)' : p}
                      </option>
                    ))}
                  </select>
                </label>
                {prefix === 'Custom' && (
                  <input
                    value={customPrefix}
                    onChange={(e) => setCustomPrefix(e.target.value)}
                    placeholder="e.g. Prof., Rev."
                    aria-label="Custom prefix"
                    autoFocus
                    className="w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>

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

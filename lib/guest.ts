// Shared guest-name logic for the invitation site and the /admin link generator.

export const COUPLE = {
  groom: 'Vishmitha',
  bride: 'Binuri',
} as const;

/** Whose side is inviting the guest; their name and details are shown first. */
export type Side = 'groom' | 'bride';

/** Read the side from the link's `?s=` query. Anything but "bride" means groom (old links). */
export function parseSide(value: string | null | undefined): Side {
  return value === 'bride' ? 'bride' : 'groom';
}

export function coupleNames(side: Side): [string, string] {
  return side === 'bride' ? [COUPLE.bride, COUPLE.groom] : [COUPLE.groom, COUPLE.bride];
}

export const PREFIXES = [
  'Mr.',
  'Mrs.',
  'Miss',
  'Dr.',
  'Mr. & Mrs.',
  'Family',
  'Dear',
  'No prefix',
  'Custom',
] as const;
export type Prefix = (typeof PREFIXES)[number];

const clean = (s: string) => s.trim().replace(/\s+/g, ' ');

/**
 * Combine prefix + name into the name shown to the guest.
 * "Dear" and "No prefix" add nothing ("Dear" because the greeting already starts with it).
 * "Custom" uses whatever the admin typed (e.g. "Prof.", "Rev.", "Hon.").
 */
export function formatDisplayName(prefix: Prefix, name: string, customPrefix = ''): string {
  const n = clean(name);
  if (!n) return '';
  switch (prefix) {
    case 'Family':
      return `${n} and Family`;
    case 'Dear':
    case 'No prefix':
      return n;
    case 'Custom': {
      const p = clean(customPrefix);
      return p ? `${p} ${n}` : n;
    }
    default:
      return `${prefix} ${n}`;
  }
}

/** Personalized invitation URL: {baseURL}/{displayName}[?s=bride], safely encoded. */
export function buildInviteLink(baseUrl: string, displayName: string, side: Side = 'groom'): string {
  const url = `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
  return side === 'bride' ? `${url}?s=bride` : url;
}

/** Decode a guest name taken from the URL path; tolerant of bad encodings. */
export function decodeGuestSegment(segment: string): string {
  let value = segment;
  try {
    value = decodeURIComponent(segment);
  } catch {
    /* keep raw */
  }
  return value.trim().replace(/\s+/g, ' ').slice(0, 120);
}

export function buildInviteMessage(displayName: string, link: string, side: Side = 'groom'): string {
  const [first, second] = coupleNames(side);
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${first} & ${second}`;
}

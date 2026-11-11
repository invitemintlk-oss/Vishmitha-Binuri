// Shared guest-name logic for the invitation site and the /admin link generator.

export const COUPLE = {
  groom: 'Vishmitha',
  bride: 'Binuri',
} as const;

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

/**
 * Combine prefix + name into the name shown to the guest.
 * "Dear" is a message-style option, so it is NOT added to the name
 * (the greeting itself already starts with "Dear").
 */
export function formatDisplayName(prefix: Prefix, name: string): string {
  const n = name.trim().replace(/\s+/g, ' ');
  if (!n) return '';
  switch (prefix) {
    case 'Family':
      return `${n} and Family`;
    case 'Dear':
      return n;
    default:
      return `${prefix} ${n}`;
  }
}

/** Personalized invitation URL: {baseURL}/{displayName}, safely encoded. */
export function buildInviteLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
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

export function buildInviteMessage(displayName: string, link: string): string {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${COUPLE.groom} & ${COUPLE.bride}`;
}

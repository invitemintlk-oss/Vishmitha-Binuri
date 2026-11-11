import type { Side } from '@/lib/guest';

export type GoogleSheetFormType = 'rsvp' | 'wish';

interface SubmitPayload {
  formType: GoogleSheetFormType;
  name: string;
  attending?: string;
  message?: string;
  /** Whose side sent the invitation link (groom / bride). */
  side?: Side;
  /** Name the invitation link was made for (from the admin link generator). */
  invitationName?: string;
}

/**
 * Sends a row to the Google Apps Script web app (see code.gs).
 * Apps Script doesn't send CORS headers, so this uses no-cors: the request is
 * delivered but the response can't be read. Network failures still throw.
 */
/** Apps Script web app for sheet 18UB21Mrm0B9DX-OJPQAUSIIgaL8-mAYTzC-dvCO5mQs (see code.gs). */
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwhKaM4NAr_y3_RQ-Mpy4McvYVu92kdG1W1PXEjaMmevxW2oTFvR3Y6K2R63m5_pZU8Zg/exec';

export async function submitToGoogleSheets(payload: SubmitPayload): Promise<void> {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      source: 'wedding-site',
    }),
  });
}

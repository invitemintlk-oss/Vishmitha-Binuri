import { Suspense } from 'react';
import InvitationPage from '@/components/InvitationPage';
import { decodeGuestSegment } from '@/lib/guest';

export default async function GuestInvitation({ params }: { params: Promise<{ guest: string }> }) {
  const { guest } = await params;
  const guestName = decodeGuestSegment(guest);

  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <InvitationPage guestOverride={guestName} />
    </Suspense>
  );
}

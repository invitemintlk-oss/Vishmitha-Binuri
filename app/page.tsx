import { Suspense } from 'react';
import InvitationPage from '@/components/InvitationPage';

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <InvitationPage />
    </Suspense>
  );
}

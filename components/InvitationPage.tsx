'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { EnvelopeOpener } from '@/components/envelope-opener';
import HeroSection from '@/components/sections/HeroSection';
import IntroVideo from '@/components/sections/IntroVideo';
import OurStory from '@/components/sections/OurStory';
import PreShootGallery from '@/components/sections/PreShootGallery';
import ParentsSection from '@/components/sections/ParentsSection';
import CountdownSection from '@/components/sections/CountdownSection';
import VenueLocation from '@/components/sections/VenueLocation';
import DressCode from '@/components/sections/DressCode';
import SeatingSection from '@/components/sections/SeatingSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import RSVPSection from '@/components/sections/RSVPSection';
import FooterSection from '@/components/sections/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';
import { CoupleOrderProvider } from '@/lib/couple-order';
import { parseSide } from '@/lib/guest';

export default function InvitationPage({ guestOverride }: { guestOverride?: string }) {
  const [stage, setStage] = useState<'envelope' | 'intro' | 'site'>('envelope');
  const searchParams = useSearchParams();

  const guestName = searchParams.get('to');
  const guestTitle = searchParams.get('t');
  // Path links (/{displayName}) take priority; old ?t=&to= links still work.
  const personalizedName =
    guestOverride || (guestName ? `${guestTitle ? guestTitle + ' ' : ''}${guestName}` : '');
  // ?s=bride -> bride's name and details first; default is groom first.
  const side = parseSide(searchParams.get('s'));

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <CoupleOrderProvider side={side}>
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {stage === 'envelope' && (
        <EnvelopeOpener
          onEnvelopeOpen={() => setStage('intro')}
          guestName={personalizedName}
        />
      )}

      {stage === 'intro' && <IntroVideo onFinish={() => setStage('site')} />}

      {stage === 'site' && (
        <>
          <HeroSection />
          <OurStory />
          <PreShootGallery />
          <ParentsSection guestName={personalizedName} />
          <CountdownSection />
          <VenueLocation />
          <DressCode />
          <SeatingSection />
          <BlessingsSection guestName={personalizedName} />
          <RSVPSection guestName={personalizedName} />
          <FooterSection />
        </>
      )}
    </div>
    </CoupleOrderProvider>
  );
}

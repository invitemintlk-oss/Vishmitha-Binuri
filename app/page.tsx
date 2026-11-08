'use client';

import { useState, useEffect, Suspense } from 'react';
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

function HomeContent() {
  const [stage, setStage] = useState<'envelope' | 'intro' | 'site'>('envelope');
  const searchParams = useSearchParams();

  const guestName = searchParams.get('to');
  const guestTitle = searchParams.get('t');
  const personalizedName = guestName ? `${guestTitle ? guestTitle + ' ' : ''}${guestName}` : '';

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
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
          <ParentsSection />
          <CountdownSection />
          <VenueLocation />
          <DressCode />
          <SeatingSection />
          <BlessingsSection />
          <RSVPSection guestName={personalizedName} />
          <FooterSection />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <HomeContent />
    </Suspense>
  );
}

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Technology } from './components/Technology';
import { AboutEcosystem } from './components/AboutEcosystem';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar isAudioPlaying={isAudioPlaying} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Projects />
        <Technology />
        <AboutEcosystem />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Exact Attached Audio Player (Measured Horizon) in Lower-Right */}
      <AudioPlayer onPlayStateChange={setIsAudioPlaying} />
    </div>
  );
}

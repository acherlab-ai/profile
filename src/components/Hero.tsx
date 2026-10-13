import React from 'react';
import { ArrowRight, Terminal, Layers } from 'lucide-react';
import { BRAND } from '../data/portfolioData';
import { HeroVisual } from './HeroVisual';

export const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-radial-gradient pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Clean unboxed kicker / ecosystem separator (Zero-pill compliant) */}
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-semibold">{BRAND.name}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Parent Ecosystem of {BRAND.ecosystem}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Building Beyond the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Interface.
              </span>
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl text-balance">
              {BRAND.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-[0.98]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span>About AcherLab</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Disciplines summary footer line */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Foundational Labs</span>
              </span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>4 Core Systems</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>6 Research Disciplines</span>
            </div>

          </div>

          {/* Right Column: Animated Visual */}
          <div className="lg:col-span-6 w-full">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

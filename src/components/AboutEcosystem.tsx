import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, Zap, Compass, Check } from 'lucide-react';
import { ECOSYSTEM_RELATIONSHIP, BRAND } from '../data/portfolioData';

export const AboutEcosystem: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'parent' | 'child'>('parent');

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 relative border-t border-white/5"
      aria-label="About AcherLab and SuzLab Ecosystem"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Organizational Architecture</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">The Dual-Lab Model</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About AcherLab & SuzLab
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
            How foundational research and production applications coexist in a sovereign, independent technology ecosystem.
          </p>
        </div>

        {/* Dual Pillar Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* AcherLab - Foundational Core */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-7 sm:p-8 border border-white/10 text-left flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-semibold">FOUNDATIONAL R&D</span>
                <span className="text-slate-400">Parent Entity</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{ECOSYSTEM_RELATIONSHIP.parent.name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-cyan-200/80 font-medium mt-1">
                  {ECOSYSTEM_RELATIONSHIP.parent.tagline}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {ECOSYSTEM_RELATIONSHIP.parent.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Core Responsibilities
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {ECOSYSTEM_RELATIONSHIP.parent.focusAreas.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400 font-mono">
              Role: {ECOSYSTEM_RELATIONSHIP.parent.role}
            </div>
          </div>

          {/* SuzLab - Application Substrate */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-7 sm:p-8 border border-white/10 text-left flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 font-semibold">PRODUCT & APPLICATION LAYER</span>
                <span className="text-slate-400">Execution Arm</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{ECOSYSTEM_RELATIONSHIP.child.name}</span>
                </h3>
                <p className="text-xs sm:text-sm text-blue-200/80 font-medium mt-1">
                  {ECOSYSTEM_RELATIONSHIP.child.tagline}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {ECOSYSTEM_RELATIONSHIP.child.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Core Responsibilities
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {ECOSYSTEM_RELATIONSHIP.child.focusAreas.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-mono mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-400 font-mono">
              Role: {ECOSYSTEM_RELATIONSHIP.child.role}
            </div>
          </div>

        </div>

        {/* Ecosystem Architecture Flow Diagram */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Inter-Ecosystem Architecture Flow</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                How technology matures from speculative research into released software
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400">Research</span>
              <span>→</span>
              <span className="text-sky-300">Protocols</span>
              <span>→</span>
              <span className="text-blue-400">Products</span>
            </div>
          </div>

          {/* 3 Step Interactive Architecture Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>01. Exploration</span>
                <span>AcherLab</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Algorithmic & Systems R&D</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluating novel model reasoning patterns, microVM sandboxes, and WebGL rendering techniques.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                <span>02. Stabilization</span>
                <span>Shared Substrate</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Protocols & Tooling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Codifying reusable schemas, gRPC endpoints, CLI suites, and deployment blueprints.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-blue-400">
                <span>03. Delivery</span>
                <span>SuzLab</span>
              </div>
              <h4 className="text-sm font-semibold text-white">User-Facing Systems</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploying high-reliability cloud services, avatar studios, and autonomous web agents to end users.
              </p>
            </div>

          </div>
        </div>

        {/* Guiding Principles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {ECOSYSTEM_RELATIONSHIP.principles.map((principle, index) => (
            <div key={principle.title} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-xs font-mono text-cyan-400">
                0{index + 1}. Principle
              </span>
              <h4 className="text-base font-semibold text-white">
                {principle.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

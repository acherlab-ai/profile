import React, { useState } from 'react';
import { 
  Bot, 
  Network, 
  TerminalSquare, 
  CloudRain, 
  LayoutGrid, 
  Workflow, 
  CheckCircle2, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { TECH_DOMAINS } from '../data/portfolioData';
import { TechDomain } from '../types';

export const Technology: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<TechDomain>(TECH_DOMAINS[0]);

  const domainIcons: Record<string, React.ReactNode> = {
    ai: <Bot className="w-5 h-5" />,
    apis: <Network className="w-5 h-5" />,
    linux: <TerminalSquare className="w-5 h-5" />,
    cloud: <CloudRain className="w-5 h-5" />,
    web: <LayoutGrid className="w-5 h-5" />,
    automation: <Workflow className="w-5 h-5" />,
  };

  return (
    <section 
      id="technology" 
      className="py-20 md:py-28 relative border-t border-white/5 bg-[#04060b]"
      aria-label="Technology Domains & Research Disciplines"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Architectural Competencies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technology & Research Matrix
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
            Disciplines under exploration across AcherLab. We transparently classify initiatives between battle-tested foundations, active prototypes, and exploratory tracks.
          </p>
        </div>

        {/* 2-Column Interactive Matrix & Detailed Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Disciplines Interactive List */}
          <div className="lg:col-span-5 space-y-2.5">
            {TECH_DOMAINS.map((domain) => {
              const isSelected = selectedDomain.id === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/40'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div 
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {domainIcons[domain.id]}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {domain.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {domain.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                      {domain.scope}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Focus Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 text-left space-y-6 sticky top-24">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    {domainIcons[selectedDomain.id]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {selectedDomain.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {selectedDomain.category}
                    </p>
                  </div>
                </div>

                {/* Scope status unboxed text */}
                <div className="text-right">
                  <span className="text-xs font-mono text-cyan-400 block font-medium">
                    {selectedDomain.scope}
                  </span>
                  <span className="text-[10px] text-slate-400">Ecosystem Track</span>
                </div>
              </div>

              {/* Rationale & Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
                  Architectural Summary
                </h4>
                <p className="text-sm text-cyan-200/90 font-medium">
                  {selectedDomain.summary}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {selectedDomain.description}
                </p>
              </div>

              {/* Ecosystem relation to SuzLab */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
                <h4 className="text-xs font-semibold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  SuzLab Application Integration
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDomain.relationshipToSuzLab}
                </p>
              </div>

              {/* Toolchains / Technologies - Unboxed Typography */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 font-mono uppercase tracking-wider">
                  Exploratory Toolchains & Standards
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono">
                  {selectedDomain.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-200">{tech}</span>
                      {idx < selectedDomain.technologies.length - 1 && (
                        <span className="text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Scope status reflects active exploration, not commercial deployment guarantee.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

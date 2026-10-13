import React from 'react';
import { ArrowUp, Github, Twitter, MessageSquare, BookOpen } from 'lucide-react';
import { BRAND } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Technology', href: '#technology' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#030408] py-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">
                {BRAND.name}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-mono text-cyan-400">
                Ecosystem of {BRAND.ecosystem}
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm">
              {BRAND.headline} Independent technology research and foundational systems engineering.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Hairline Divider & Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} {BRAND.name}.</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>All rights reserved.</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Audio: Measured Horizon</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={BRAND.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="AcherLab GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={BRAND.x}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="AcherLab X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={BRAND.discord}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="AcherLab Discord"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ml-2"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

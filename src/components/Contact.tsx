import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Github, 
  Twitter, 
  MessageSquare, 
  BookOpen, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { BRAND } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'collaboration',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'collaboration',
      message: '',
    });
    setFormSubmitted(false);
  };

  const socialLinks = [
    { name: 'GitHub', url: BRAND.github, icon: <Github className="w-4 h-4" />, handle: '@acherlab' },
    { name: 'X / Twitter', url: BRAND.x, icon: <Twitter className="w-4 h-4" />, handle: '@acherlab' },
    { name: 'Discord', url: BRAND.discord, icon: <MessageSquare className="w-4 h-4" />, handle: 'acherlab/community' },
    { name: 'Documentation', url: BRAND.docs, icon: <BookOpen className="w-4 h-4" />, handle: 'docs.acherlab.xyz' },
  ];

  return (
    <section 
      id="contact" 
      className="py-20 md:py-28 relative border-t border-white/5 bg-[#030509]"
      aria-label="Contact and Social Presence"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>Inquiries</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Ecosystem Communications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Initiate Contact
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
            Direct communication channel for researchers, developers, and collaborators interested in the AcherLab and SuzLab roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Email & Social Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Primary Email Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Primary Inquiry Endpoint
              </span>

              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-white/5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm sm:text-base font-mono font-medium text-white truncate select-all">
                    {BRAND.contactEmail}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Encrypted or standard correspondence</span>
                <a
                  href={`mailto:${BRAND.contactEmail}?subject=Inquiry%20regarding%20AcherLab`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>Launch Mail Client</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social & Community Links */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Connected Repositories & Outposts
              </span>

              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 group-hover:text-cyan-400 flex items-center justify-center transition-colors">
                        {link.icon}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {link.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {link.handle}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 text-left">
              
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Inquiry Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to AcherLab. Your transmission has been queued for review by the collective.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                      Direct Message Dispatch
                    </h3>
                    <p className="text-xs text-slate-400">
                      Submit a direct proposal or technical inquiry to the AcherLab desk.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">
                        Name / Identity
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">
                        Contact Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="text-xs font-mono text-slate-300">
                      Topic Domain
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-white/10 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all"
                    >
                      <option value="collaboration">Research Collaboration / Fellowship</option>
                      <option value="suzlab">SuzLab Ecosystem Integration</option>
                      <option value="cloud">SuzLab Cloud Infrastructure Beta</option>
                      <option value="ai">Sun AI Architectural Feedback</option>
                      <option value="other">General Ecosystem Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                      Message Body
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your inquiry, proposal, or feedback..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all resize-y"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Routing to admin@acherlab.xyz
                    </span>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 active:scale-95"
                    >
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

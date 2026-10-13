import React, { useEffect } from 'react';
import { X, ExternalLink, Github, BookOpen, Layers, Cpu, Radio } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="glass-panel bg-[#070b14] border border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-left space-y-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{project.status}</span>
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.name}
          </h2>

          <p className="text-sm text-cyan-200/80 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Long Narrative Description */}
        <div className="text-sm text-slate-300 leading-relaxed space-y-3">
          <p>{project.longDescription}</p>
        </div>

        {/* Architecture Specs */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-3">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            System Architecture
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-mono text-[11px]">Runtime Layer</span>
              <span className="text-slate-200 font-medium">{project.architecture.runtime}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-mono text-[11px]">Protocols & Interfaces</span>
              <span className="text-slate-200 font-medium">{project.architecture.protocols}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 block font-mono text-[11px]">Ecosystem Integration</span>
              <span className="text-cyan-300 font-medium">{project.architecture.targetEcosystem}</span>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-blue-400" />
            Exploration Vectors
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono mt-0.5">›</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Unboxed Metadata */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Technologies</span>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono">
            {project.techStack.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < project.techStack.length - 1 && <span className="text-slate-700">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 border border-white/5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 border border-white/5"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Documentation</span>
              </a>
            )}

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium transition-colors flex items-center gap-1.5 border border-cyan-500/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

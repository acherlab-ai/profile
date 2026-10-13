import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, Code2, Cloud, Sparkles, Box, Wrench } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterTabs: Array<{ id: ProjectCategory; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All Projects', icon: null },
    { id: 'ai', label: 'Artificial Intelligence', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'cloud', label: 'Cloud Infrastructure', icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'spatial', label: '3D & Spatial', icon: <Box className="w-3.5 h-3.5" /> },
    { id: 'devtools', label: 'Developer Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section 
      id="projects" 
      className="py-20 md:py-28 relative border-t border-white/5"
      aria-label="Featured Projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>Core Systems</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Ecosystem Portfolio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Initiatives
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
              Exploratory frameworks, runtime environments, and creative suites built under the AcherLab umbrella to empower SuzLab platforms.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Segmented Control per Constitution) */}
          <div 
            className="flex items-center gap-1 p-1 bg-slate-900/80 border border-white/10 rounded-xl overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group border border-white/5 hover:border-cyan-500/30 text-left"
            >
              <div className="space-y-4">
                
                {/* Quiet unboxed kicker: Category and Status (Zero-pill compliant) */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-cyan-400">{project.categoryLabel}</span>
                  <span className="text-slate-400">{project.status}</span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-200/80 font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack - unboxed metadata */}
                <div className="pt-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono">
                    <span className="text-slate-400">Stack:</span>
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-300">{tech}</span>
                        {idx < project.techStack.length - 1 && <span className="text-slate-700">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded py-1 px-1.5 -ml-1.5"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`View ${project.name} GitHub repository`}
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      aria-label={`Open ${project.name} demo`}
                      title="Live Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Details Modal */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </section>
  );
};

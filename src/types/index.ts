export type ProjectCategory = 'all' | 'ai' | 'cloud' | 'spatial' | 'devtools';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: 'Active Exploration' | 'Architecture Blueprint' | 'Experimental Preview' | 'Developer Alpha';
  architecture: {
    runtime: string;
    protocols: string;
    targetEcosystem: string;
  };
  features: string[];
  techStack: string[];
  links: {
    github: string;
    demo?: string;
    docs?: string;
  };
}

export interface TechDomain {
  id: string;
  name: string;
  category: string;
  scope: 'Active Foundation' | 'Research Prototype' | 'Emerging Track';
  summary: string;
  description: string;
  technologies: string[];
  relationshipToSuzLab: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  isLoaded: boolean;
  hasError: boolean;
  errorMessage: string | null;
  trackName: string;
  audioSource: string;
}

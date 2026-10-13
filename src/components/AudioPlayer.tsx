import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Volume1,
  Music, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Upload, 
  Check, 
  HelpCircle,
  X
} from 'lucide-react';

interface AudioPlayerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ onPlayStateChange }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initial volume default is strictly 15% (0.15) as required
  const [volume, setVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('acherlab_audio_volume');
      return saved !== null ? Math.max(0, Math.min(1, parseFloat(saved))) : 0.15;
    } catch {
      return 0.15;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('acherlab_audio_muted') === 'true';
    } catch {
      return false;
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [localFileLoaded, setLocalFileLoaded] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string>('/audio/measured_horizon.mp3');

  // Sync volume & mute to the HTMLAudioElement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Save volume preference
  useEffect(() => {
    try {
      localStorage.setItem('acherlab_audio_volume', volume.toString());
      localStorage.setItem('acherlab_audio_muted', isMuted.toString());
    } catch {
      // LocalStorage unavailable
    }
  }, [volume, isMuted]);

  // Audio lifecycle handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setHasError(false);
      setErrorMessage(null);
    }
  };

  const handleAudioError = () => {
    // If the primary /audio/measured_horizon.mp3 fails and we haven't tried root yet
    if (audioSrc === '/audio/measured_horizon.mp3') {
      setAudioSrc('/measured_horizon.mp3');
      return;
    }

    setHasError(true);
    setIsPlaying(false);
    onPlayStateChange?.(false);
    setErrorMessage('Audio file not found at /audio/measured_horizon.mp3.');
  };

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      try {
        setHasError(false);
        await audioRef.current.play();
        setIsPlaying(true);
        onPlayStateChange?.(true);
      } catch (err: unknown) {
        console.warn('Audio playback interaction error:', err);
        setHasError(true);
        setIsPlaying(false);
        onPlayStateChange?.(false);
        setErrorMessage('Cannot play: measured_horizon.mp3 is not yet accessible at /audio/measured_horizon.mp3.');
      }
    }
  }, [isPlaying, onPlayStateChange]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted && newVol > 0) {
      setIsMuted(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Local file upload fallback handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && audioRef.current) {
      const fileUrl = URL.createObjectURL(file);
      audioRef.current.src = fileUrl;
      setAudioSrc(fileUrl);
      setLocalFileLoaded(true);
      setHasError(false);
      setErrorMessage(null);
      // Play automatically now since this was an explicit user file selection action
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        onPlayStateChange?.(true);
      }).catch(console.error);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hidden audio element pointing to exact required track */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleAudioError}
        onEnded={() => setIsPlaying(false)}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
        aria-hidden="true"
      />

      {/* Floating Lower-Right Controller Container */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300"
        role="region"
        aria-label="Audio player controls"
      >
        <div className="glass-panel rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl bg-[#090d16]/90 transition-all duration-300 w-[280px] sm:w-[320px]">
          
          {/* Header Row / Compact Bar */}
          <div className="px-3.5 py-2.5 flex items-center justify-between gap-2.5 border-b border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isPlaying 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : hasError 
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                      : 'bg-slate-800 text-slate-400 border border-white/5'
                }`}
              >
                {isPlaying ? (
                  <span className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                    <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
                    <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
                  </span>
                ) : (
                  <Music className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate tracking-tight">
                  Measured Horizon
                </p>
                <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 font-mono">
                  {hasError ? (
                    <span className="text-amber-400">Audio path unlinked</span>
                  ) : isPlaying ? (
                    <span className="text-cyan-400">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  ) : (
                    <span>Default Vol 15% · Paused</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm shadow-cyan-500/20"
                aria-label={isPlaying ? 'Pause background music' : 'Play background music Measured Horizon'}
                title={isPlaying ? 'Pause' : 'Play Measured Horizon'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              {/* Expand/Collapse Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={isExpanded ? 'Collapse audio controls' : 'Expand audio controls'}
                title={isExpanded ? 'Collapse' : 'Expand controls'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Drawer Details */}
          {isExpanded && (
            <div className="p-3.5 space-y-3 bg-[#060910]/70">
              {/* Timeline scrubber */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!duration || hasError}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40"
                  aria-label="Audio playback timeline progress"
                />
              </div>

              {/* Volume Slider & Mute */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded p-1"
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  )}
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    aria-label="Volume slider"
                  />
                  <span className="text-[10px] font-mono text-slate-400 w-8 text-right tabular-nums">
                    {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                  </span>
                </div>
              </div>

              {/* Status / Instructions if file not accessible */}
              {hasError && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 space-y-1.5">
                  <div className="flex items-start gap-1.5 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>File not found at /audio/measured_horizon.mp3</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Place <code className="text-cyan-300 font-mono">measured_horizon.mp3</code> in your project’s <code className="text-slate-200 font-mono">public/audio/</code> folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-1.5 px-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-md text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3 h-3" />
                    Load measured_horizon.mp3 from Computer
                  </button>
                </div>
              )}

              {/* If user picked local file */}
              {localFileLoaded && (
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Loaded local measured_horizon.mp3 successfully</span>
                </div>
              )}

              {/* Footer info row */}
              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/5">
                <span>AcherLab Soundscape</span>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  Audio Guide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audio Setup Instructions Modal */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audio-guide-title"
        >
          <div className="glass-panel bg-[#090d16] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Close audio guide"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Music className="w-4 h-4" />
              </div>
              <h2 id="audio-guide-title" className="text-base font-semibold text-white">
                Background Music: Measured Horizon
              </h2>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <p>
                The website is configured to play the exact ambient track <strong className="text-white">measured_horizon.mp3</strong> attached by the user.
              </p>
              
              <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                <p className="font-semibold text-slate-200">Where to place the file:</p>
                <code className="block bg-black/50 p-2 rounded text-cyan-300 font-mono text-[11px] select-all break-all">
                  /public/audio/measured_horizon.mp3
                </code>
                <p className="text-[11px] text-slate-400">
                  When deployed or served via Vite, this file is served at <span className="text-slate-200">/audio/measured_horizon.mp3</span>.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-semibold text-slate-200">Browser Audio Policy:</p>
                <p className="text-slate-400">
                  Per web browser standards, audio does not autoplay with sound. Sound starts strictly when you click <span className="text-cyan-400">Play</span>. Volume is initialized to 15% and saved to your device.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowHelpModal(false);
                    fileInputRef.current?.click();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Select Local File
                </button>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

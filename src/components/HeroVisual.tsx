import React, { useEffect, useRef } from 'react';

export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    // Respect user prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node grid definitions
    const nodes: Array<{ x: number; y: number; ox: number; oy: number; phase: number; speed: number }> = [];
    const cols = 7;
    const rows = 5;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        nodes.push({
          x: 0,
          y: 0,
          ox: (c / (cols - 1)) * 480 + 20,
          oy: (r / (rows - 1)) * 340 + 20,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0015 + Math.random() * 0.002,
        });
      }
    }

    let time = 0;

    const render = () => {
      time += prefersReducedMotion ? 0 : 0.016;

      const displayW = canvas.offsetWidth;
      const displayH = canvas.offsetHeight;
      ctx.clearRect(0, 0, displayW, displayH);

      const centerX = displayW / 2;
      const centerY = displayH / 2;

      // 1. Draw concentric subtle orbital geometric rings (Linear / futuristic telemetry style)
      const ringRadii = [60, 110, 170, 230];
      ringRadii.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 
          ? 'rgba(56, 189, 248, 0.18)' 
          : idx === 2 
            ? 'rgba(37, 99, 235, 0.12)' 
            : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.setLineDash(idx % 2 === 1 ? [4, 6] : []);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Rotating orbital satellite ticks
      const orbitCount = 3;
      for (let i = 0; i < orbitCount; i++) {
        const orbitAngle = time * (0.3 + i * 0.15) + (i * Math.PI * 2) / orbitCount;
        const orbitRadius = 110 + i * 60;
        const sx = centerX + Math.cos(orbitAngle) * orbitRadius;
        const sy = centerY + Math.sin(orbitAngle) * orbitRadius;

        // Glow behind node
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
        glow.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
        glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      }

      // 3. Central glowing coordinate beacon
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 45);
      centerGlow.addColorStop(0, 'rgba(14, 165, 233, 0.35)');
      centerGlow.addColorStop(0.5, 'rgba(37, 99, 235, 0.12)');
      centerGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
      ctx.fill();

      // Center crosshair
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY);
      ctx.lineTo(centerX + 10, centerY);
      ctx.moveTo(centerX, centerY - 10);
      ctx.lineTo(centerX, centerY + 10);
      ctx.stroke();

      // Center core point
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // 4. Draw node connections for the background coordinate matrix
      nodes.forEach((node) => {
        node.x = node.ox + Math.sin(time * node.speed * 100 + node.phase) * 6;
        node.y = node.oy + Math.cos(time * node.speed * 100 + node.phase) * 6;
      });

      // Subtle interconnecting lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Small node points
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#070b14]/60 backdrop-blur-xl">
      {/* Ambient background blur spots */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Fine grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Interactive canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full relative z-10"
        aria-hidden="true"
      />

      {/* Decorative corner reticles */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

      {/* Subtle overlay caption */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-none">
        <span className="text-[10px] font-mono text-slate-400">
          AcherLab Matrix · Substrate Visualizer
        </span>
      </div>
    </div>
  );
};

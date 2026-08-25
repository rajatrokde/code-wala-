import React, { useEffect, useRef } from 'react';

export default function Visualizer({ isPlaying, accentColor }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const barCount = 48;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / barCount;

      phase += isPlaying ? 0.05 : 0.01;

      for (let i = 0; i < barCount; i++) {
        // Calculate dynamic wave amplitude
        const factor = isPlaying ? Math.sin(phase + i * 0.2) * 0.5 + 0.5 : Math.sin(phase + i * 0.1) * 0.15 + 0.15;
        const barHeight = factor * height * 0.75 + 4;
        const x = i * barWidth;
        const y = height - barHeight;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, height, 0, y);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
        gradient.addColorStop(0.5, accentColor || 'rgba(6, 182, 212, 0.4)');
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying, accentColor]);

  return (
    <div className="fixed inset-x-0 bottom-0 h-48 pointer-events-none z-10 opacity-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sliders, 
  Timer, 
  Palette, 
  Maximize2, 
  Minimize2, 
  Sparkles,
  Activity
} from 'lucide-react';

export default function Header({ 
  onTogglePomodoro, 
  onToggleAmbient, 
  onToggleBackgrounds, 
  grainEnabled, 
  setGrainEnabled,
  visualizerEnabled,
  setVisualizerEnabled
}) {
  const [timeStr, setTimeStr] = useState('');
  const [activeDevs, setActiveDevs] = useState(1024);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      setActiveDevs(prev => Math.max(950, prev + delta));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="w-full px-3 py-2.5 sm:px-6 sm:py-4 flex items-center justify-between gap-2 z-30 select-none flex-wrap sm:flex-nowrap">
      
      {/* Left: Clock */}
      <div className="flex items-center gap-1.5 sm:gap-2 glass-pill px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-zinc-300 tracking-wider">
        <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
        <span>{timeStr || '14:24 PM'}</span>
      </div>

      {/* Center: Live Active Devs Badge */}
      <div className="flex items-center gap-1.5 sm:gap-2 glass-pill px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs text-zinc-200 shadow-lg">
        <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-emerald-400">{activeDevs.toLocaleString()}</span>
        <span className="text-zinc-400 lowercase hidden xs:inline">travellers on the highway</span>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={onTogglePomodoro}
          title="Pomodoro Focus Timer (P)"
          className="glass-pill p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white transition-all cursor-pointer hover:scale-105"
        >
          <Timer className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400" />
        </button>

        <button
          onClick={onToggleAmbient}
          title="Ambient Sound Mixer"
          className="glass-pill p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white transition-all cursor-pointer hover:scale-105"
        >
          <Sliders className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400" />
        </button>

        <button
          onClick={() => setVisualizerEnabled(!visualizerEnabled)}
          title="Toggle Audio Visualizer"
          className={`glass-pill p-1.5 sm:p-2 rounded-full transition-all cursor-pointer hover:scale-105 ${
            visualizerEnabled ? 'text-pink-400 border-pink-500/50 bg-pink-500/10' : 'text-zinc-300'
          }`}
        >
          <Activity className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </button>

        <button
          onClick={onToggleBackgrounds}
          title="Change Theme & Background Scene"
          className="glass-pill p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white transition-all cursor-pointer hover:scale-105"
        >
          <Palette className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400" />
        </button>

        <button
          onClick={() => setGrainEnabled(!grainEnabled)}
          title={grainEnabled ? "Disable Film Grain Overlay" : "Enable Film Grain Overlay"}
          className={`glass-pill p-1.5 sm:p-2 rounded-full transition-all cursor-pointer hover:scale-105 ${
            grainEnabled ? 'text-amber-400 border-amber-500/50 bg-amber-500/10' : 'text-zinc-400 opacity-60'
          }`}
        >
          <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen Mode"
          className="glass-pill p-1.5 sm:p-2 rounded-full text-zinc-300 hover:text-white transition-all cursor-pointer hover:scale-105 hidden sm:flex"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> : <Maximize2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
        </button>
      </div>

    </header>
  );
}

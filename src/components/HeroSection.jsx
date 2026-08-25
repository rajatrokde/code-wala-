import React, { useState, useEffect } from 'react';
import { 
  Keyboard, 
  Coffee, 
  Bug, 
  Rocket, 
  Volume2, 
  Sparkles,
  Terminal,
  Code
} from 'lucide-react';
import { 
  playKeyboardThock, 
  playDevHorn, 
  playFixBugSound, 
  playGitPushSound, 
  playCoffeeSip 
} from '../utils/audioSynth';
import { ROTATING_QUOTES } from '../utils/playlistData';

export default function HeroSection({ currentScene }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeSFX, setActiveSFX] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % ROTATING_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const triggerSFX = (type, fn) => {
    setActiveSFX(type);
    fn();
    setTimeout(() => setActiveSFX(null), 500);
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-8 text-center z-20 overflow-hidden">
      
      {/* Central Visual Art / Retro Coder Dev Illustration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-55">
        <div className="relative w-full max-w-5xl h-[480px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 border border-white/10">
          <img 
            src={currentScene.bgImage} 
            alt={currentScene.name}
            className="w-full h-full object-cover transform scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>
        </div>
      </div>

      {/* Floating Left Interactive Pill SFX (Matching Horn Ok Please) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 z-30">
        <button
          onClick={() => triggerSFX('horn', playDevHorn)}
          className={`glass-pill px-4 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl border-amber-500/30 ${
            activeSFX === 'horn' ? 'scale-110 bg-amber-500/30 border-amber-400' : ''
          }`}
        >
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/40 transition-colors">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-amber-200 font-hindi">हॉर्न ओके प्लीज</div>
            <div className="text-[10px] text-amber-400/80 font-mono">Horn ok pleaseeee</div>
          </div>
        </button>

        <button
          onClick={() => triggerSFX('thock', () => playKeyboardThock('thock'))}
          className={`glass-pill px-4 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl border-cyan-500/30 ${
            activeSFX === 'thock' ? 'scale-110 bg-cyan-500/30 border-cyan-400' : ''
          }`}
        >
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500/40 transition-colors">
            <Keyboard className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-cyan-200 font-mono-code">Thock Key</div>
            <div className="text-[10px] text-cyan-400/80 font-mono">Cherry MX Switch</div>
          </div>
        </button>

        <button
          onClick={() => triggerSFX('coffee', playCoffeeSip)}
          className={`glass-pill px-4 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl border-emerald-500/30 ${
            activeSFX === 'coffee' ? 'scale-110 bg-emerald-500/30 border-emerald-400' : ''
          }`}
        >
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500/40 transition-colors">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-emerald-200">चहा break ☕</div>
            <div className="text-[10px] text-emerald-400/80 font-mono">चल चहा पिऊया!</div>
          </div>
        </button>
      </div>

      {/* Floating Right Interactive SFX */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 z-30">
        <button
          onClick={() => triggerSFX('fix', playFixBugSound)}
          className={`glass-pill px-4 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl border-purple-500/30 ${
            activeSFX === 'fix' ? 'scale-110 bg-purple-500/30 border-purple-400' : ''
          }`}
        >
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 group-hover:bg-purple-500/40 transition-colors">
            <Bug className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-purple-200">Fix Bug</div>
            <div className="text-[10px] text-purple-400/80 font-mono">Victory Chime</div>
          </div>
        </button>

        <button
          onClick={() => triggerSFX('push', playGitPushSound)}
          className={`glass-pill px-4 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-xl border-rose-500/30 ${
            activeSFX === 'push' ? 'scale-110 bg-rose-500/30 border-rose-400' : ''
          }`}
        >
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 group-hover:bg-rose-500/40 transition-colors">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-rose-200">Git Push</div>
            <div className="text-[10px] text-rose-400/80 font-mono">Ship to Main</div>
          </div>
        </button>
      </div>

      {/* Main Title Section */}
      <div className="relative z-20 my-auto flex flex-col items-center gap-3 max-w-3xl">
        
        {/* Bilingual Large Header Title */}
        <div className="space-y-1">
          <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight font-hindi glow-text transition-colors duration-700 ${currentScene.titleColor}`}>
            कोड & सुकून
          </h1>
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-semibold flex items-center justify-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>CODE & SUKOON — LO-FI DEV STUDIO</span>
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Dynamic Dev Tagline Box (Matches the Hindi slogan under Truck Wala) */}
        <div className="mt-6 px-6 py-2.5 rounded-full glass-pill backdrop-blur-md border border-white/10 text-sm sm:text-base font-hindi text-amber-200/90 shadow-2xl flex items-center gap-3 transition-all duration-500">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="italic font-medium">{ROTATING_QUOTES[quoteIndex]}</span>
        </div>

        {/* Mobile SFX quick row */}
        <div className="flex sm:hidden flex-wrap justify-center gap-2 mt-6">
          <button
            onClick={() => triggerSFX('horn', playDevHorn)}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-amber-300 font-hindi"
          >
            🎺 हॉर्न ओके प्लीज
          </button>
          <button
            onClick={() => triggerSFX('thock', () => playKeyboardThock('thock'))}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-cyan-300 font-mono-code"
          >
            ⌨️ Thock
          </button>
          <button
            onClick={() => triggerSFX('fix', playFixBugSound)}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-purple-300"
          >
            🪲 Fix Bug
          </button>
        </div>

      </div>

    </div>
  );
}

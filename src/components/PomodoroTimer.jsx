import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Flame, Coffee } from 'lucide-react';
import { playFixBugSound } from '../utils/audioSynth';

export default function PomodoroTimer({ isOpen, onClose }) {
  const [mode, setMode] = useState('work'); // 'work' (25m) or 'break' (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playFixBugSound();
      setIsRunning(false);
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatMinutes = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-sm p-6 rounded-3xl border border-white/15 shadow-2xl relative text-center animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Pomodoro Deep Focus</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => switchMode('work')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              mode === 'work' ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20' : 'glass-pill text-zinc-400'
            }`}
          >
            💻 25m Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              mode === 'break' ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20' : 'glass-pill text-zinc-400'
            }`}
          >
            ☕ 5m Break
          </button>
        </div>

        {/* Large Timer Display */}
        <div className="my-4">
          <div className="text-6xl font-extrabold font-mono text-white tracking-widest glow-text">
            {formatMinutes(timeLeft)}
          </div>
          <p className="text-xs text-zinc-400 mt-2 font-mono">
            {mode === 'work' ? '// CRASH PULL REQUESTS & CODE' : '// CHAI BREAK & CHILL'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={toggleTimer}
            className="px-6 py-3 rounded-full bg-white text-zinc-950 font-bold hover:scale-105 transition-all cursor-pointer shadow-xl flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            <span>{isRunning ? 'PAUSE' : 'START FOCUS'}</span>
          </button>

          <button
            onClick={resetTimer}
            title="Reset Timer"
            className="p-3 rounded-full glass-pill text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

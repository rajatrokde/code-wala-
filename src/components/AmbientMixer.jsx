import React, { useState } from 'react';
import { X, CloudRain, Keyboard, Coffee, Flame, Disc, Volume2, RotateCcw } from 'lucide-react';
import { ambientEngine } from '../utils/ambientSynth';

export default function AmbientMixer({ isOpen, onClose }) {
  const [volumes, setVolumes] = useState({
    rain: 0,
    keyboard: 0,
    vinyl: 0,
    fireplace: 0,
    cafe: 0
  });

  const handleVolumeChange = (channel, val) => {
    const v = parseFloat(val);
    setVolumes(prev => ({ ...prev, [channel]: v }));
    ambientEngine.setVolume(channel, v);
  };

  const applyPreset = (preset) => {
    let newVols = { rain: 0, keyboard: 0, vinyl: 0, fireplace: 0, cafe: 0 };
    if (preset === 'rain') {
      newVols = { rain: 0.7, keyboard: 0.3, vinyl: 0.2, fireplace: 0, cafe: 0 };
    } else if (preset === 'cafe') {
      newVols = { rain: 0, keyboard: 0.4, vinyl: 0, fireplace: 0, cafe: 0.6 };
    } else if (preset === 'cozy') {
      newVols = { rain: 0.4, keyboard: 0, vinyl: 0.3, fireplace: 0.7, cafe: 0 };
    }
    setVolumes(newVols);
    Object.keys(newVols).forEach(ch => ambientEngine.setVolume(ch, newVols[ch]));
  };

  const resetAll = () => {
    const zero = { rain: 0, keyboard: 0, vinyl: 0, fireplace: 0, cafe: 0 };
    setVolumes(zero);
    Object.keys(zero).forEach(ch => ambientEngine.setVolume(ch, 0));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-white/15 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Ambient Sound Mixer</h2>
              <p className="text-xs text-zinc-400">Layer background noises with your music</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="my-4 flex flex-wrap gap-2">
          <button 
            onClick={() => applyPreset('rain')}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-cyan-300 hover:border-cyan-400 cursor-pointer flex items-center gap-1.5"
          >
            🌧️ Rain Focus
          </button>
          <button 
            onClick={() => applyPreset('cafe')}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-amber-300 hover:border-amber-400 cursor-pointer flex items-center gap-1.5"
          >
            ☕ Coffee Shop
          </button>
          <button 
            onClick={() => applyPreset('cozy')}
            className="glass-pill px-3 py-1.5 rounded-full text-xs text-orange-300 hover:border-orange-400 cursor-pointer flex items-center gap-1.5"
          >
            🔥 Cozy Fireplace
          </button>
          <button 
            onClick={resetAll}
            className="glass-pill px-2.5 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white cursor-pointer ml-auto flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Mute All
          </button>
        </div>

        {/* Sound Channels */}
        <div className="space-y-4">
          
          {/* Rain */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-200 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" /> Rain on Window
              </span>
              <span className="font-mono text-zinc-400">{Math.round(volumes.rain * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumes.rain}
              onChange={(e) => handleVolumeChange('rain', e.target.value)}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Keyboard */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-200 flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-emerald-400" /> Keyboard Typing
              </span>
              <span className="font-mono text-zinc-400">{Math.round(volumes.keyboard * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumes.keyboard}
              onChange={(e) => handleVolumeChange('keyboard', e.target.value)}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Vinyl Crackle */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-200 flex items-center gap-2">
                <Disc className="w-4 h-4 text-amber-400" /> Vinyl Crackle
              </span>
              <span className="font-mono text-zinc-400">{Math.round(volumes.vinyl * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumes.vinyl}
              onChange={(e) => handleVolumeChange('vinyl', e.target.value)}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Fireplace */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" /> Fireplace Crackle
              </span>
              <span className="font-mono text-zinc-400">{Math.round(volumes.fireplace * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumes.fireplace}
              onChange={(e) => handleVolumeChange('fireplace', e.target.value)}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
            />
          </div>

          {/* Cafe */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-200 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-rose-400" /> Coffee Shop Chatter
              </span>
              <span className="font-mono text-zinc-400">{Math.round(volumes.cafe * 100)}%</span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05}
              value={volumes.cafe}
              onChange={(e) => handleVolumeChange('cafe', e.target.value)}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

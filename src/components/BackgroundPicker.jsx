import React from 'react';
import { X, Palette, Check } from 'lucide-react';
import { BACKGROUND_SCENES } from '../utils/playlistData';

export default function BackgroundPicker({ isOpen, onClose, currentScene, onSelectScene }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Select Vibe Scene & Atmosphere</h2>
              <p className="text-xs text-zinc-400">Transform background imagery, color palette, & quote</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
          {BACKGROUND_SCENES.map(scene => {
            const isSelected = currentScene.id === scene.id;
            return (
              <div
                key={scene.id}
                onClick={() => {
                  onSelectScene(scene);
                  onClose();
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                  isSelected ? 'border-amber-400 scale-[1.02] shadow-xl' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="h-28 relative">
                  <img 
                    src={scene.bgImage} 
                    alt={scene.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-amber-400 text-zinc-950 shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="p-3 bg-zinc-900/90 backdrop-blur-md">
                  <h4 className="text-sm font-bold text-white font-sans">{scene.name}</h4>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5 italic">{scene.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

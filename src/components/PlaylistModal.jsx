import React, { useState } from 'react';
import { X, Music, Play, Check, ChevronDown, ChevronUp, Disc, Youtube, ListMusic } from 'lucide-react';
import { PLAYLISTS } from '../utils/playlistData';
import { YOUTUBE_PRESETS } from '../utils/youtubeHelper';

export default function PlaylistModal({ isOpen, onClose, currentTrack, onSelectTrack }) {
  // Store expanded state for playlists (all expanded by default)
  const [expandedSection, setExpandedSection] = useState({
    youtube: true,
    'old-hindi-lofi': true,
    'cyberpunk-synth': true
  });

  if (!isOpen) return null;

  const toggleSection = (id) => {
    setExpandedSection(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl relative max-h-[88vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
              <ListMusic className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Playlist Songs List (Select Song by Song)</h2>
              <p className="text-xs text-zinc-400">Select any individual song inside the playlist to play</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-5 pr-1 flex-1">
          
          {/* Featured YouTube Playlist Card & Song List */}
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 overflow-hidden transition-all shadow-lg">
            
            {/* Playlist Header Card */}
            <div 
              onClick={() => toggleSection('youtube')}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-amber-500/20 transition-colors select-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/30 text-amber-300">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    YouTube Playlist: PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn
                  </h3>
                  <p className="text-xs text-amber-200/80 font-mono">
                    📋 List Format ({YOUTUBE_PRESETS.length} Songs Inside)
                  </p>
                </div>
              </div>

              <button className="p-1 rounded-full text-amber-300 hover:bg-white/10">
                {expandedSection['youtube'] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Songs List inside Playlist (List Format) */}
            {expandedSection['youtube'] && (
              <div className="p-2.5 pt-1 space-y-1.5 border-t border-amber-500/20 bg-black/60">
                <div className="px-2 py-1 text-[11px] font-mono text-amber-400/90 uppercase tracking-wider font-semibold">
                  Songs List inside PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn:
                </div>
                {YOUTUBE_PRESETS.map((track, idx) => {
                  const isCurrent = currentTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        onSelectTrack(track);
                        onClose();
                      }}
                      className={`p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer border ${
                        isCurrent 
                          ? 'bg-amber-500/30 border-amber-400 text-white shadow-md' 
                          : 'glass-pill border-transparent hover:bg-white/10 text-zinc-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={track.cover} alt={track.title} className="w-9 h-9 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                            <span>{track.title}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                          </div>
                          <div className="text-[10px] text-zinc-400 truncate">{track.artist}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs font-mono text-amber-300 shrink-0">
                        <span>{track.duration}</span>
                        <div className={`p-1.5 rounded-full ${isCurrent ? 'bg-amber-400 text-zinc-950' : 'bg-white/10 text-white'}`}>
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Regular Audio Playlists with Expandable Songs List */}
          {PLAYLISTS.map(playlist => {
            const isExpanded = expandedSection[playlist.id];
            return (
              <div key={playlist.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all">
                
                {/* Playlist Header Card */}
                <div 
                  onClick={() => toggleSection(playlist.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                      <Disc className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {playlist.name}
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-normal">
                          {playlist.tracks.length} Songs
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">{playlist.description}</p>
                    </div>
                  </div>

                  <button className="p-1 rounded-full text-zinc-400 hover:bg-white/10">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Songs List inside Playlist */}
                {isExpanded && (
                  <div className="p-2 pt-0 space-y-1.5 border-t border-white/10 bg-black/40">
                    {playlist.tracks.map(track => {
                      const isCurrent = currentTrack.id === track.id;
                      return (
                        <div
                          key={track.id}
                          onClick={() => {
                            onSelectTrack(track);
                            onClose();
                          }}
                          className={`p-2.5 rounded-xl flex items-center justify-between transition-all cursor-pointer border ${
                            isCurrent 
                              ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-md' 
                              : 'glass-pill border-transparent hover:bg-white/10 text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img 
                              src={track.cover} 
                              alt={track.title} 
                              className="w-9 h-9 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                                <span>{track.title}</span>
                                {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                              </div>
                              <div className="text-[10px] text-zinc-400 truncate">{track.artist}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-300 shrink-0">
                            <span>{track.duration}</span>
                            <div className={`p-1.5 rounded-full ${isCurrent ? 'bg-emerald-400 text-zinc-950' : 'bg-white/10 text-white'}`}>
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

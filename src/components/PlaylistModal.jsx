import React from 'react';
import { X, Music, Play, Check } from 'lucide-react';
import { PLAYLISTS } from '../utils/playlistData';
import { YOUTUBE_PRESETS } from '../utils/youtubeHelper';

export default function PlaylistModal({ isOpen, onClose, currentTrack, onSelectTrack }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-white/15 shadow-2xl relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dev Vibe Song Section & Playlists</h2>
              <p className="text-xs text-zinc-400">Curated beats & featured YouTube playlists for deep work</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 space-y-6 pr-1 flex-1">
          
          {/* Featured YouTube Playlists & Streams Section */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <span>Featured YouTube Playlists</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
                YouTube Vibes
              </span>
            </h3>

            <div className="space-y-1.5">
              {YOUTUBE_PRESETS.map(track => {
                const isCurrent = currentTrack.id === track.id || currentTrack.playlistId === track.playlistId;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      onSelectTrack(track);
                      onClose();
                    }}
                    className={`p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                      isCurrent 
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg' 
                        : 'glass-pill border-transparent hover:bg-white/10 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate flex items-center gap-2">
                          <span>{track.title}</span>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                        <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-amber-400 shrink-0">
                      <span>{track.duration}</span>
                      <div className="p-2 rounded-full bg-amber-500 text-zinc-950">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regular Audio Playlists Section */}
          {PLAYLISTS.map(playlist => (
            <div key={playlist.id} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span>{playlist.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-emerald-300 font-sans font-normal">
                    {playlist.badge}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-zinc-400">{playlist.description}</p>

              <div className="space-y-1.5 mt-2">
                {playlist.tracks.map(track => {
                  const isCurrent = currentTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => {
                        onSelectTrack(track);
                        onClose();
                      }}
                      className={`p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                        isCurrent 
                          ? 'bg-white/15 border-emerald-500/50 text-white shadow-lg' 
                          : 'glass-pill border-transparent hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={track.cover} 
                          alt={track.title} 
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            <span>{track.title}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                        <span>{track.duration}</span>
                        <div className="p-2 rounded-full bg-white/10 text-white group-hover:scale-105">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

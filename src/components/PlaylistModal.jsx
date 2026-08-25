import React, { useState, useEffect } from 'react';
import { X, Music, Play, Check, Plus, Youtube, Trash2 } from 'lucide-react';
import { PLAYLISTS } from '../utils/playlistData';
import { parseYouTubeUrl, YOUTUBE_PRESETS } from '../utils/youtubeHelper';

export default function PlaylistModal({ isOpen, onClose, currentTrack, onSelectTrack }) {
  const [ytInput, setYtInput] = useState('');
  const [ytTitle, setYtTitle] = useState('');
  const [customYtTracks, setCustomYtTracks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Load custom YouTube tracks from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom_yt_tracks');
      if (saved) {
        setCustomYtTracks(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveCustomTracks = (tracks) => {
    setCustomYtTracks(tracks);
    try {
      localStorage.setItem('custom_yt_tracks', JSON.stringify(tracks));
    } catch (e) {}
  };

  const handleAddYouTube = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ytInput.trim()) return;

    const parsed = parseYouTubeUrl(ytInput);
    if (!parsed || (!parsed.videoId && !parsed.playlistId)) {
      setErrorMsg('Invalid YouTube URL! Please paste a valid YouTube video or playlist link.');
      return;
    }

    const newTrack = {
      id: `custom-yt-${Date.now()}`,
      title: ytTitle.trim() || `YouTube Stream (${parsed.videoId || 'Playlist'})`,
      artist: 'Custom YouTube Vibe',
      category: 'YouTube Custom',
      isYouTube: true,
      youtubeId: parsed.videoId,
      playlistId: parsed.playlistId,
      cover: parsed.cover,
      url: ytInput.trim(),
      duration: 'YouTube'
    };

    const updated = [newTrack, ...customYtTracks];
    saveCustomTracks(updated);
    onSelectTrack(newTrack);
    setYtInput('');
    setYtTitle('');
    onClose();
  };

  const removeCustomTrack = (id, e) => {
    e.stopPropagation();
    const filtered = customYtTracks.filter(t => t.id !== id);
    saveCustomTracks(filtered);
  };

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
              <h2 className="text-lg font-bold text-white">Dev Vibe Playlists & YouTube</h2>
              <p className="text-xs text-zinc-400">Curated beats + paste any YouTube video or playlist URL</p>
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
          
          {/* Add Custom YouTube Link Form */}
          <form onSubmit={handleAddYouTube} className="glass-pill p-4 rounded-2xl border border-red-500/30 space-y-3 bg-red-500/5">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 font-mono">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Add Custom YouTube Link / Playlist</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Paste YouTube Video or Playlist URL..."
                value={ytInput}
                onChange={(e) => setYtInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/60 font-mono"
              />
              <input
                type="text"
                placeholder="Optional Track Title (e.g. My Midnight Code Mix)..."
                value={ytTitle}
                onChange={(e) => setYtTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/60"
              />
            </div>

            {errorMsg && (
              <p className="text-[11px] text-red-400 font-mono">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add & Play YouTube Track</span>
            </button>
          </form>

          {/* User Custom Added YouTube Tracks */}
          {customYtTracks.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <span>My Saved YouTube Vibe Tracks</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/20 text-red-300">
                  {customYtTracks.length} Saved
                </span>
              </h3>

              <div className="space-y-1.5">
                {customYtTracks.map(track => {
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
                          ? 'bg-red-500/20 border-red-500 text-white shadow-lg' 
                          : 'glass-pill border-transparent hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            <span>{track.title}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => removeCustomTrack(track.id, e)}
                          title="Remove custom track"
                          className="p-1.5 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="p-2 rounded-full bg-red-500 text-white">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* YouTube Presets (Lofi Girl 24/7 Live streams, etc) */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <span>YouTube 24/7 Live Streams</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
                Live Beats
              </span>
            </h3>

            <div className="space-y-1.5">
              {YOUTUBE_PRESETS.map(track => {
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

          {/* Regular Audio Playlists */}
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

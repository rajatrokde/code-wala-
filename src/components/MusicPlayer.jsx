import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  ListMusic, 
  Repeat, 
  Shuffle,
  Disc,
  Youtube,
  Tv,
  X,
  Search,
  Music,
  Check
} from 'lucide-react';

export default function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  setIsPlaying, 
  onNextTrack, 
  onPrevTrack, 
  onOpenPlaylist,
  visualizerEnabled,
  allTracks = [],
  onSelectTrack
}) {
  const audioRef = useRef(null);
  const iframeRef = useRef(null);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [showYtVideo, setShowYtVideo] = useState(false);
  const [showSongList, setShowSongList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const postYouTubeCommand = (func, args = '') => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: func,
          args: args
        }), '*');
      }
    } catch (e) {
      console.warn("YouTube postMessage error:", e);
    }
  };

  // Sync HTML5 Audio element with play/pause state for standard MP3 tracks
  useEffect(() => {
    if (currentTrack.isYouTube) {
      postYouTubeCommand(isPlaying ? 'playVideo' : 'pauseVideo');
      return;
    }

    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Autoplay policy error:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (!currentTrack.isYouTube && audioRef.current) {
      audioRef.current.currentTime = newTime;
    } else if (currentTrack.isYouTube) {
      postYouTubeCommand('seekTo', [newTime, true]);
    }
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (currentTrack.isYouTube) {
      postYouTubeCommand(nextState ? 'playVideo' : 'pauseVideo');
    }
  };

  const handleNext = () => {
    if (currentTrack.isYouTube && currentTrack.playlistId) {
      postYouTubeCommand('nextVideo');
    }
    onNextTrack(isShuffle);
  };

  const handlePrev = () => {
    if (currentTrack.isYouTube && currentTrack.playlistId) {
      postYouTubeCommand('previousVideo');
    }
    onPrevTrack();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getYouTubeEmbedUrl = () => {
    if (!currentTrack.isYouTube) return '';
    
    if (currentTrack.playlistId && currentTrack.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrack.youtubeId}?list=${currentTrack.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    } else if (currentTrack.playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${currentTrack.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    } else if (currentTrack.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    }
    return '';
  };

  const handleSeekOffset = (seconds) => {
    if (!currentTrack.isYouTube && audioRef.current) {
      const newTime = Math.max(0, Math.min(duration || 100, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (currentTrack.isYouTube) {
      const newTime = Math.max(0, currentTime + seconds);
      setCurrentTime(newTime);
      postYouTubeCommand('seekTo', [newTime, true]);
    }
  };

  const filteredTracks = allTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex justify-center px-4 pb-6 z-30 select-none relative">
      
      {/* Native MP3 Audio Player */}
      {!currentTrack.isYouTube && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            if (isLoop) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            } else {
              onNextTrack(isShuffle);
            }
          }}
        />
      )}

      {/* Persistent Single YouTube Embed Player */}
      {currentTrack.isYouTube && (
        <div className={`fixed transition-all duration-300 z-50 ${
          showYtVideo 
            ? 'bottom-24 right-4 sm:right-6 glass-panel p-2 rounded-2xl border border-red-500/40 shadow-2xl scale-100 opacity-100' 
            : 'bottom-0 right-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none'
        }`}>
          {showYtVideo && (
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 font-mono">
                <Youtube className="w-3.5 h-3.5" /> YouTube Video Window
              </span>
              <button
                onClick={() => setShowYtVideo(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <iframe
            ref={iframeRef}
            key={currentTrack.id + '-' + (currentTrack.youtubeId || currentTrack.playlistId || '')}
            width={showYtVideo ? "320" : "1"}
            height={showYtVideo ? "180" : "1"}
            className="rounded-xl border border-white/10"
            src={getYouTubeEmbedUrl()}
            title={currentTrack.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Floating Vertical Song List Panel (Interactive Queue Drawer) */}
      {showSongList && (
        <div className="fixed bottom-28 right-4 sm:right-12 z-50 glass-panel w-full max-w-sm p-4 rounded-3xl border border-amber-500/30 shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[420px]">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <Music className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Songs List (Click to Play)</h3>
            </div>
            <button
              onClick={() => setShowSongList(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search song title or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-xs text-white placeholder-zinc-500 pl-8 pr-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Songs List */}
          <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredTracks.map((track, idx) => {
              const isSelected = currentTrack.id === track.id;
              return (
                <div
                  key={track.id + '-' + idx}
                  onClick={() => {
                    if (onSelectTrack) onSelectTrack(track);
                  }}
                  className={`p-2 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-md' 
                      : 'glass-pill border-transparent hover:bg-white/10 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={track.cover} 
                      alt={track.title} 
                      className="w-9 h-9 rounded-xl object-cover shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                        <span>{track.title}</span>
                        {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">{track.artist}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 shrink-0">
                    <span>{track.duration}</span>
                    <div className={`p-1.5 rounded-full ${isSelected ? 'bg-amber-400 text-zinc-950' : 'bg-white/10 text-zinc-300'}`}>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Main Glassmorphic Floating Audio Player Bar */}
      <div className="glass-panel w-full max-w-2xl px-5 py-3.5 rounded-3xl shadow-2xl flex flex-col gap-2.5 transition-all duration-300 border border-white/15">
        
        <div className="flex items-center justify-between gap-4">
          
          {/* Track Info & Album / YouTube Art */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative group shrink-0">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-md ${isPlaying ? 'animate-spin-slow' : 'paused'}`}>
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              {currentTrack.isYouTube ? (
                <div 
                  onClick={() => setShowYtVideo(!showYtVideo)}
                  className="absolute inset-0 rounded-full flex items-center justify-center bg-red-600/80 cursor-pointer hover:scale-105 transition-transform"
                  title="Toggle YouTube Video View"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Disc className="w-5 h-5 text-white animate-spin" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white truncate font-sans tracking-wide">
                  {currentTrack.title}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0 ${
                  currentTrack.isYouTube ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {currentTrack.category}
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls & Volume */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Toggle Song List Panel Button */}
            <button
              onClick={() => setShowSongList(!showSongList)}
              title={showSongList ? "Close Songs List Panel" : "Open All Songs List Panel (Click Song Title to Play)"}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold font-mono transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                showSongList 
                  ? 'text-zinc-950 bg-amber-400 border border-amber-300 shadow-lg shadow-amber-400/20' 
                  : 'glass-pill text-amber-300 hover:text-white border-amber-500/30 hover:border-amber-400'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>🎶 All Songs</span>
            </button>

            {/* Toggle YouTube Video Display Button */}
            {currentTrack.isYouTube && (
              <button
                onClick={() => setShowYtVideo(!showYtVideo)}
                title={showYtVideo ? "Hide YouTube Video View" : "Show YouTube Video & Playlist View"}
                className={`p-2 rounded-full text-xs transition-all cursor-pointer ${
                  showYtVideo ? 'text-red-400 bg-red-500/20 border border-red-500/40 shadow-lg' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Tv className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle Playlist"
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                isShuffle ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrev}
              title="Previous Track"
              className="p-2 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer hover:bg-white/5 active:scale-95"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              className="p-3 rounded-full bg-white text-zinc-950 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg hover:shadow-white/20"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              title="Next Track (N)"
              className="p-2 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer hover:bg-white/5 active:scale-95"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => setIsLoop(!isLoop)}
              title="Loop Track"
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                isLoop ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Playlist Drawer Toggle */}
            <button
              onClick={onOpenPlaylist}
              title="Open Playlist Drawer & Songs List"
              className="p-2 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer hover:bg-white/5 ml-1 relative"
            >
              <ListMusic className="w-4 h-4 text-amber-400" />
            </button>

          </div>

        </div>

        {/* Timeline Progress Bar & Volume */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono text-zinc-400">
          <button 
            onClick={() => handleSeekOffset(-10)} 
            title="Rewind 10 Seconds"
            className="text-[10px] text-zinc-400 hover:text-emerald-300 px-1.5 py-0.5 rounded glass-pill font-mono cursor-pointer transition-colors"
          >
            -10s
          </button>
          <span>{formatTime(currentTime)}</span>
          
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300"
            />
          </div>

          <span>{currentTrack.isYouTube ? (currentTrack.duration || 'LIVE 🔴') : formatTime(duration)}</span>
          <button 
            onClick={() => handleSeekOffset(10)} 
            title="Forward 10 Seconds"
            className="text-[10px] text-zinc-400 hover:text-emerald-300 px-1.5 py-0.5 rounded glass-pill font-mono cursor-pointer transition-colors"
          >
            +10s
          </button>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button onClick={toggleMute} className="text-zinc-400 hover:text-white cursor-pointer">
              {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-300"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

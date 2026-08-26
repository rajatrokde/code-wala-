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
  X
} from 'lucide-react';

export default function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  setIsPlaying, 
  onNextTrack, 
  onPrevTrack, 
  onOpenPlaylist,
  visualizerEnabled
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [showYtVideo, setShowYtVideo] = useState(false);

  // Sync HTML5 Audio element with play/pause state for standard MP3 tracks
  useEffect(() => {
    if (currentTrack.isYouTube) return;

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
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
    
    // Priority: If playlistId exists, use videoseries or video with playlist
    if (currentTrack.playlistId && currentTrack.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrack.youtubeId}?list=${currentTrack.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    } else if (currentTrack.playlistId) {
      return `https://www.youtube.com/embed/videoseries?list=${currentTrack.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    } else if (currentTrack.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;
    }
    return '';
  };

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

      {/* Persistent Single YouTube Embed Player (Zero unmounting on toggle) */}
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
              onClick={onPrevTrack}
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
              onClick={() => onNextTrack(isShuffle)}
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
              title="Open Playlist Drawer & Add YouTube Links"
              className="p-2 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer hover:bg-white/5 ml-1 relative"
            >
              <ListMusic className="w-4 h-4 text-amber-400" />
            </button>

          </div>

        </div>

        {/* Timeline Progress Bar & Volume */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
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

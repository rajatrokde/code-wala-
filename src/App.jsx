import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MusicPlayer from './components/MusicPlayer';
import Visualizer from './components/Visualizer';
import AmbientMixer from './components/AmbientMixer';
import PomodoroTimer from './components/PomodoroTimer';
import PlaylistModal from './components/PlaylistModal';
import BackgroundPicker from './components/BackgroundPicker';
import { PLAYLISTS, BACKGROUND_SCENES } from './utils/playlistData';
import { playKeyboardThock, playDevHorn } from './utils/audioSynth';

export default function App() {
  const [currentScene, setCurrentScene] = useState(BACKGROUND_SCENES[0]);
  const [currentTrack, setCurrentTrack] = useState(PLAYLISTS[0].tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [grainEnabled, setGrainEnabled] = useState(false);
  const [visualizerEnabled, setVisualizerEnabled] = useState(true);

  // Modals state
  const [showAmbientMixer, setShowAmbientMixer] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  // Get all flattened tracks for next/prev navigation
  const allTracks = PLAYLISTS.flatMap(p => p.tracks);

  const handleNextTrack = (isShuffle = false) => {
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * allTracks.length);
      setCurrentTrack(allTracks[randomIdx]);
    } else {
      const currentIdx = allTracks.findIndex(t => t.id === currentTrack.id);
      const nextIdx = (currentIdx + 1) % allTracks.length;
      setCurrentTrack(allTracks[nextIdx]);
    }
  };

  const handlePrevTrack = () => {
    const currentIdx = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIdx = (currentIdx - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIdx]);
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user typing in an input field
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key.toLowerCase() === 'n') {
        handleNextTrack();
      } else if (e.key.toLowerCase() === 'k') {
        playKeyboardThock('thock');
      } else if (e.key.toLowerCase() === 'h') {
        playDevHorn();
      } else if (e.key.toLowerCase() === 'p') {
        setShowPomodoro(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTrack]);

  return (
    <div className={`relative min-w-full min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b ${currentScene.gradient} transition-colors duration-1000`}>
      
      {/* Film Grain Texture Overlay */}
      {grainEnabled && <div className="film-grain"></div>}

      {/* Dynamic Audio Visualizer Canvas */}
      {visualizerEnabled && (
        <Visualizer isPlaying={isPlaying} accentColor={currentScene.accentColor} />
      )}

      {/* Main Header */}
      <Header 
        onTogglePomodoro={() => setShowPomodoro(true)}
        onToggleAmbient={() => setShowAmbientMixer(true)}
        onToggleBackgrounds={() => setShowBackgroundPicker(true)}
        grainEnabled={grainEnabled}
        setGrainEnabled={setGrainEnabled}
        visualizerEnabled={visualizerEnabled}
        setVisualizerEnabled={setVisualizerEnabled}
      />

      {/* Hero Content Section */}
      <HeroSection currentScene={currentScene} />

      {/* Glassmorphic Audio Player Footer */}
      <MusicPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onOpenPlaylist={() => setShowPlaylist(true)}
        visualizerEnabled={visualizerEnabled}
      />

      {/* Modals & Drawers */}
      <AmbientMixer 
        isOpen={showAmbientMixer} 
        onClose={() => setShowAmbientMixer(false)} 
      />

      <PomodoroTimer 
        isOpen={showPomodoro} 
        onClose={() => setShowPomodoro(false)} 
      />

      <PlaylistModal 
        isOpen={showPlaylist} 
        onClose={() => setShowPlaylist(false)}
        currentTrack={currentTrack}
        onSelectTrack={(track) => {
          setCurrentTrack(track);
          setIsPlaying(true);
        }}
      />

      <BackgroundPicker 
        isOpen={showBackgroundPicker} 
        onClose={() => setShowBackgroundPicker(false)}
        currentScene={currentScene}
        onSelectScene={setCurrentScene}
      />

    </div>
  );
}

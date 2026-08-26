// Helper utility to parse YouTube URLs and manage playlists

export function parseYouTubeUrl(url) {
  if (!url) return null;

  let videoId = null;
  let playlistId = null;

  const playlistMatch = url.match(/[?&]list=([^#&?]+)/);
  if (playlistMatch) {
    playlistId = playlistMatch[1];
  }

  const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (videoMatch) {
    videoId = videoMatch[1];
  }

  if (!videoId && !playlistId) return null;

  return {
    videoId,
    playlistId,
    cover: videoId 
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
      : 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80'
  };
}

export const MAIN_YOUTUBE_PLAYLIST = {
  id: 'yt-main-user-playlist',
  title: '▶️ Play Full YouTube Playlist Series',
  artist: 'Full YouTube Playlist (PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn)',
  category: 'Full Playlist',
  isYouTube: true,
  playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
  cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
  url: 'https://www.youtube.com/playlist?list=PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
  duration: 'ALL SONGS 🎶'
};

// All songs inside the playlist listed individually song by song
export const YOUTUBE_PRESETS = [
  MAIN_YOUTUBE_PLAYLIST,
  {
    id: 'yt-song-1',
    title: '1. MAAZ — SAMBATA (Prod. by Zerochill)',
    artist: 'SAMBATA',
    category: 'Playlist Song 1',
    isYouTube: true,
    youtubeId: 'wIL7KzTLxXU',
    playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
    cover: 'https://img.youtube.com/vi/wIL7KzTLxXU/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=wIL7KzTLxXU',
    duration: '3:15'
  },
  {
    id: 'yt-song-2',
    title: '2. Lofi Girl — Beats to Relax/Study to',
    artist: 'Lofi Girl',
    category: 'Playlist Song 2',
    isYouTube: true,
    youtubeId: 'jfKfPfyJRdk',
    playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
    cover: 'https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    duration: 'LIVE 🔴'
  },
  {
    id: 'yt-song-3',
    title: '3. Synthwave Radio 24/7 Chill Synth',
    artist: 'Lofi Girl Synthwave',
    category: 'Playlist Song 3',
    isYouTube: true,
    youtubeId: '4xDzrJKXOOY',
    playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
    cover: 'https://img.youtube.com/vi/4xDzrJKXOOY/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
    duration: 'LIVE 🔴'
  },
  {
    id: 'yt-song-4',
    title: '4. Bollywood Lofi Chill Mix',
    artist: 'Retro India Vibe',
    category: 'Playlist Song 4',
    isYouTube: true,
    youtubeId: 'N3x6m6S28Hw',
    playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
    cover: 'https://img.youtube.com/vi/N3x6m6S28Hw/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=N3x6m6S28Hw',
    duration: '1:45:00'
  },
  {
    id: 'yt-song-5',
    title: '5. Midnight Code Flow (Chill Lo-Fi Beat)',
    artist: 'Code & Chill Studio',
    category: 'Playlist Song 5',
    isYouTube: true,
    youtubeId: '5qap5aO4i9A',
    playlistId: 'PLBGdAjPuC6fTe8aR5jTHZ9ntRdVJXm-wn',
    cover: 'https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    duration: '2:40'
  }
];

// Helper utility to parse YouTube URLs and manage custom user playlists

export function parseYouTubeUrl(url) {
  if (!url) return null;

  let videoId = null;
  let playlistId = null;

  // Check playlist ID
  const playlistMatch = url.match(/[?&]list=([^#&?]+)/);
  if (playlistMatch) {
    playlistId = playlistMatch[1];
  }

  // Check video ID
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

export const YOUTUBE_PRESETS = [
  {
    id: 'yt-lofigirl',
    title: 'Lofi Girl — Beats to Relax/Study to',
    artist: 'Lofi Girl (YouTube Live)',
    category: 'YouTube Live',
    isYouTube: true,
    youtubeId: 'jfKfPfyJRdk',
    cover: 'https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    duration: 'LIVE 🔴'
  },
  {
    id: 'yt-synthwave',
    title: 'Synthwave Radio 24/7 Chill Synth',
    artist: 'Lofi Girl Synthwave',
    category: 'YouTube Live',
    isYouTube: true,
    youtubeId: '4xDzrJKXOOY',
    cover: 'https://img.youtube.com/vi/4xDzrJKXOOY/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
    duration: 'LIVE 🔴'
  },
  {
    id: 'yt-bollywood',
    title: 'Bollywood Lofi Chill Mix',
    artist: 'Retro India Vibe',
    category: 'YouTube Mix',
    isYouTube: true,
    youtubeId: 'N3x6m6S28Hw',
    cover: 'https://img.youtube.com/vi/N3x6m6S28Hw/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=N3x6m6S28Hw',
    duration: '1:45:00'
  }
];

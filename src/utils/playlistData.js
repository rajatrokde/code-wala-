// Buswala (बस वाला) Playlists, Background Scenes & Highway Quotes

export const PLAYLISTS = [
  {
    id: 'buswala-sleeper',
    name: 'Night Sleeper Coach Lo-Fi',
    badge: 'NIGHT RIDE 🌃',
    description: 'Cozy low-tempo beats, rain on window glass, and passing streetlights for late night travel.',
    tracks: [
      {
        id: 101,
        title: 'Window Seat & Raindrops',
        artist: 'Buswala Studio',
        category: 'Sleeper Vibe',
        cover: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=80',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
        duration: '2:27'
      },
      {
        id: 102,
        title: 'Highway Lights at 3 AM',
        artist: 'Sleeper Express',
        category: 'Night Drive',
        cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
        url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=cozy-lofi-beat-13429.mp3',
        duration: '2:14'
      },
      {
        id: 103,
        title: 'Ghat Section Fog (Acoustic Chill)',
        artist: 'Mountain Bus Vibe',
        category: 'Ghat Section',
        cover: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80',
        url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b9195b43.mp3?filename=chill-lofi-song-8444.mp3',
        duration: '3:05'
      }
    ]
  },
  {
    id: 'buswala-dhabha',
    name: '2 AM Dhabha Halt Retro Mix',
    badge: 'DHABHA HALT ☕',
    description: 'Soulful Bollywood vintage retro classics played at midnight highway tea halts.',
    tracks: [
      {
        id: 104,
        title: 'Chai, Sitar & Highway Wind',
        artist: 'Dhabha Beats Collective',
        category: 'Highway Retro',
        cover: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=500&auto=format&fit=crop&q=80',
        url: 'https://cdn.pixabay.com/download/audio/2023/04/19/audio_d0ec1b4b21.mp3?filename=ambient-piano-sunset-145610.mp3',
        duration: '3:18'
      },
      {
        id: 105,
        title: 'Safar Khubsoorat Hai (Lo-Fi Flip)',
        artist: 'Buswala Retro Beats',
        category: 'Highway Retro',
        cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
        url: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c0c37e6f3b.mp3?filename=relaxing-chill-lofi-110825.mp3',
        duration: '2:15'
      }
    ]
  }
];

export const BACKGROUND_SCENES = [
  {
    id: 'night-sleeper-bus',
    name: 'Night Sleeper Bus Window (Window Seat Vibe)',
    gradient: 'from-blue-950 via-slate-900 to-indigo-950',
    titleColor: 'text-amber-300',
    tagline: 'सफ़र ख़ूबसूरत है मंज़िल से भी, बस खिड़की वाली सीट मिल जाए।',
    accentColor: '#f59e0b',
    bgImage: '/custom-bg.jpg'
  },
  {
    id: 'sunrise-highway',
    name: 'Sunrise Express Highway Ride',
    gradient: 'from-amber-950 via-rose-950 to-slate-950',
    titleColor: 'text-orange-400',
    tagline: 'खिड़की से बहती सुबह की ठंडी हवा और हेडफ़ोन में सुकून।',
    accentColor: '#f97316',
    bgImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&auto=format&fit=crop&q=80'
  },
  {
    id: 'dhabha-halt',
    name: '2 AM Highway Dhabha Tea Stop',
    gradient: 'from-indigo-950 via-purple-950 to-zinc-950',
    titleColor: 'text-amber-200',
    tagline: '2 बजे की कड़क ढाबा चाय और हॉर्न की गूँज।',
    accentColor: '#fbbf24',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&auto=format&fit=crop&q=80'
  },
  {
    id: 'mountain-ghat',
    name: 'Mountain Ghat Foggy Journey',
    gradient: 'from-slate-950 via-teal-950 to-zinc-950',
    titleColor: 'text-emerald-300',
    tagline: 'पहाड़ों के मोड़ों पर बस की धीमी रफ़्तार और मनपसंद गाने।',
    accentColor: '#10b981',
    bgImage: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&auto=format&fit=crop&q=80'
  }
];

export const ROTATING_QUOTES = [
  "सफ़र ख़ूबसूरत है मंज़िल से भी, बस खिड़की वाली सीट मिल जाए।",
  "खिड़की से बहती ठंडी हवा और कान में बजता पसंदीदा गाना।",
  "Night bus journey: Low lights, rain drops on glass, lo-fi beats.",
  "Horn Ok Please! बस चली अपनी मंज़िल की ओर।",
  "2 बजे रात की कड़क ढाबा चाय और गर्म भजिए।",
  "धीमी रफ़्तार, लंबा सफ़र, और गानों का साथ।"
];

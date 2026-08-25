import confetti from 'canvas-confetti';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Mechanical Keyboard Thock Sound
export function playKeyboardThock(profile = 'thock') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(profile === 'clicky' ? 2500 : 1200, now);
    filter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(filter);
    filter.connect(noiseGain);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    const freq = (profile === 'thock' ? 110 : profile === 'clicky' ? 220 : 150) + (Math.random() * 20 - 10);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.04);

    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(oscGain);

    noiseGain.connect(ctx.destination);
    oscGain.connect(ctx.destination);

    noise.start(now);
    osc.start(now);
    osc.stop(now + 0.05);
    noise.stop(now + 0.05);
  } catch (err) {
    console.warn("Audio Context Error:", err);
  }
}

// 2. Developer / Highway Truck Horn Sound
export function playDevHorn() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const masterGain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    osc1.frequency.setValueAtTime(415, now);
    osc2.frequency.setValueAtTime(520, now);

    osc1.frequency.linearRampToValueAtTime(425, now + 0.15);
    osc2.frequency.linearRampToValueAtTime(530, now + 0.15);
    osc1.frequency.linearRampToValueAtTime(415, now + 0.4);

    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    masterGain.gain.setValueAtTime(0.4, now + 0.35);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1800, now);

    osc1.connect(lp);
    osc2.connect(lp);
    lp.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch (e) {
    console.warn(e);
  }
}

// 3. Fix Bug Crackle Burst + Multi-Cannon Screen Confetti
export function playFixBugSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Victory Chime Notes
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.5);
    });

    // Synthesize crackling pops sound FX
    for (let i = 0; i < 12; i++) {
      const popTime = now + Math.random() * 0.4;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 1600, popTime);

      gain.gain.setValueAtTime(0.15, popTime);
      gain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(popTime);
      osc.stop(popTime + 0.02);
    }

    // Trigger full screen crackles & confetti cannons
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
      });
    }, 150);
  } catch (e) {
    console.warn(e);
  }
}

// 4. Git Push / Rocket Sound
export function playGitPushSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(3000, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.warn(e);
  }
}

// 5. "Chal Chai Peele" + Chai Tapri Clink Sound
export function playCoffeeSip() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // High frequency tea cup glass clink sound
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);

    // Filtered tea pour sizzle
    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.sin(i / 80);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(4, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.28);

    // Speak "चल चहा पिऊया!" (Marathi) phrase in warm female voice using Web Speech API
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("चल चहा पिऊया!");
      utterance.rate = 1.05;
      utterance.pitch = 1.45; // Female voice pitch shift
      utterance.lang = 'mr-IN';

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        (v.lang.includes('mr') || v.lang.includes('hi') || v.lang.includes('en')) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('zira'))
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.warn(e);
  }
}

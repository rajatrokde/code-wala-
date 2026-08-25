// Procedural Web Audio API Ambient Generators for Developer Vibes

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.channels = {
      rain: { gainNode: null, source: null, isRunning: false, volume: 0 },
      keyboard: { gainNode: null, intervalId: null, isRunning: false, volume: 0 },
      vinyl: { gainNode: null, intervalId: null, isRunning: false, volume: 0 },
      fireplace: { gainNode: null, source: null, isRunning: false, volume: 0 },
      cafe: { gainNode: null, source: null, isRunning: false, volume: 0 }
    };
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(channelName, volume) {
    this.initContext();
    const ch = this.channels[channelName];
    if (!ch) return;

    ch.volume = volume;

    if (volume > 0 && !ch.isRunning) {
      this.startChannel(channelName);
    }

    if (ch.gainNode && this.ctx) {
      ch.gainNode.gain.setTargetAtTime(volume * 0.4, this.ctx.currentTime, 0.1);
    }

    if (volume === 0 && ch.isRunning) {
      this.stopChannel(channelName);
    }
  }

  startChannel(channelName) {
    const ch = this.channels[channelName];
    if (ch.isRunning) return;
    ch.isRunning = true;

    if (channelName === 'rain') {
      this.startRain();
    } else if (channelName === 'keyboard') {
      this.startKeyboardLoop();
    } else if (channelName === 'vinyl') {
      this.startVinylCrackle();
    } else if (channelName === 'fireplace') {
      this.startFireplace();
    } else if (channelName === 'cafe') {
      this.startCafe();
    }
  }

  stopChannel(channelName) {
    const ch = this.channels[channelName];
    if (!ch.isRunning) return;
    ch.isRunning = false;

    if (ch.source) {
      try { ch.source.stop(); } catch (e) {}
      ch.source = null;
    }
    if (ch.intervalId) {
      clearInterval(ch.intervalId);
      ch.intervalId = null;
    }
  }

  // 1. Procedural Pink Noise Rain Generator
  startRain() {
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to simulate rain hitting window pane
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(this.channels.rain.volume * 0.4, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    this.channels.rain.source = noise;
    this.channels.rain.gainNode = gainNode;
  }

  // 2. Procedural Typing Ambience Loop
  startKeyboardLoop() {
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.channels.keyboard.volume * 0.4, this.ctx.currentTime);
    gainNode.connect(this.ctx.destination);
    this.channels.keyboard.gainNode = gainNode;

    const triggerClick = () => {
      if (!this.channels.keyboard.isRunning) return;
      // Random click
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.03);

      clickGain.gain.setValueAtTime(0.3, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(clickGain);
      clickGain.connect(gainNode);

      osc.start(now);
      osc.stop(now + 0.04);
    };

    this.channels.keyboard.intervalId = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerClick();
      }
    }, 140);
  }

  // 3. Vinyl Crackle Ambience
  startVinylCrackle() {
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(this.channels.vinyl.volume * 0.4, this.ctx.currentTime);
    gainNode.connect(this.ctx.destination);
    this.channels.vinyl.gainNode = gainNode;

    const triggerPop = () => {
      if (!this.channels.vinyl.isRunning) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const popGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 1500, now);

      popGain.gain.setValueAtTime(0.15, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

      osc.connect(popGain);
      popGain.connect(gainNode);

      osc.start(now);
      osc.stop(now + 0.01);
    };

    this.channels.vinyl.intervalId = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerPop();
      }
    }, 90);
  }

  // 4. Fireplace Crackle
  startFireplace() {
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.98 ? 0.8 : 0.02);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(this.channels.fireplace.volume * 0.4, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    this.channels.fireplace.source = noise;
    this.channels.fireplace.gainNode = gainNode;
  }

  // 5. Cafe Murmur
  startCafe() {
    const ctx = this.ctx;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(this.channels.cafe.volume * 0.4, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    this.channels.cafe.source = noise;
    this.channels.cafe.gainNode = gainNode;
  }
}

export const ambientEngine = new AmbientAudioEngine();

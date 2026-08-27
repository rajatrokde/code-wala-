# 🚌 BUS WALA (बस वाला) — Highway Travel & Vibe Studio

[![Live App](https://img.shields.io/badge/Vercel-Live--App-emerald?style=for-the-badge&logo=vercel)](https://code-wala-alpha.vercel.app/)
[![GitHub Branch](https://img.shields.io/badge/Git-dev--branch-blue?style=for-the-badge&logo=github)](https://github.com/rajatrokde/code-wala-/tree/dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://github.com/rajatrokde/code-wala-)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Manifests-326CE5?style=for-the-badge&logo=kubernetes)](https://github.com/rajatrokde/code-wala-/tree/main/k8s)

> *"सफ़र ख़ूबसूरत है मंज़िल से भी, बस खिड़की वाली सीट मिल जाए।"*

**BUS WALA (बस वाला)** is an interactive, atmospheric lo-fi travel audio studio designed for highway enthusiasts, sleeper coach commuters, and late-night music lovers. Built with React, Vite, Tailwind CSS, Web Audio API, and YouTube iFrame Integration.

---

## 🌟 Key Features

- 🚌 **Bilingual Aesthetic Header & Slogans**: Dual-language typography (`"बस वाला"` / `"BUS WALA — HIGHWAY TRAVEL & VIBE STUDIO"`) with rotating highway travel quotes.
- 🎺 **Interactive Highway SFX Synth Engine**:
  - **🎺 Bus Pressure Horn**: Realistic dual-tone sleeper bus pressure horn.
  - **🎫 Conductor Whistle**: High-pitch metallic whistle blast.
  - **🎟️ Ticket Puncher**: Clicky ticket puncher sound.
  - **☕ Dhabha Chai**: Hot tea sip sound with female Marathi speech synthesis (*"चल चहा पिऊया!"*).
  - **🚌 Diesel Engine Rev**: Deep rumble engine roar sound.
- 🎨 **High-Resolution Custom Lo-Fi Backgrounds**:
  1. 🌃 **Night Sleeper Bus Window**: Raindrops on window pane with passing highway lights.
  2. 🏮 **2 AM Highway Dhabha Tea Stop**: Neon-lit dhabha, Volvo coach, and steaming chai.
  3. 🌄 **Sunrise Himalayan Express**: Golden hour sunbeams over misty mountain ghat curves.
- 🎵 **YouTube & Lo-Fi Audio Integration**:
  - Play, Pause, Next, Previous, and 10s Rewind/Forward timeline seek controls.
  - Interactive playlist tracklist with song-by-song selection.
  - Floating Picture-in-Picture YouTube Video Player (`📺`).

---

## 🚀 Step-by-Step Local Setup & Installation

### Prerequisites
Make sure you have Node.js (v18+ or v20+) installed on your machine.

### 1. Clone Repository & Switch to `dev` Branch
```bash
git clone https://github.com/rajatrokde/code-wala-.git
cd code-wala-
git checkout dev
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm start
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🐳 Docker Deployment

### Build & Run Container
```bash
docker build -t buswala-app:latest .
docker run -d -p 8080:80 --name buswala buswala-app:latest
```
Access the containerized app at **[http://localhost:8080](http://localhost:8080)**.

### Run with Docker Compose
```bash
docker-compose up -d --build
```

---

## ☸️ Kubernetes Deployment (K8s)

Apply production Kubernetes manifests:
```bash
kubectl apply -k k8s/
```
To check deployment status:
```bash
kubectl get all -n dev-vibes
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS 3, Lucide Icons, Canvas Confetti
- **Audio Engine**: Web Audio API (Synthesizers & Noise Generators) + Web SpeechSynthesis API
- **Embeds**: YouTube iFrame Player API (`postMessage` sync)
- **DevOps**: Docker, Docker Compose, Kubernetes, Vercel CI/CD

---

## 🔗 Useful Links

- 🌐 **Live Website**: [https://code-wala-alpha.vercel.app/](https://code-wala-alpha.vercel.app/)
- 🐙 **GitHub Repository**: [https://github.com/rajatrokde/code-wala-/tree/dev](https://github.com/rajatrokde/code-wala-/tree/dev)
- 🔀 **Open Pull Request (`dev` -> `main`)**: [https://github.com/rajatrokde/code-wala-/pull/new/dev](https://github.com/rajatrokde/code-wala-/pull/new/dev)

---
*Created with ❤️ for highway travellers and lo-fi vibes.*

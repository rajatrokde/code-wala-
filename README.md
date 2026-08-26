# 🎧 Code & Sukoon — Dev & Vibe Studio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://code-wala-alpha.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/rajatrokde/code-wala-)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Production_Ready-326CE5?style=for-the-badge&logo=kubernetes)](https://kubernetes.io/)

> **Where Vibe Coding Meets Flow State & Productivity!**  
> An aesthetic, immersive web application crafted specifically for software developers who code and vibe with music, procedural sound effects, ambient noise layers, and focus timers.

---

## 🌐 Live Demo & Repository

- 🚀 **Live Production App**: [https://code-wala-alpha.vercel.app/](https://code-wala-alpha.vercel.app/)
- ⭐ **GitHub Repository**: [https://github.com/rajatrokde/code-wala-](https://github.com/rajatrokde/code-wala-)

---

## ✨ Features

- 🎹 **Procedural Web Audio Engine**: Zero heavy audio files! Synthesizes mechanical keyboard thocks (`⌨️`), tea tapri cup clinks (`☕`), Marathi vocal lines (*"चल चहा पिऊया!"*), and celebratory bug-fix chimes in real-time.
- 📺 **Full YouTube Playlist & Video Integration**: Stream any YouTube video or multi-song playlist (`videoseries`) inside a floating Picture-in-Picture window (`📺`).
- 🌧️ **Layerable Ambient Sound Mixer**: Mix Rain on Glass, Mechanical Typing, Fireplace, Vinyl Crackle, and Coffee Shop Chatter with your music.
- 💻 **Pomodoro Focus Timer**: 25m Focus / 5m Break timer overlay with audio alerts.
- 🎨 **Aesthetic Theme Switcher**: Change backgrounds between *Lo-Fi Anime Coder*, *Highway Trucker*, *Cyberpunk Code Desk*, *Lo-Fi Rain Window*, and *80s Synthwave Grid*.
- ⚡ **Keyboard Shortcuts**:
  - `Space`: Play / Pause music
  - `N`: Next track
  - `K`: Play Mechanical Thock sound
  - `H`: Play Truck Horn sound
  - `P`: Toggle Pomodoro Focus Timer

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Audio Engine**: Web Audio API, Web Speech API (`SpeechSynthesis`)
- **Effects & UI**: Canvas Confetti, Lucide Icons
- **DevOps & Infrastructure**: Docker (Multi-stage), Docker Compose, Kubernetes (K8s Manifests), Vercel CI/CD

---

## 🚀 Step-by-Step Local Setup Guide

### 1. Prerequisites
Make sure you have Node.js (v18 or higher) installed.

### 2. Clone the Repository
```bash
git clone https://github.com/rajatrokde/code-wala-.git
cd code-wala-
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm start
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser!

### 5. Build for Production
```bash
npm run build
```

---

## 🐳 Docker Deployment

### Run with Docker Compose (Recommended)
```bash
docker compose up -d
```
Open **[http://localhost:8080/](http://localhost:8080/)** in your browser.

### Run with Docker CLI
```bash
# Build Docker image
docker build -t dev-vibes:latest .

# Run Container on Port 8080
docker run -d -p 8080:80 --name code_sukoon_app dev-vibes:latest
```

---

## ☸️ Kubernetes (K8s) Production Deployment

The project includes production-grade Kubernetes manifests inside the `k8s/` folder (Namespace, ConfigMap, Deployment with HPA autoscaling, Service, Ingress, Kustomize).

### Deploy to Kubernetes:
```bash
# Deploy using Kustomize (One Command)
kubectl apply -k k8s/

# Or deploy using standard kubectl
kubectl apply -f k8s/
```

### Verify Kubernetes Deployment:
```bash
kubectl get pods -n dev-vibes
kubectl get svc -n dev-vibes
```

### Port-Forward to Access Locally:
```bash
kubectl port-forward svc/dev-vibes-service 8080:80 -n dev-vibes
```
Open **[http://localhost:8080/](http://localhost:8080/)**!

---

## ☁️ Vercel Deployment

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) -> Import Repository.
3. Vercel automatically detects Vite framework settings (`npm run build`, `dist`).
4. Click **Deploy**!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [Issues page](https://github.com/rajatrokde/code-wala-/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by [Rajat Rokde](https://github.com/rajatrokde) for developers who vibe while coding! 🎧

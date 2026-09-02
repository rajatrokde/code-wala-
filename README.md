# 🎧 CODE & SUKOON (कोड & सुकून) — Dev Lo-Fi Studio

[![Live App](https://img.shields.io/badge/Vercel-Live--App-emerald?style=for-the-badge&logo=vercel)](https://code-wala-alpha.vercel.app/)
[![GitHub Branch](https://img.shields.io/badge/Git-dev--branch-blue?style=for-the-badge&logo=github)](https://github.com/rajatrokde/code-wala-/tree/dev)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://github.com/rajatrokde/code-wala-)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Manifests-326CE5?style=for-the-badge&logo=kubernetes)](https://github.com/rajatrokde/code-wala-/tree/main/k8s)

> *"Late-night coding with old Hindi songs and warm chai."*

**CODE & SUKOON (코드 & सुकून)** is a developer-focused lo-fi music workstation designed for software engineers, late-night coders, and music enthusiasts. Built with React, Vite, Tailwind CSS, Web Audio API, and YouTube iFrame Integration.

---

## 🌟 Features & New Functions

- 🎶 **`🎶 All Songs` Button & Interactive Queue Drawer**:
  - Open a sleek vertical Songs List panel to view all songs by name, artist, duration, and cover image.
  - Live Search Filter to instantly find and play any song with 1-click.
- ⏩/⏪ **Timeline Scrubbing & Seeking**:
  - Quick **`-10s`** (Rewind) and **`+10s`** (Forward) buttons alongside a smooth draggable progress bar.
- 📺 **Persistent Picture-in-Picture YouTube Video Player**:
  - Floating video window toggle (`📺`) that never interrupts or restarts playback when opened/closed.
- 🎵 **Native YouTube Playlist iFrame Integration**:
  - Full support for YouTube playlists (`videoseries`), syncing Play/Pause/Next/Prev across controls.
- 🎹 **Interactive Web Audio SFX Synth**:
  - **☕ चहा Break**: Tea sip sound + Marathi voice *"चल चहा पिऊया!"*.
  - **⌨️ Thock Key**: Mechanical keyboard click sound.
  - **🪲 Fix Bug**: Confetti burst & celebratory chimes.
  - **🚀 git push**: Rocket sweep sound FX.
  - **🎺 Dev Horn**: Truck / Dev Horn OK Please.
- 🎨 **Aesthetic Theme Scenes**:
  - 🌙 *Lo-Fi Coder Desk*
  - ☕ *Chai Tapri Break*
  - 🌧️ *Rainy Mountain Ghat Journey*

---

## 🚀 Step-by-Step Local Setup & Run

### 1. Clone Repository & Install
```bash
git clone https://github.com/rajatrokde/code-wala-.git
cd code-wala-
npm install
```

### 2. Run Local Dev Server
```bash
npm start
```
Access at **[http://localhost:5173/](http://localhost:5173/)**.

---

## 🐳 Docker Container Setup

```bash
docker build -t codewala-app:latest .
docker run -d -p 8080:80 --name codewala codewala-app:latest
```
Access at **[http://localhost:8080](http://localhost:8080)**.

---

## ☸️ Kubernetes Deployment

```bash
kubectl apply -k k8s/
```

---

## 🔗 Live Links

- 🌐 **Live Website**: [https://code-wala-alpha.vercel.app/](https://code-wala-alpha.vercel.app/)
- 🐙 **GitHub Repository**: [https://github.com/rajatrokde/code-wala-](https://github.com/rajatrokde/code-wala-)

---
*Created with ❤️ for software developers & late night coders.*

# 🧙‍♀️ Nidhi's Realm — RPG Developer Portfolio

An interactive, game-inspired developer portfolio built with **React + Vite**. Visitors explore a colorful Zelda/Pokémon-style world map, navigate between themed zones, and discover skills, projects, work experience, and contact info through a fully gamified experience.

![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🗺️ World Map
- Illustrated SVG landscape with mountains, forests, lake, flowers, and paths
- 6 clickable zone markers with glow effects and proximity detection
- 3 NPCs with speech bubbles (hover or walk near)
- 6 hidden Easter eggs across the map

### 🧙‍♀️ Character System
- 4-directional animated sprite with walk cycle (4 frames)
- WASD / Arrow key movement with collision boundaries
- Sprint system (hold Shift) with aura effect
- Footstep dust trail and step counter
- Mobile D-pad with touch controls

### 🎮 Gamification
- **XP System** — earn XP for exploring zones, reading quests, opening chests, finding eggs
- **6 Levels** — Visitor → Curious → Explorer → Adventurer → Champion → True Ally
- **12 Achievements** — First Steps, Explorer, Cartographer, Egg Hunter, Speedster, and more
- **Level-up celebrations** with confetti animation
- **Floating XP popups** on every interaction
- **Achievement gallery** panel (click the level badge)
- **Sound effects** via Web Audio API (5 distinct sounds)

### 📱 Mobile Responsive
- Adaptive HUD that collapses on small screens
- Touch D-pad with sprint button
- Responsive minimap repositioning
- Safe area support for notch phones
- All zones scrollable with touch

### ♿ Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation with focus-visible outlines
- `prefers-reduced-motion` support
- Semantic roles (banner, alert, progressbar, etc.)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed

### Install & Run

```bash
# Clone or download the project
cd nidhi-rpg-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

### Preview Production Build

```bash
npm run preview
```


## 📄 License

MIT — feel free to fork and customize for your own portfolio!

---

Built with ❤️ by **Nidhi Agarwal** — Full Stack Software Engineer

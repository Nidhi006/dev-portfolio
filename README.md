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

## 📁 Project Structure

```
nidhi-rpg-portfolio/
├── public/
│   └── favicon.svg              # Emoji favicon
├── src/
│   ├── data/
│   │   ├── gameData.js          # Zones, achievements, levels, collision, eggs, NPCs
│   │   └── portfolioData.js     # Skills, experience, projects, certifications
│   ├── hooks/
│   │   └── useSound.js          # Web Audio API sound effect system
│   ├── styles/
│   │   └── global.css           # All animations, accessibility, responsive rules
│   ├── App.jsx                  # Main application (all components)
│   └── main.jsx                 # React entry point
├── index.html                   # HTML with SEO meta tags & Open Graph
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

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

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Framework: **Vite** (auto-detected)
4. Deploy — done!

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to gh-pages branch
```

## 🎯 Customizing Content

### Update Your Info
Edit `src/data/portfolioData.js`:
- **Skills** — add/remove skills, change levels (1-5)
- **Experience** — update roles, companies, highlights
- **Projects** — add new quest cards
- **Certifications** — add new treasure chests

### Update Game Settings
Edit `src/data/gameData.js`:
- **Zones** — change positions, names, colors
- **Achievements** — add new achievements with XP rewards
- **Easter Eggs** — change positions and messages
- **NPCs** — add dialogue and positions

### Contact Form
The tavern's "Send a Raven" form currently opens a mailto: link. To add a real form backend:

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a form endpoint
3. In `App.jsx`, find the tavern section and replace the button's onClick with:
```js
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 6 |
| Styling | Inline styles + CSS animations |
| Sound | Web Audio API (no external files) |
| Icons | Native emoji |
| Fonts | Silkscreen (headings) + Nunito (body) |
| Charts | Custom SVG radar chart |

## 📄 License

MIT — feel free to fork and customize for your own portfolio!

---

Built with ❤️ by **Nidhi Agarwal** — Full Stack Software Engineer

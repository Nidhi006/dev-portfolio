// ═══════════════════════════════════════════════════
// Game Configuration & World Data
// ═══════════════════════════════════════════════════

export const ZONES = [
  { id: "profile", name: "Starting Village", subtitle: "Character Profile", x: 50, y: 48, icon: "🏠", color: "#E8976F", description: "Learn about the adventurer behind the code", terrain: "village" },
  { id: "skills", name: "Skills Forest", subtitle: "Tech Arsenal", x: 22, y: 25, icon: "🌳", color: "#5BAE6E", description: "Discover the enchanted skill trees", terrain: "forest" },
  { id: "guild", name: "Guild Hall", subtitle: "Work Experience", x: 78, y: 22, icon: "🏰", color: "#7B8EC2", description: "Explore the halls of past conquests", terrain: "castle" },
  { id: "quests", name: "Quest Board", subtitle: "Projects", x: 28, y: 72, icon: "📜", color: "#D4A853", description: "Review completed quests and missions", terrain: "town" },
  { id: "treasure", name: "Treasure Cave", subtitle: "Certifications", x: 75, y: 73, icon: "💎", color: "#C47ED0", description: "Unlock the treasure of achievements", terrain: "cave" },
  { id: "tavern", name: "The Tavern", subtitle: "Contact & Hire", x: 50, y: 88, icon: "🍺", color: "#E07B5A", description: "Meet the adventurer & send a raven", terrain: "tavern" },
];

export const ACHIEVEMENTS = [
  { id: "first_step", name: "First Steps", desc: "Entered the realm", xp: 20, icon: "👣" },
  { id: "explorer", name: "Explorer", desc: "Visited 3 zones", xp: 50, icon: "🧭" },
  { id: "cartographer", name: "Cartographer", desc: "Visited all 6 zones", xp: 100, icon: "🗺️" },
  { id: "egg_hunter", name: "Egg Hunter", desc: "Found a hidden Easter egg", xp: 75, icon: "🥚" },
  { id: "egg_master", name: "Egg Master", desc: "Found all Easter eggs", xp: 150, icon: "🏆" },
  { id: "speedster", name: "Speedster", desc: "Used sprint for the first time", xp: 30, icon: "💨" },
  { id: "wanderer", name: "Wanderer", desc: "Traveled 50 steps", xp: 40, icon: "🥾" },
  { id: "skill_seeker", name: "Skill Seeker", desc: "Browsed all skill categories", xp: 35, icon: "🔍" },
  { id: "quest_reader", name: "Quest Reader", desc: "Read all project details", xp: 40, icon: "📖" },
  { id: "treasure_hunter", name: "Treasure Hunter", desc: "Opened all treasure chests", xp: 50, icon: "💰" },
  { id: "social_butterfly", name: "Social Butterfly", desc: "Sent a raven from the tavern", xp: 30, icon: "🕊️" },
  { id: "true_ally", name: "True Ally", desc: "Reached max level", xp: 0, icon: "⭐" },
];

export const LEVELS = [
  { name: "Visitor", xp: 0 },
  { name: "Curious", xp: 50 },
  { name: "Explorer", xp: 150 },
  { name: "Adventurer", xp: 300 },
  { name: "Champion", xp: 500 },
  { name: "True Ally", xp: 750 },
];

export const COLLISION_RECTS = [
  { x1: 0, y1: 0, x2: 12, y2: 18 },
  { x1: 88, y1: 0, x2: 100, y2: 16 },
  { x1: 68, y1: 55, x2: 82, y2: 65 },
  { x1: 0, y1: 35, x2: 4, y2: 70 },
  { x1: 92, y1: 82, x2: 100, y2: 100 },
];

export const EASTER_EGGS = [
  { id: "cloud", x: 92, y: 10, icon: "☁️", message: "You found the Cloud of Knowledge!" },
  { id: "star", x: 6, y: 90, icon: "⭐", message: "A fallen star! +75 XP" },
  { id: "gem", x: 50, y: 8, icon: "💫", message: "The Northern Sparkle!" },
  { id: "mushroom", x: 10, y: 55, icon: "🍄", message: "A magic mushroom! Not that kind..." },
  { id: "scroll", x: 42, y: 35, icon: "📖", message: "An ancient scroll of .NET wisdom!" },
  { id: "fairy", x: 62, y: 42, icon: "🧚", message: "A code fairy blesses your debugging!" },
];

export const MAP_NPCS = [
  { x: 36, y: 38, icon: "🧝", message: "The Skills Forest holds ancient knowledge..." },
  { x: 65, y: 38, icon: "🧙", message: "The Guild Hall walls tell tales of great quests..." },
  { x: 50, y: 62, icon: "🦊", message: "Psst... there are hidden treasures on this map!" },
];

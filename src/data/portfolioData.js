// ═══════════════════════════════════════════════════
// Portfolio Content Data
// ═══════════════════════════════════════════════════

export const SKILLS_DATA = {
  backend: {
    name: "Backend", icon: "⚔️", color: "#E85D4A",
    skills: [
      { name: "C#", level: 5, desc: "Primary language for enterprise apps" },
      { name: ".NET", level: 5, desc: "Microservices & web APIs" },
      { name: "MVC", level: 4, desc: "Web application framework" },
      { name: "Entity Framework", level: 4, desc: "ORM & data access" },
      { name: "REST APIs", level: 5, desc: "API design & development" },
      { name: "Microservices", level: 4, desc: "Distributed architecture" },
      { name: "Java", level: 3, desc: "Foundational knowledge" },
      { name: "SOLID Principles", level: 4, desc: "Clean architecture patterns" },
    ],
  },
  frontend: {
    name: "Frontend", icon: "🛡️", color: "#4A90D9",
    skills: [
      { name: "React", level: 4, desc: "Component-based UIs" },
      { name: "JavaScript ES6", level: 4, desc: "Modern JS patterns" },
      { name: "HTML5/CSS3", level: 5, desc: "Semantic web & styling" },
      { name: "Tailwind", level: 3, desc: "Utility-first CSS" },
      { name: "Bootstrap 5", level: 4, desc: "Responsive framework" },
      { name: "jQuery", level: 4, desc: "DOM manipulation" },
    ],
  },
  database: {
    name: "Database", icon: "📦", color: "#D4A853",
    skills: [
      { name: "SQL Server", level: 5, desc: "Enterprise database" },
      { name: "T-SQL", level: 4, desc: "Advanced queries & procedures" },
      { name: "Stored Procedures", level: 4, desc: "Server-side logic" },
      { name: "Query Optimization", level: 4, desc: "70% perf improvement achieved" },
      { name: "MySQL", level: 3, desc: "Open-source RDBMS" },
      { name: "PostgreSQL", level: 2, desc: "Learning advanced features" },
    ],
  },
  tools: {
    name: "Tools & DevOps", icon: "🔧", color: "#7B8EC2",
    skills: [
      { name: "Git", level: 4, desc: "Version control & branching" },
      { name: "Azure DevOps", level: 4, desc: "CI/CD & sprint management" },
      { name: "Docker", level: 3, desc: "Containerization" },
      { name: "CI/CD", level: 3, desc: "Automated pipelines" },
      { name: "Postman", level: 4, desc: "API testing" },
      { name: "Agile/Scrum", level: 5, desc: "Sprint planning & delivery" },
    ],
  },
  ai: {
    name: "AI & Modern", icon: "✨", color: "#C47ED0",
    skills: [
      { name: "GitHub Copilot", level: 4, desc: "AI-assisted development" },
      { name: "Prompt Engineering", level: 3, desc: "Effective AI prompting" },
      { name: "Claude Code", level: 3, desc: "Agentic coding workflows" },
      { name: "MCP Servers", level: 3, desc: "Model Context Protocol" },
    ],
  },
};

export const EXPERIENCE_DATA = [
  {
    role: "Software Engineer II", company: "Mitratech India LLP",
    period: "Jun 2024 – Present", type: "Remote",
    highlights: [
      "Designed secure MFA & SSO modules (OAuth, JWT)",
      "Integrated AI-powered summarization features",
      "Microservices with C#, .NET, React, Clean Architecture",
      "Owned end-to-end feature lifecycle",
    ],
    tech: ["C#", ".NET", "React", "SQL", "OAuth", "JWT"],
    badge: "🛡️ Senior Knight", rank: 5,
  },
  {
    role: "Associate Software Developer", company: "Gulf Asia Engineering – RP Group",
    period: "Jul 2023 – Jun 2024", type: "Chennai",
    highlights: [
      "Built TROO Note ERP platform",
      "Modular dashboards for real-time tracking",
      "Optimized SQL queries – 70% performance boost",
      "RESTful APIs with .NET Core & MVC",
    ],
    tech: [".NET Core", "MVC", "SQL Server", "jQuery"],
    badge: "⚔️ Warrior", rank: 4,
  },
  {
    role: "Graduate Trainee", company: "Movate Technologies",
    period: "Jul 2022 – Jul 2023", type: "Chennai", 
    highlights: [
      "Enterprise apps with .NET, MVC, C#, REST API",
      "Agile sprints via Azure DevOps",
      "Root cause analysis & production fixes",
    ],
    tech: [".NET", "C#", "REST API", "Azure DevOps"],
    badge: "🗡️ Apprentice", rank: 3,
  },
  {
    role: "Intern – Full Stack Developer", company: "Movate Technologies",
    period: "Jan 2022 – Jun 2022", type: "Chennai", 
    highlights: [
      "Full-stack components with C#, .NET MVC, SQL",
      "RESTful APIs & UI features",
      "Agile/Scrum team participation",
    ],
    tech: ["C#", ".NET MVC", "SQL", "JS"],
    badge: "📜 Recruit", rank: 2,
  },
  {
    role: "Intern – Robotics Developer", company: "YAGEN Robotics",
    period: "Sep 2020 – Nov 2020", type: "Chennai", 
    highlights: [
      "COVID-19 disinfectant spraying robot",
      "Arduino microcontroller programming",
      "Hardware-software integration",
    ],
    tech: ["Arduino", "C++", "Robotics"],
    badge: "🔩 Tinkerer", rank: 1,
  },
];

export const PROJECTS_DATA = [
  {
    name: "Customer Care Registration", org: "VMware Tanzu",
    difficulty: 4, icon: "🐳",
    desc: "Containerized customer complaint management system using Python Flask and MySQL with Docker deployment.",
    tech: ["Python", "Flask", "MySQL", "Docker"],
    status: "Completed", link: "https://github.com/Nidhi006/MyProject/tree/main/customerCareRegistry_App", year: "2022",
  },
  {
    name: "JavaScript & React.js Projects", org: "Shape AI",
    difficulty: 3, icon: "⚛️",
    desc: "Web development projects exploring modern JavaScript and React.js patterns.",
    tech: ["JavaScript", "React.js"],
    status: "Completed", link: "https://github.com/Nidhi006/ShapeAI_Bootcamp_JavascriptAndReactjs", year: "2021",
  },
  {
    name: "AI Summarization Module", org: "",
    difficulty: 4, icon: "🤖",
    desc: "AI-powered summarization features integrated into enterprise product for enhanced user productivity.",
    tech: ["C#", ".NET", "React", "AI/ML"],
    status: "Completed", link: null, year: "2026",
  },
    {
    name: "Disinfectant Spraying bot", org: "Yagen Robotics",
    difficulty: 4, icon: "🤖",
    desc: "COVID-19 disinfectant spraying robot built with Arduino, featuring hardware-software integration for autonomous operation.",
    tech: ["Arduino", "C++", "Robotics"],
    status: "Completed", link: null, year: "2020",
     imageId: "bot",
  },
   {
    name: "Coming Soon...", org: "",
    difficulty: 0, icon: "🚧",
    desc: "A new quest is being crafted. Stay tuned for the next adventure!",
    tech: [],
    status: "Coming Soon", link: null, year: "",
  },

];

export const CERTS_DATA = [
   { name: "Claude Code 101", org: "Anthropic", icon: "🤖", desc: "Claude AI coding certification", color: "#6DB33F" },
  { name: "Microsoft Azure AI 900", org: "Microsoft", icon: "☁️", desc: "Azure cloud platform & AI technologies certification", color: "#0078D4" },
  { name: "VMware Tanzu", org: "VMware", icon: "🐳", desc: "Cloud-native application development & containerization", color: "#6DB33F" },
  { name: "BCA – CGPA 9.11/10", org: "University of Madras", icon: "🎓", desc: "Bachelor of Computer Application – Shri Shankarlal Sundarbai Shasun Jain College", color: "#8B6914" },
];

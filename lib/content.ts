/** Everything here comes from the GitHub profile README / repos of @ayeshamashiat. */

export const LINKS = {
  github: "https://github.com/ayeshamashiat",
  linkedin: "https://www.linkedin.com/in/ayesha-mashiat-89915429a/",
  devto: "https://dev.to/ayeshamashiat",
  facebook: "https://www.facebook.com/ayesha.mashiat",
  instagram: "https://instagram.com/_.ayshiat._",
};

export interface Project {
  id: string;
  title: string;
  tagline: string;
  itch: string;
  trick: string;
  receipt: { value: string; label: string };
  stack: string[];
  repo: string;
  live?: string;
}

/** Each project is told as a mini case file: the itch, the trick, the receipt. */
export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Bouncer",
    tagline: "A doorman for AI agents",
    itch: "Agents install third-party skills on trust. Blocklists only know yesterday's villains.",
    trick: "Treat accounts, domains, IPs and payloads as a graph. The closer a skill sits to known malware, the harder the door.",
    receipt: { value: "92%", label: "of hidden malware caught, where a plain blocklist caught none" },
    stack: ["FastAPI", "FalkorDB", "React", "Cytoscape.js", "MCP"],
    repo: "https://github.com/ayeshamashiat/Bouncer",
  },
  {
    id: "02",
    title: "Touch Grass, Babu",
    tagline: "Guilt-tripping as a service",
    itch: "Doomscrolling doesn't stop when an app politely asks.",
    trick: "A small fine-tuned model lives on the phone and plays a disappointed mother. The app locks until a photo proves you saw sky and grass.",
    receipt: { value: "0", label: "internet permissions: the whole thing runs offline" },
    stack: ["Kotlin", "llama.cpp", "LoRA", "GGUF", "ML Kit"],
    repo: "https://github.com/ayeshamashiat/Touch-Grass-Babu",
    live: "https://touch-grass-babu.onrender.com",
  },
  {
    id: "03",
    title: "PetniHunter",
    tagline: "A lie detector for a Bangla LLM",
    itch: "Ask a small model about a book that never existed and it will happily invent a plot.",
    trick: "Break the question into an entity and a property, verify against Wikidata and Bangla Wikipedia, and refuse or redirect when the facts don't line up.",
    receipt: { value: "91.9", label: "F-score, with almost no false accepts" },
    stack: ["Python", "Qwen3.5-4B", "Wikidata"],
    repo: "https://github.com/ayeshamashiat/PetniHunter",
  },
  {
    id: "04",
    title: "AgriSense",
    tagline: "An agronomist in a farmer's pocket",
    itch: "Smallholder farmers in Bangladesh make big calls on weather, water and pests with little data.",
    trick: "An agent that leans on tools for every number and uses the LLM only to explain. It speaks Bengali, listens by voice, and admits its uncertainty.",
    receipt: { value: "6", label: "tools wired in: weather, finance, irrigation, pests, market, disease" },
    stack: ["FastAPI", "ChromaDB", "RAG", "React", "Web Speech API"],
    repo: "https://github.com/ayeshamashiat/CommittedToConflict_AgriSense",
  },
];

export const OLDER_WORK = [
  { name: "CareerPilot", note: "RAG career coach", href: "https://github.com/ayeshamashiat/CareerPilor_CodeSprint" },
  { name: "Jobscape", note: "recruitment backend", href: "https://github.com/ayeshamashiat/Jobscape_Backend" },
  { name: "PAMS", note: "thesis workflow, RBAC", href: "https://github.com/ayeshamashiat/PAMS_Backend" },
  { name: "Portfolio Auditor", note: "audits GitHub profiles", href: "https://ai-powered-portfolio-auditor.vercel.app" },
  { name: "CalorieAdventure", note: "a JavaFX cat game", href: "https://github.com/ayeshamashiat/CalorieAdventureGame" },
];

export interface Role {
  org: string;
  role: string;
  kind: "internship" | "education";
  when: string;
  where: string;
  bullets: string[];
}

// Sourced from the CV in /public.
export const EXPERIENCE: Role[] = [
  {
    org: "RedDot Digital Limited",
    role: "Software Engineering Intern",
    kind: "internship",
    when: "Sep 2026 – Present",
    where: "Dhaka",
    bullets: [
      "Interning in the ESD Division, contributing to the Smart ECRM project for Smart Cambodia.",
      "Gaining hands-on experience in software engineering and real-world business applications under a Lead Software Engineer.",
    ],
  },
  {
    org: "Islamic University of Technology",
    role: "B.Sc. in Software Engineering",
    kind: "education",
    when: "Expected 2027",
    where: "Gazipur",
    bullets: [],
  },
];

export const TOOLBOX = [
  { name: "Languages", items: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "Kotlin", "C++"] },
  { name: "Backend", items: ["FastAPI", "Node.js", "Express", "NestJS", "Flask", "SQLAlchemy"] },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "ChromaDB", "FalkorDB"] },
  { name: "ML & AI", items: ["NumPy", "scikit-learn", "spaCy", "Sentence Transformers", "llama.cpp", "LoRA"] },
  { name: "Ship it", items: ["Docker", "AWS", "Nginx", "GitHub Actions", "Git"] },
  { name: "Frontend", items: ["React", "Next.js", "Tailwind", "Cytoscape.js"] },
];

export const PODIUM = [
  { place: "Top 100", event: "Solvio AI Hackathon", year: "2025", note: "Team #336", cert: "/resources/Achievement/SOLVIO_Top100_Certificate_Team_336.png" },
  { place: "Finalist", event: "CodeSprint Inter-University Hackathon", year: "2026", note: "top 14 of 50 finalists" },
  { place: "Finalist", event: "SUST CSE Carnival Codex Community Hackathon", year: "2026", note: "top 50 of 450+ submissions" },
  { place: "Finalist", event: "IUT 12th ICT Fest", year: "2026", note: "top 20 of 700+ submissions" },
];

// Set to a public address to enable the "send by email" option on the contact card.
export const CONTACT_EMAIL = "ayesha.mashiat019@gmail.com";

export const STARTERS = [
  "How would you stop a malicious AI skill from ever being installed?",
  "What would you fine-tune a 4B model to do?",
  "Convince me tea beats coffee.",
  "What are you building that's slightly out of your depth?",
  "Which niche fact are you annoyingly proud of knowing?",
  "Teach me one thing about databases I'll still remember next week.",
];

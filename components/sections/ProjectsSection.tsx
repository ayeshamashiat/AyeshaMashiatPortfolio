"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Globe, X, ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

/* ─── Data ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    title: "Jobscape",
    fullTitle: "Jobscape Recruitment Backend",
    description:
      "A secure, resilient infrastructure powering a modern recruitment platform — automated transactional notifications, optimised DB interactions, and airtight rollback logic.",
    techStack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
    github: "https://github.com/ayeshamashiat/Jobscape_Backend",
    live: "#",
    image: "/jobscape_preview.png",
    accent: "#6366f1",
    scribble: "backend magic ✦",
    ruling: "#6366f120",
    details: {
      overview:
        "Jobscape Backend was built to handle high-frequency candidate applications and recruiter actions. The system uses event-driven architectures to process automated transactions and notifications, with double-fetch protection on registration and email verification channels.",
      features: [
        "Event-driven notifications for transactional communication.",
        "Double-fetch resilient authentication logic.",
        "Database rollback systems preventing stale user records on failure.",
        "Query optimisations reducing read times by 35% on high-load endpoints.",
      ],
    },
  },
  {
    id: "02",
    title: "CalorieAdventure",
    fullTitle: "Calorie Adventure Game",
    description:
      "An offline 2D arcade game in vanilla Java. A cat navigates platforms collecting healthy food, with custom collision physics and flat-file score persistence — running at a silky 60 FPS.",
    techStack: ["Java", "Swing/AWT", "File I/O"],
    github: "https://github.com/ayeshamashiat/CalorieAdventureGame",
    live: "#",
    image: "/calorie_adventure_preview.png",
    accent: "#a855f7",
    scribble: "60 fps purr-fect 🐱",
    ruling: "#a855f720",
    video: "/resources/CalorieAdventureGame/CalorieAdventureGame.mp4",
    screenshots: [
      "/resources/CalorieAdventureGame/screenshot1.png",
      "/resources/CalorieAdventureGame/screenshot2.png",
      "/resources/CalorieAdventureGame/screenshot3.png",
    ],
    details: {
      overview:
        "Calorie Adventure is an offline 2D arcade game built in vanilla Java. Players control a cat navigating dynamic platform loops to collect healthy items. Features custom pixel collision detection and flat-file systems for persistent local scores.",
      features: [
        "Custom game loop running at a stable 60 FPS.",
        "Custom box-collision and intersection physics.",
        "Robust flat-file reader/writer for scoring history.",
        "Modular rendering architecture separating logic from draw ops.",
      ],
    },
  },
  {
    id: "03",
    title: "KindleHope",
    fullTitle: "Kindle Hope — Charity Platform",
    description:
      "A full-stack donation platform bridging philanthropists with causes. Real-time fund tracking, secure payment gateway, and a transparent ledger that shows donors exactly where their money goes.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/adrita06/Kindle_Hope",
    live: "#",
    image: "/kindle_hope_preview.png",
    accent: "#f59e0b",
    scribble: "giving back 💛",
    ruling: "#f59e0b20",
    details: {
      overview:
        "Kindle Hope bridges philanthropists and meaningful causes. Seamless donation flows, real-time campaign progress tracking, and a user dashboard for managing contribution history and impact metrics.",
      features: [
        "Secure and seamless payment integration for donations.",
        "Real-time progress tracking for charitable campaigns.",
        "User dashboard for contribution history and impact metrics.",
        "Responsive, accessible UI designed for trust and engagement.",
      ],
    },
  },
  {
    id: "04",
    title: "CareerPilot",
    fullTitle: "CareerPilot — AI CV Tailor",
    description:
      "RAG-powered agentic career co-pilot. Parses your CV against a job description, optimises keywords, structures layout, and persists every tailored version so you never start from scratch.",
    techStack: ["React", "FastAPI", "ChromaDB", "MongoDB", "Groq LLaMA"],
    github: "https://github.com/ayeshamashiat/CareerPilor_CodeSprint",
    live: "#",
    image: "/career_pilot_preview.png",
    accent: "#10b981",
    scribble: "RAG-powered 🤖",
    ruling: "#10b98120",
    video: "https://www.youtube.com/watch?v=_xa97LQYlAM",
    screenshots: [],
    details: {
      overview:
        "CareerPilot matches your resume against targeted job descriptions, automating keyword optimisation and layout structuring while storing tailored versions in a secure, persistent MongoDB database.",
      features: [
        "AI-driven CV parsing and keyword optimisation algorithms.",
        "Persistent CV storage and detailed tailored CV history.",
        "Cloudinary integration for secure file uploads.",
        "Side-by-side job description comparison interface.",
      ],
    },
  },
];

/* ─── YouTube helper ──────────────────────────────────────────── */
function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

/* ─── Ruled lines on card (notebook paper feel) ───────────────── */
function RuledLines({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]" aria-hidden>
      {[38, 58, 78, 98, 118, 138, 158, 178, 198, 218, 238, 258, 278, 298, 318, 338].map((y) => (
        <div
          key={y}
          className="absolute left-0 right-0 h-px"
          style={{ top: y, background: color }}
        />
      ))}
    </div>
  );
}

/* ─── Washi tape ──────────────────────────────────────────────── */
function WashiTape({ accent, rotate = -1.5 }: { accent: string; rotate?: number }) {
  return (
    <div
      className="absolute -top-4 left-1/2 w-28 h-7 z-50 pointer-events-none"
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background: accent + "25",
          border: `1.5px dashed ${accent}55`,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${accent}50 0px, transparent 1px, transparent 5px)`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Per-card pin doodle ─────────────────────────────────────── */
function PinDoodle({ accent }: { accent: string }) {
  return (
    <div className="absolute -top-3 right-10 z-50 pointer-events-none">
      <svg width="18" height="32" viewBox="0 0 18 32" fill="none">
        <circle cx="9" cy="7" r="6" fill={accent} opacity="0.85" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="7" r="2.5" fill="white" opacity="0.4" />
        <line x1="9" y1="13" x2="9" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ─── Sketchy corner fold ─────────────────────────────────────── */
function CornerFold({ accent }: { accent: string }) {
  return (
    <div className="absolute bottom-0 right-0 pointer-events-none z-10">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M36 36 L36 18 L18 36 Z" fill={accent} opacity="0.15" />
        <path d="M18 36 L36 18" stroke={accent} strokeWidth="1.2" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ─── Swipe direction indicator ───────────────────────────────── */
function SwipeIndicator({ dragX }: { dragX: ReturnType<typeof useMotionValue<number>> }) {
  const leftOpacity = useTransform(dragX, [-160, -40, 0], [1, 0, 0]);
  const rightOpacity = useTransform(dragX, [0, 40, 160], [0, 0, 1]);
  const leftScale = useTransform(dragX, [-160, -40], [1.2, 0.8]);
  const rightScale = useTransform(dragX, [40, 160], [0.8, 1.2]);

  return (
    <>
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 font-display font-bold text-sm px-3 py-1 rounded-md border-2 border-red-400 text-red-400 bg-background/80 backdrop-blur-sm pointer-events-none"
        style={{ opacity: leftOpacity, scale: leftScale }}
      >
        ← skip
      </motion.div>
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 font-display font-bold text-sm px-3 py-1 rounded-md border-2 border-green-500 text-green-500 bg-background/80 backdrop-blur-sm pointer-events-none"
        style={{ opacity: rightOpacity, scale: rightScale }}
      >
        next →
      </motion.div>
    </>
  );
}

/* ─── Media Gallery (in modal) ────────────────────────────────── */
function MediaGallery({ video, screenshots, title }: { video?: string; screenshots?: string[]; title: string }) {
  const [tab, setTab] = useState<"video" | "screenshots">(video ? "video" : "screenshots");
  const [shot, setShot] = useState(0);
  const hasBoth = !!video && !!screenshots?.length;

  return (
    <div className="space-y-3">
      {hasBoth && (
        <div className="flex gap-2 font-display">
          {[{ k: "video", label: "▶ Demo" }, { k: "screenshots", label: `📸 Screens (${screenshots!.length})` }].map(({ k, label }) => (
            <button key={k} onClick={() => setTab(k as "video" | "screenshots")}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all border cursor-pointer ${tab === k ? "bg-foreground text-background border-foreground" : "bg-background border-foreground/20 text-muted-foreground hover:text-foreground"}`}>
              {label}
            </button>
          ))}
        </div>
      )}
      {tab === "video" && video && (
        <div className="relative rounded-xl overflow-hidden border border-foreground/20">
          {getYouTubeEmbedUrl(video)
            ? <iframe src={getYouTubeEmbedUrl(video)!} className="w-full aspect-video" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            : <video src={video} controls className="w-full aspect-video object-cover" />}
        </div>
      )}
      {tab === "screenshots" && screenshots && screenshots.length > 0 && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-foreground/20">
            <img loading="lazy" decoding="async" src={screenshots[shot]} alt={`${title} ${shot + 1}`} className="w-full aspect-video object-cover" />
            {screenshots.length > 1 && (
              <>
                <button onClick={() => setShot(p => (p - 1 + screenshots.length) % screenshots.length)} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background border border-foreground/30 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setShot(p => (p + 1) % screenshots.length)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background border border-foreground/30 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
              </>
            )}
          </div>
          {screenshots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {screenshots.map((src, i) => (
                <button key={i} onClick={() => setShot(i)} className={`shrink-0 w-20 aspect-video rounded overflow-hidden border cursor-pointer transition-all ${i === shot ? "border-foreground" : "border-foreground/20 opacity-50 hover:opacity-100"}`}>
                  <img loading="lazy" decoding="async" src={src} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Single draggable card ───────────────────────────────────── */
function ProjectCard({
  project,
  stackPos,
  isActive,
  isSwiped,
  onSwipe,
  onTap,
}: {
  project: typeof PROJECTS[0];
  stackPos: number;
  isActive: boolean;
  isSwiped: boolean;
  onSwipe: () => void;
  onTap: () => void;
}) {
  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-300, 0, 300], [-18, 0, 18]);
  const cardOpacity = useTransform(dragX, [-200, 0, 200], [0.7, 1, 0.7]);

  // deterministic per-card resting tilt
  const n = parseInt(project.id, 10);
  const restRot = ((n * 41) % 9) - 4.5;
  const restX   = ((n * 29) % 12) - 6;

  const variants = {
    active:  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 40 },
    behind:  { x: restX, y: stackPos * 14, rotate: restRot, scale: 1 - stackPos * 0.045, opacity: stackPos > 2 ? 0 : 1, zIndex: 40 - stackPos },
    swiped:  { x: n % 2 === 0 ? -900 : 900, y: 100, rotate: n % 2 === 0 ? -30 : 30, scale: 0.85, opacity: 0, zIndex: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="behind"
      animate={isSwiped ? "swiped" : isActive ? "active" : "behind"}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      style={{
        position: "absolute",
        inset: 0,
        cursor: isActive ? "grab" : "default",
        rotate: isActive ? rotate : undefined,
        x: isActive ? dragX : undefined,
        opacity: isActive ? cardOpacity : undefined,
      }}
      onDrag={(_, info) => dragX.set(info.offset.x)}
      onDragEnd={(_, info) => {
        dragX.set(0);
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) onSwipe();
      }}
      onTap={() => isActive && onTap()}
      whileDrag={{ cursor: "grabbing" }}
    >
      {/* Tape / Pin decoration */}
      {isActive && (n % 2 === 0 ? <WashiTape accent={project.accent} /> : <PinDoodle accent={project.accent} />)}

      {/* Card body */}
      <div
        className="relative w-full h-full bg-card-bg border-[2.5px] border-foreground overflow-hidden select-none"
        style={{
          borderRadius: "var(--doodle-radius)",
          boxShadow: isActive ? "5px 6px 0 0 currentColor" : "3px 4px 0 0 currentColor",
        }}
      >
        {/* Ruled lines */}
        <RuledLines color={project.ruling} />

        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: project.accent, opacity: 0.6 }} />

        {/* Image panel — top half */}
        <div className="relative h-[52%] overflow-hidden border-b-[2px] border-dashed border-foreground/20">
          <img loading="lazy" decoding="async" src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30" />

          {/* Big project number watermark */}
          <span className="absolute bottom-2 left-3 font-display font-bold text-5xl leading-none select-none" style={{ color: project.accent, opacity: 0.3 }}>
            {project.id}
          </span>

          {/* Swipe indicators */}
          {isActive && <SwipeIndicator dragX={dragX} />}
        </div>

        {/* Content — bottom half */}
        <div className="p-5 pt-4 flex flex-col gap-3 h-[48%]">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display text-xl font-bold text-foreground leading-tight">{project.fullTitle}</h4>
            <span className="font-display text-[10px] font-bold text-muted-foreground/60 shrink-0 mt-1 rotate-[-1deg]" style={{ color: project.accent, opacity: 0.7 }}>
              {project.scribble}
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.techStack.map(t => (
              <span key={t} className="px-2 py-0.5 font-display text-[9px] font-bold uppercase tracking-wide text-muted-foreground border border-dashed border-foreground/25 rounded-sm bg-background">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Corner fold */}
        <CornerFold accent={project.accent} />

        {/* Tap hint */}
        {isActive && (
          <div className="absolute bottom-3 right-9 font-display text-[9px] font-bold text-muted-foreground/50 rotate-[1deg] pointer-events-none">
            tap to expand ↗
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  const advance = () => setCurrent(p => Math.min(p + 1, PROJECTS.length));
  const back    = () => setCurrent(p => Math.max(p - 1, 0));
  const reset   = () => setCurrent(0);

  const done = current >= PROJECTS.length;
  const activeProject = done ? null : PROJECTS[current];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">

      {/* ── Full-width two-column layout ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start min-h-[680px]">

        {/* ── LEFT: info panel ── */}
        <div className="flex flex-col justify-between h-full lg:py-6">

          {/* Header */}
          <AnimatedSection>
            <p className="text-sm uppercase tracking-[0.25em] text-primary mb-3 font-bold font-display">
              03 / Case Studies
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground font-display leading-tight mb-6">
              Selected<br />Projects
            </h2>
          </AnimatedSection>

          {/* Active project info — animates on change */}
          <AnimatePresence mode="wait">
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex-1 flex flex-col gap-6 mt-8"
              >
                {/* Big numbered title */}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-7xl font-bold leading-none" style={{ color: activeProject.accent, opacity: 0.18 }}>
                    {activeProject.id}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {activeProject.fullTitle}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  {activeProject.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map(t => (
                    <span key={t} className="px-3 py-1.5 font-display text-xs font-bold border border-foreground/25 bg-background text-muted-foreground rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 flex-wrap">
                  <a href={activeProject.github} target="_blank" rel="noreferrer"
                    className="doodle-button px-4 py-2.5 text-sm font-bold font-display text-foreground flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    GitHub
                  </a>
                  <button onClick={() => setSelected(activeProject)}
                    className="doodle-button px-4 py-2.5 text-sm font-bold font-display text-foreground flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors cursor-pointer">
                    Full Details
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-start justify-center gap-4 mt-8"
              >
                <span className="text-5xl">🎉</span>
                <h3 className="font-display text-2xl font-bold text-foreground">All projects browsed!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">You flipped through every project. Reset the stack to start again.</p>
                <button onClick={reset} className="doodle-button px-5 py-2.5 font-display font-bold text-sm text-foreground cursor-pointer">
                  ↺ Reset Stack
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="mt-10 flex flex-col gap-4">
            {/* Pip row */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Project ${i + 1}`} className="cursor-pointer">
                  <div className={`transition-all duration-300 rounded-full border ${
                    i === current
                      ? "w-7 h-2.5 border-foreground bg-foreground"
                      : i < current
                      ? "w-2.5 h-2.5 border-foreground/40 bg-foreground/25"
                      : "w-2.5 h-2.5 border-foreground/20 bg-transparent hover:border-foreground/50"
                  }`} />
                </button>
              ))}
              <span className="ml-2 font-display text-xs font-bold text-muted-foreground">
                {Math.min(current + 1, PROJECTS.length)} / {PROJECTS.length}
              </span>
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button onClick={back} disabled={current === 0} aria-label="Previous"
                className={`doodle-button p-2.5 text-foreground transition-all ${current === 0 ? "opacity-25 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={advance} disabled={done} aria-label="Next"
                className={`doodle-button p-2.5 text-foreground transition-all ${done ? "opacity-25 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 ml-1">
                ← drag card to browse →
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: card stack ── */}
        <div className="relative flex items-center justify-center" style={{ minHeight: "560px" }}>
          {/* Shadow layers behind to show depth */}
          {!done && [2, 1].map(depth => (
            <div
              key={depth}
              className="absolute bg-card-bg border-[2.5px] border-foreground/30"
              style={{
                inset: 0,
                borderRadius: "var(--doodle-radius)",
                transform: `translateY(${depth * 12}px) translateX(${((current + depth) * 17 % 9) - 4}px) rotate(${((current + depth) * 41 % 9) - 4.5}deg)`,
                zIndex: 40 - depth,
              }}
            />
          ))}

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            {done ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-card-bg border-[2.5px] border-dashed border-foreground/30 flex flex-col items-center justify-center text-center p-10 z-50"
                style={{ borderRadius: "var(--doodle-radius)" }}
              >
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="mb-5 text-foreground/30">
                  <circle cx="28" cy="28" r="24" />
                  <circle cx="20" cy="22" r="3" fill="currentColor" />
                  <circle cx="36" cy="22" r="3" fill="currentColor" />
                  <path d="M18 36 C22 42, 34 42, 38 36" />
                  {/* Small stars */}
                  <path d="M8 12 L9 9 L10 12 L13 12 L10.5 14 L11.5 17 L9 15 L6.5 17 L7.5 14 L5 12 Z" opacity="0.4" />
                </svg>
                <p className="font-display text-xl font-bold text-foreground mb-2">All done!</p>
                <p className="text-xs text-muted-foreground">Use the reset button on the left to browse again.</p>
              </motion.div>
            ) : (
              PROJECTS.map((project, idx) => {
                if (idx < current || idx - current > 2) return null;
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    stackPos={idx - current}
                    isActive={idx === current}
                    isSwiped={idx < current}
                    onSwipe={advance}
                    onTap={() => setSelected(project)}
                  />
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="doodle-card w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 md:p-10 relative no-scrollbar bg-card-bg"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: selected.accent, opacity: 0.65, borderRadius: "inherit" }} />

              <button onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 rounded-xl border border-foreground/20 hover:border-foreground bg-background text-foreground transition-all cursor-pointer z-10">
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-8">
                {((selected as any).video || (selected as any).screenshots?.length) ? (
                  <MediaGallery video={(selected as any).video} screenshots={(selected as any).screenshots} title={selected.title} />
                ) : (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-foreground/20 bg-muted">
                    <img loading="lazy" decoding="async" src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-5xl font-bold leading-none mt-1" style={{ color: selected.accent, opacity: 0.15 }}>{selected.id}</span>
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">{selected.fullTitle}</h3>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-display">Overview</h5>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{selected.details.overview}</p>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-xs uppercase tracking-[0.25em] text-primary font-bold font-display">Key Features</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selected.details.features.map((f, i) => (
                          <li key={i} className="flex gap-3 text-sm font-bold text-foreground/80 p-4 rounded-xl border border-foreground/15 bg-background font-display">
                            <span className="text-foreground shrink-0">✓</span>{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6 lg:pl-8 lg:border-l border-foreground/10">
                    <div>
                      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold font-display block mb-3">Technologies</span>
                      <div className="flex flex-wrap gap-2">
                        {selected.techStack.map(t => (
                          <span key={t} className="px-3 py-1.5 text-xs font-bold font-display border border-foreground/20 bg-background rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 pt-6 border-t border-foreground/10">
                      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-bold font-display block">Links</span>
                      {[
                        {
                          href: selected.github, label: "GitHub Repository",
                          icon: <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                        },
                        { href: selected.live, label: "Live Demo", icon: <Globe className="w-4 h-4 shrink-0" /> },
                      ].map(({ href, label, icon }) => (
                        <a key={label} href={href} target="_blank" rel="noreferrer"
                          className="flex items-center gap-3 text-sm py-2.5 px-4 rounded-xl border border-foreground/15 hover:border-foreground bg-background hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors group/l">
                          {icon}
                          <span className="font-display font-bold">{label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover/l:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
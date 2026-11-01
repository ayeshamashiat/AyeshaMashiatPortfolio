"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DoodleSearch, DoodleStar } from "@/components/ui/DoodleIcons";
import { motion } from "framer-motion";
import { useState } from "react";

const SKILL_CATEGORIES = [
  {
    name: "Languages & Markup",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++", "SQL", "HTML", "CSS"]
  },
  {
    name: "Backend & Frameworks",
    items: ["Node.js", "Express.js", "FastAPI", "NestJS", "SQLAlchemy", "MERN Stack", "Next.js"]
  },
  {
    name: "Databases & ORM",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle DB", "Mongoose", "Alembic"]
  },
  {
    name: "Auth & Security",
    items: ["JWT", "OAuth2", "bcrypt", "Role-Based Access Control", "Rate Limiting"]
  },
  {
    name: "Cloud & DevOps",
    items: ["AWS", "EC2", "S3", "Lambda", "DynamoDB", "SNS", "SQS", "API Gateway", "Docker", "Nginx", "Celery/Redis"]
  },
  {
    name: "Tools & Utilities",
    items: ["Git", "GitHub", "Postman", "Supabase", "Cloudinary", "APScheduler"]
  }
];

function SpiralRings() {
  return (
    <div className="absolute -top-3.5 left-6 right-6 flex justify-between pointer-events-none z-20">
      {[...Array(6)].map((_, i) => (
        <svg key={i} width="10" height="20" viewBox="0 0 10 20" fill="none" className="text-foreground/80">
          <path 
            d="M5 2 C2 2, 1.5 5, 1.5 9 C1.5 14, 8.5 17, 8.5 10 C8.5 3, 5 2, 5 2" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
          />
        </svg>
      ))}
    </div>
  );
}

export function SkillsSection() {
  const [query, setQuery] = useState("");
  const [circled, setCircled] = useState<Set<string>>(new Set());
  const q = query.trim().toLowerCase();
  const toggle = (item: string) =>
    setCircled((prev) => {
      const next = new Set(prev);
      if (!next.delete(item)) next.add(item);
      return next;
    });

  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 border-y-2 border-foreground/30 bg-card-bg/15 relative overflow-hidden">
      {/* Background doodle star */}
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 25, repeat: 0, ease: "linear" }}
        className="absolute bottom-12 right-12 opacity-35 pointer-events-none"
      >
        <DoodleStar size={36} />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <AnimatedSection>
            <h2 className="text-sm uppercase tracking-[0.25em] text-primary mb-4 font-bold font-display">02 / Toolkit</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">Core Competencies</h3>
          </AnimatedSection>
          
          {/* Custom Search bar decoration from the reference image */}
          <AnimatedSection delay={0.2} className="w-full max-w-[260px] self-start md:self-auto">
            <DoodleSearch value={query} onChange={setQuery} placeholder="Search skills..." />
          </AnimatedSection>
        </div>

        <p className="-mt-8 mb-10 text-sm text-muted-foreground font-display">
          {circled.size === 0
            ? "psst: tap any skill to circle it ✎"
            : circled.size < 5
              ? `${circled.size} circled, keep going…`
              : <>{circled.size} circled: great taste. <a href="#contact" className="underline decoration-wavy text-foreground">let&apos;s talk</a></>}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SKILL_CATEGORIES.map((category, index) => (
            <AnimatedSection key={category.name} delay={index * 0.08}>
              <div className="h-full doodle-card p-6 pt-8 relative group">
                {/* Spiral notebook rings */}
                <SpiralRings />

                {/* Diagonal hatch details on hover */}

                <h4 className="text-xl font-bold text-foreground mb-6 pb-3 border-b-2 border-dashed border-foreground/15 font-display relative z-10">
                  {category.name}
                </h4>
                
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {category.items.map((item) => {
                    const match = !q || item.toLowerCase().includes(q);
                    const picked = circled.has(item);
                    return (
                      <motion.button
                        key={item}
                        type="button"
                        onClick={() => toggle(item)}
                        aria-pressed={picked}
                        animate={{ opacity: match ? 1 : 0.2, scale: match && q ? 1.06 : 1 }}
                        whileTap={{ scale: 0.88, rotate: -4 }}
                        className={`relative px-3 py-1.5 rounded-full text-xs font-bold border-[1.8px] transition-colors duration-200 font-display ${
                          picked
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background hover:bg-foreground/5 border-foreground/30 hover:border-foreground text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item}
                        {picked && (
                          <svg className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] text-red-500" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                            <path pathLength={1} className="scribble-path" d="M50 3 C85 1, 99 10, 97 22 C95 34, 60 39, 35 37 C8 35, 1 24, 5 14 C9 5, 38 2, 62 4" />
                          </svg>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

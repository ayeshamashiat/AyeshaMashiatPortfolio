"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  DoodleMonitor,
  DoodleCloud,
  DoodleLightBulb,
  DoodleShield,
  DoodleStar,
} from "@/components/ui/DoodleIcons";

export function AboutSection() {
  const VALUES = [
    {
      icon: <DoodleMonitor className="w-6 h-6 text-foreground" />,
      title: "RESTful API Design",
      description: "Building resilient, secure REST APIs with Express.js, Flask, and FastAPI that manage complex business logic and handle high transactional frequency."
    },
    {
      icon: <DoodleCloud className="w-6 h-6 text-foreground" arrow="down" />,
      title: "Database Engineering",
      description: "Designing relational schemas in PostgreSQL/MySQL, writing optimized ORM interactions with SQLAlchemy, and tuning queries to reduce load latency."
    },
    {
      icon: <DoodleLightBulb className="w-6 h-6 text-foreground" />,
      title: "AI-Powered Systems",
      description: "Integrating Large Language Models and building Retrieval-Augmented Generation (RAG) pipelines into backend platforms for tailored intelligent tools."
    },
    {
      icon: <DoodleShield className="w-6 h-6 text-foreground" />,
      title: "DevOps & Security",
      description: "Implementing JWT authentication, role-based access control (RBAC), API rate-limiting, and deploying containerized environments using Docker."
    }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
      {/* Decorative stars near title */}
      <div className="absolute top-28 right-12 opacity-30 pointer-events-none">
        <DoodleStar size={20} />
      </div>

      <AnimatedSection>
        <h2 className="text-xs uppercase tracking-[0.25em] text-primary mb-3 font-bold font-display">01 / Behind the Screen</h2>
        <h3 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-foreground font-display">My Approach to Building</h3>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20">
        <AnimatedSection delay={0.2} className="lg:col-span-6 space-y-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
          <p>
            I'm a full-stack/backend developer and third-year Software Engineering student at Islamic University of Technology (IUT). I design and build secure, scalable backend architectures, database schemas, and robust API layers that power complex modern web applications.
          </p>
          <p>
            From recruitment portals and AI career tailors to transparent charity platforms, my work focuses on ensuring strict data integrity, preventing state synchronization failures, and optimizing database interaction speeds. I believe in clean code, structural stability, and deploying systems that actually work under stress.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUES.map((val) => (
            <div 
              key={val.title}
              className="p-6 doodle-card group relative overflow-hidden"
            >
              {/* Subtle hatch background detail on hover */}
              
              <div className="p-2.5 w-fit border-2 border-foreground/30 rounded-xl bg-background mb-4 relative z-10">
                {val.icon}
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2 font-display relative z-10">{val.title}</h4>
              <p className="text-sm text-muted-foreground font-light leading-relaxed relative z-10">{val.description}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

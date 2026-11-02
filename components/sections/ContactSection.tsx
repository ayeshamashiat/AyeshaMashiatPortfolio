"use client";

import { useState } from "react";
import { ArrowUpRight, Dices, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CvButton } from "@/components/ui/CvButton";
import { DoodleTicTacToe } from "@/components/ui/DoodleTicTacToe";
import { CONTACT_EMAIL, LINKS, STARTERS } from "@/lib/content";

const SOCIALS = [
  { name: "GitHub", href: LINKS.github },
  { name: "DEV", href: LINKS.devto },
  { name: "Instagram", href: LINKS.instagram },
  { name: "Facebook", href: LINKS.facebook },
];

export function ContactSection({ hasCv = false }: { hasCv?: boolean }) {
  const [starter, setStarter] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(STARTERS[0]);
  const [status, setStatus] = useState<"" | "copied" | "failed">("");

  const shuffle = () => {
    const next = (starter + 1 + Math.floor(Math.random() * (STARTERS.length - 1))) % STARTERS.length;
    setStarter(next);
    setMessage(STARTERS[next]);
    setStatus("");
  };

  const fullMessage = () => (name.trim() ? `Hi Ayesha, it's ${name.trim()}. ${message}` : `Hi Ayesha! ${message}`);

  // LinkedIn can't be prefilled, so copy the message and open the profile to paste it.
  const sendLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage());
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.open(LINKS.linkedin, "_blank", "noopener,noreferrer");
  };

  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(fullMessage())}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-12 lg:px-24">
      <SectionHeading index="06" title="Contact" />

      <div className="grid items-start gap-14 lg:grid-cols-2">
        <AnimatedSection>
          <div data-no-doodle className="doodle-card space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Send me a message</h3>
              <button onClick={shuffle} className="inline-flex items-center gap-1.5 font-display text-sm underline decoration-wavy underline-offset-4" aria-label="Try a different conversation starter">
                <Dices className="h-4 w-4" /> new starter
              </button>
            </div>

            <label className="block">
              <span className="font-mono text-xs text-muted-foreground">your name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="optional"
                className="mt-1 w-full border-2 border-foreground/40 bg-background px-3 py-2 outline-none focus:border-foreground"
                style={{ borderRadius: "8px 3px 8px 3px" }}
              />
            </label>

            <label className="block">
              <span className="font-mono text-xs text-muted-foreground">message</span>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setStatus("");
                }}
                rows={4}
                className="mt-1 w-full resize-none border-2 border-foreground/40 bg-background px-3 py-2 outline-none focus:border-foreground"
                style={{ borderRadius: "8px 3px 8px 3px" }}
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={sendLinkedIn} disabled={!message.trim()} className="doodle-button doodle-button-solid gap-1.5 px-5 py-2.5 font-display font-bold disabled:opacity-40">
                Send via LinkedIn <ArrowUpRight className="h-4 w-4" />
              </button>
              {CONTACT_EMAIL && (
                <a href={mailHref} className="doodle-button gap-1.5 px-5 py-2.5 font-display font-bold">
                  <Mail className="h-4 w-4" /> Send via email
                </a>
              )}
            </div>
            {status && (
              <p role="status" className="text-sm text-muted-foreground">
                {status === "copied" ? "Message copied. Paste it into the LinkedIn chat that just opened." : "Couldn't copy automatically. Select the text above and copy it, then message me on LinkedIn."}
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {hasCv && <CvButton />}
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="doodle-button gap-1.5 px-5 py-2.5 font-display font-bold">
                {s.name} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="flex flex-col items-center gap-3">
          <h3 className="font-display text-xl font-bold">Tic-tac-toe</h3>
          <DoodleTicTacToe />
        </AnimatedSection>
      </div>

      <footer className="mt-28 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Ayesha Mashiat</footer>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRight, Dices, Mail } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CvButton } from "@/components/ui/CvButton";
import { CONTACT_EMAIL, LINKS, STARTERS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const SOCIALS = [
  { name: "GitHub", href: LINKS.github },
  { name: "DEV", href: LINKS.devto },
  { name: "Instagram", href: LINKS.instagram },
  { name: "Facebook", href: LINKS.facebook },
];

export function ContactSection({ hasCv = false }: { hasCv?: boolean }) {
  const { t } = useLang();
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
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:px-12 lg:px-24">
      <SectionHeading index="07" title="Contact" bn="যোগাযোগ" />

      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
        <AnimatedSection>
          <div className="panel space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-black">{t("Letters to the editor", "সম্পাদকের নিকট চিঠি")}</h3>
              <button onClick={shuffle} className="inline-flex items-center gap-1.5 font-display text-sm underline decoration-2 underline-offset-4" aria-label="Try a different conversation starter">
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
                className="mt-1 w-full border border-foreground bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--red)]"
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
                className="mt-1 w-full resize-none border border-foreground bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--red)]"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={sendLinkedIn} disabled={!message.trim()} className="btn btn-solid gap-1.5 px-5 py-2.5 text-sm uppercase tracking-wider disabled:opacity-40">
                Send via LinkedIn <ArrowUpRight className="h-4 w-4" />
              </button>
              {CONTACT_EMAIL && (
                <a href={mailHref} className="btn gap-1.5 px-5 py-2.5 text-sm uppercase tracking-wider">
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

        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h3 className="kicker mb-2 border-b border-foreground pb-2">{t("Elsewhere", "অন্যত্র")}</h3>
          {hasCv && <div className="mb-3 mt-3"><CvButton /></div>}
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-foreground/40 py-3 font-display text-xl font-bold hover:text-[var(--red)]">
                  {s.name} <ArrowUpRight className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>

      <footer className="mt-28 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Ayesha Mashiat</footer>
    </section>
  );
}

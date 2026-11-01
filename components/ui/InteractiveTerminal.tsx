"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Line {
  text: string;
  tone?: "cmd" | "ok" | "info" | "warn" | "dim" | "out";
}

const TONES: Record<NonNullable<Line["tone"]>, string> = {
  cmd: "text-green-400 font-semibold",
  ok: "text-green-400",
  info: "text-cyan-400",
  warn: "text-yellow-400",
  dim: "text-neutral-500",
  out: "text-[#e5e5e0]",
};

const PROMPT = "ayesha@iut-server:~$ ";

const BOOT: Line[] = [
  { text: `${PROMPT}npm run dev`, tone: "cmd" },
  { text: "Ready in 380ms (Turbopack)", tone: "dim" },
  { text: "▲ Next.js 16.2.6", tone: "info" },
  { text: "✓ DB connection successful. pool_size=15", tone: "ok" },
  { text: "✓ Vector DB and OpenAI client loaded.", tone: "ok" },
  { text: "✦ System ready. Type `help` to poke around.", tone: "warn" },
];

const HELP: Line[] = [
  { text: "help      show this list", tone: "out" },
  { text: "whoami    a quick intro", tone: "out" },
  { text: "skills    my stack", tone: "out" },
  { text: "projects  jump to my work", tone: "out" },
  { text: "contact   say hello", tone: "out" },
  { text: "theme     flip light / dark", tone: "out" },
  { text: "tea       essential fuel", tone: "out" },
  { text: "clear     wipe the screen", tone: "out" },
];

const TEA = [
  "    ) )",
  "   ( (",
  "  .------.",
  "  |      |]",
  "  \\      /",
  "   `----'",
];

/** A tiny fake shell that lets visitors explore the portfolio by typing. */
export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = { text: PROMPT + raw, tone: "cmd" };
    if (!cmd) return setLines((l) => [...l, echo]);
    if (cmd === "clear") return setLines([]);

    let out: Line[];
    switch (cmd) {
      case "help":
        out = HELP;
        break;
      case "whoami":
        out = [
          { text: "Ayesha Mashiat: backend dev & SWE student @ IUT.", tone: "out" },
          { text: "REST APIs, auth, Postgres, and RAG tooling.", tone: "dim" },
        ];
        break;
      case "skills":
        out = [{ text: "Node · FastAPI · PostgreSQL · Docker · AWS · LLM/RAG", tone: "out" }];
        break;
      case "projects":
        goto("projects");
        out = [{ text: "→ scrolling to projects…", tone: "info" }];
        break;
      case "contact":
        goto("contact");
        out = [{ text: "→ scrolling to contact…", tone: "info" }];
        break;
      case "theme": {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next);
        out = [{ text: `✓ switched to ${next} mode`, tone: "ok" }];
        break;
      }
      case "tea":
      case "coffee":
        out = [...TEA.map((t) => ({ text: t, tone: "warn" as const })), { text: cmd === "coffee" ? "…it's tea. always tea." : "ahh. productivity restored.", tone: "dim" }];
        break;
      case "sudo":
      case "sudo rm -rf /":
        out = [{ text: "nice try. permission denied (-:", tone: "warn" }];
        break;
      default:
        out = [{ text: `command not found: ${cmd}. try \`help\``, tone: "warn" }];
    }
    setLines((l) => [...l, echo, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setInput("");
      setCursor(-1);
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const i = cursor + 1;
      if (i >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(i);
        setInput(history[i]);
      }
    }
  };

  return (
    <div
      ref={scroller}
      data-no-doodle
      onClick={() => inputRef.current?.focus()}
      className="bg-[#151515] text-[#e5e5e0] p-4 font-mono text-[11px] sm:text-xs leading-relaxed h-[240px] overflow-y-auto no-scrollbar border-[1.5px] border-foreground/30 rounded-md"
    >
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre-wrap ${TONES[l.tone ?? "out"]}`}>
          {l.text}
        </div>
      ))}
      <label className="flex items-center">
        <span className="text-green-400 font-semibold whitespace-pre">{PROMPT}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command"
          placeholder="try: help"
          className="flex-1 min-w-0 bg-transparent text-white outline-none placeholder:text-neutral-600 caret-green-400"
        />
      </label>
    </div>
  );
}

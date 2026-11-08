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
  { text: "✓ FastAPI up · Postgres pool ready", tone: "ok" },
  { text: "✦ System ready. try `help`.", tone: "warn" },
];

const HELP: Line[] = [
  { text: "help      show this list", tone: "out" },
  { text: "whoami    a quick intro", tone: "out" },
  { text: "skills    my stack", tone: "out" },
  { text: "projects  jump to my work", tone: "out" },
  { text: "contact   say hello", tone: "out" },
  { text: "theme     flip light / dark", tone: "out" },
  { text: "tea       my lebu-cha recipe", tone: "out" },
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

const RECIPE = [
  "1 cup water",
  "1½ spoons sugar / honey",
  "1 cardamom",
  "a pinch of cinnamon",
  "a handful of mint",
  "some squeezed lime",
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
          { text: "Ayesha. backend dev, SWE student @ IUT.", tone: "out" },
          { text: "lately: how AI actually works.", tone: "dim" },
        ];
        break;
      case "skills":
        out = [{ text: "Python · FastAPI · Postgres · Docker · AWS · a little ML", tone: "out" }];
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
      case "cha":
      case "lebu-cha":
        out = [
          { text: "lebu-cha", tone: "warn" as const },
          ...RECIPE.map((r) => ({ text: `– ${r}`, tone: "out" as const })),
          { text: "" },
          { text: "kettle's on. everything else can wait.", tone: "dim" as const },
          ...TEA.map((t) => ({ text: t, tone: "warn" as const })),
          { text: "ahh. productivity restored.", tone: "dim" as const },
        ];
        break;
      case "coffee":
        out = [{ text: "…did you mean `tea`?", tone: "warn" }];
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
     
      onClick={() => inputRef.current?.focus()}
      className="bg-[#151515] text-[#e5e5e0] p-4 font-mono text-[11px] sm:text-xs leading-relaxed h-[240px] overflow-y-auto no-scrollbar"
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

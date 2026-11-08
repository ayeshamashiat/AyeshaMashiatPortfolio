"use client";

import { useMemo, useState } from "react";
import { CROSSWORD, type CrosswordEntry } from "@/lib/crossword";
import { useLang } from "@/lib/i18n";

type Dir = "A" | "D";
const key = (r: number, c: number) => `${r},${c}`;
const { rows, cols, grid, entries } = CROSSWORD;
const isOpen = (r: number, c: number) => r >= 0 && c >= 0 && r < rows && c < cols && grid[r][c] !== "#";

const cellsOf = (e: CrosswordEntry) => Array.from({ length: e.answer.length }, (_, i) => (e.dir === "A" ? ([e.row, e.col + i] as const) : ([e.row + i, e.col] as const)));
const entryAt = (r: number, c: number, dir: Dir) => entries.find((e) => e.dir === dir && cellsOf(e).some(([rr, cc]) => rr === r && cc === c));

/** A playable mini crossword with clues from my projects and life. Type, arrow around, check or reveal. */
export function Crossword() {
  const first = entries.slice().sort((a, b) => a.n - b.n)[0];
  const [sel, setSel] = useState({ r: first.row, c: first.col });
  const [dir, setDir] = useState<Dir>(first.dir);
  const [letters, setLetters] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null);
  const { t } = useLang();

  const numbers = useMemo(() => new Map(entries.map((e) => [key(e.row, e.col), e.n])), []);
  const active = entryAt(sel.r, sel.c, dir) ?? entryAt(sel.r, sel.c, dir === "A" ? "D" : "A");
  const activeCells = new Set(active ? cellsOf(active).map(([r, c]) => key(r, c)) : []);
  const solved = grid.every((row, r) => [...row].every((ch, c) => ch === "#" || letters[key(r, c)] === ch));
  const entryDone = (e: CrosswordEntry) => cellsOf(e).every(([r, c], i) => letters[key(r, c)] === e.answer[i]);

  const select = (r: number, c: number, nextDir?: Dir) => {
    setSel({ r, c });
    if (nextDir) setDir(nextDir);
    else if (!entryAt(r, c, dir)) setDir(dir === "A" ? "D" : "A");
    inputEl?.focus();
  };

  const onCell = (r: number, c: number) => {
    if (sel.r === r && sel.c === c) {
      const other = dir === "A" ? "D" : "A";
      if (entryAt(r, c, other)) setDir(other);
      inputEl?.focus();
    } else select(r, c);
  };

  const step = (by: 1 | -1) => {
    if (!active) return;
    const list = cellsOf(active);
    const i = list.findIndex(([r, c]) => r === sel.r && c === sel.c);
    const next = list[i + by];
    if (next) setSel({ r: next[0], c: next[1] });
  };

  const setLetter = (r: number, c: number, ch: string) => {
    setLetters((prev) => ({ ...prev, [key(r, c)]: ch }));
    setWrong((w) => {
      if (!w.has(key(r, c))) return w;
      const n = new Set(w);
      n.delete(key(r, c));
      return n;
    });
  };

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ch = e.target.value.slice(-1).toUpperCase();
    e.target.value = "";
    if (!/^[A-Z]$/.test(ch)) return;
    setLetter(sel.r, sel.c, ch);
    step(1);
  };

  const move = (dr: number, dc: number) => {
    let r = sel.r + dr, c = sel.c + dc;
    while (r >= 0 && c >= 0 && r < rows && c < cols && !isOpen(r, c)) {
      r += dr;
      c += dc;
    }
    if (isOpen(r, c)) select(r, c, dr === 0 ? "A" : "D");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (letters[key(sel.r, sel.c)]) setLetter(sel.r, sel.c, "");
      else if (active) {
        const list = cellsOf(active);
        const i = list.findIndex(([r, c]) => r === sel.r && c === sel.c);
        const prev = list[i - 1];
        if (prev) {
          setSel({ r: prev[0], c: prev[1] });
          setLetter(prev[0], prev[1], "");
        }
      }
    } else if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      if (e.key === "ArrowRight") move(0, 1);
      else if (e.key === "ArrowLeft") move(0, -1);
      else if (e.key === "ArrowDown") move(1, 0);
      else move(-1, 0);
    } else if (e.key === " ") {
      e.preventDefault();
      const other = dir === "A" ? "D" : "A";
      if (entryAt(sel.r, sel.c, other)) setDir(other);
    }
  };

  const gotoEntry = (e: CrosswordEntry) => {
    setDir(e.dir);
    setSel({ r: e.row, c: e.col });
    inputEl?.focus();
  };

  const check = () => setWrong(new Set(Object.entries(letters).filter(([k, v]) => v && grid[+k.split(",")[0]][+k.split(",")[1]] !== v).map(([k]) => k)));
  const revealWord = () => active && setLetters((p) => ({ ...p, ...Object.fromEntries(cellsOf(active).map(([r, c], i) => [key(r, c), active.answer[i]])) }));
  const revealAll = () => {
    setLetters(Object.fromEntries(grid.flatMap((row, r) => [...row].map((ch, c) => (ch === "#" ? null : [key(r, c), ch])).filter(Boolean) as [string, string][])));
    setWrong(new Set());
  };
  const clear = () => {
    setLetters({});
    setWrong(new Set());
  };

  const clueList = (d: Dir) =>
    entries
      .filter((e) => e.dir === d)
      .sort((a, b) => a.n - b.n)
      .map((e) => (
        <li key={`${d}${e.n}`}>
          <button onClick={() => gotoEntry(e)} className={`w-full px-2 py-1 text-left leading-snug transition-colors hover:bg-[var(--yellow)]/40 ${active === e ? "bg-[var(--yellow)]/60" : ""} ${entryDone(e) ? "text-muted-foreground line-through" : ""}`}>
            <span className="font-ui mr-1.5 font-bold">{e.n}</span>
            {e.clue} <span className="font-ui text-xs text-muted-foreground">({e.answer.length})</span>
          </button>
        </li>
      ));

  const btn = "btn px-3.5 py-1.5 text-xs uppercase tracking-wider";

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <div role="grid" aria-label="Crossword" className="grid w-full max-w-[520px] border-2 border-foreground bg-foreground" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: "1px" }}>
            {grid.flatMap((row, r) =>
              [...row].map((ch, c) => {
                if (ch === "#") return <div key={key(r, c)} className="aspect-square bg-foreground" aria-hidden />;
                const k = key(r, c);
                const isSel = sel.r === r && sel.c === c;
                const num = numbers.get(k);
                return (
                  <button
                    key={k}
                    onClick={() => onCell(r, c)}
                    aria-label={`Row ${r + 1}, column ${c + 1}${num ? `, clue ${num}` : ""}${letters[k] ? `, ${letters[k]}` : ", empty"}`}
                    className={`relative aspect-square text-center font-display text-base font-bold uppercase leading-none sm:text-xl ${isSel ? "bg-[var(--yellow)] text-[#1a1a1a]" : activeCells.has(k) ? "bg-[color-mix(in_srgb,var(--yellow)_50%,var(--card-bg))]" : "bg-card-bg"} ${wrong.has(k) ? "!text-[var(--red)] line-through" : ""}`}
                  >
                    {num && <span className="font-ui absolute left-[3px] top-[1px] text-[9px] font-semibold sm:text-[10px]">{num}</span>}
                    {letters[k] ?? ""}
                  </button>
                );
              }),
            )}
          </div>
          <input ref={setInputEl} onChange={onType} onKeyDown={onKeyDown} aria-label="Type your answer" autoCapitalize="characters" autoComplete="off" autoCorrect="off" spellCheck={false} className="sr-only" />

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={check} className={btn}>{t("Check", "যাচাই")}</button>
            <button onClick={revealWord} className={btn}>{t("Reveal word", "শব্দ দেখুন")}</button>
            <button onClick={revealAll} className={btn}>{t("Reveal all", "সব দেখুন")}</button>
            <button onClick={clear} className={btn}>{t("Clear", "মুছুন")}</button>
          </div>
          <p role="status" className="mt-3 min-h-6 font-display font-bold text-[var(--red)]">
            {solved ? t("Solved. Thanks for reading all the way down.", "সমাধান হয়েছে। এতদূর পড়ার জন্য ধন্যবাদ।") : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 text-[0.95rem] sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <h4 className="kicker mb-1 border-b border-foreground pb-1">{t("Across", "আড়াআড়ি")}</h4>
            <ul>{clueList("A")}</ul>
          </div>
          <div>
            <h4 className="kicker mb-1 border-b border-foreground pb-1">{t("Down", "উপর-নিচ")}</h4>
            <ul>{clueList("D")}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

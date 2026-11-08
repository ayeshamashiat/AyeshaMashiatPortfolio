"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(b: Cell[]): { who: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return { who: b[a], line };
  }
  return null;
}

/** Computer plays O: win if it can, block if it must, then centre, corners, edges. */
function aiMove(b: Cell[]): number {
  const find = (mark: Cell) => {
    for (const line of LINES) {
      const marks = line.filter((i) => b[i] === mark).length;
      const empty = line.find((i) => b[i] === null);
      if (marks === 2 && empty !== undefined) return empty;
    }
    return -1;
  };
  const pick = find("O") !== -1 ? find("O") : find("X");
  if (pick !== -1) return pick;
  if (b[4] === null) return 4;
  const corners = [0, 2, 6, 8].filter((i) => b[i] === null);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  return b.findIndex((c) => c === null);
}

const CELL = 60;
const centre = (i: number): [number, number] => [(i % 3) * CELL + CELL / 2 + 10, Math.floor(i / 3) * CELL + CELL / 2 + 10];

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [score, setScore] = useState({ you: 0, me: 0, ties: 0 });

  const result = winnerOf(board);
  const full = board.every(Boolean);
  const over = !!result || full;

  const finish = (b: Cell[]) => {
    const w = winnerOf(b);
    if (w) setScore((s) => (w.who === "X" ? { ...s, you: s.you + 1 } : { ...s, me: s.me + 1 }));
    else if (b.every(Boolean)) setScore((s) => ({ ...s, ties: s.ties + 1 }));
  };

  const play = (i: number) => {
    if (board[i] || over) return;
    const next = [...board];
    next[i] = "X";
    if (winnerOf(next) || next.every(Boolean)) {
      setBoard(next);
      return finish(next);
    }
    next[aiMove(next)] = "O";
    setBoard(next);
    finish(next);
  };

  const status = result
    ? result.who === "X" ? "you won?! rematch." : "i win! (-: again?"
    : full ? "a draw. respectable." : "your turn: you're X";

  return (
    <div className="flex flex-col items-center gap-3 text-foreground">
      <svg viewBox="0 0 200 200" className="w-52 h-52" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 12 V188 M130 12 V188 M12 70 H188 M12 130 H188" />

        {board.map((cell, i) => {
          const [cx, cy] = centre(i);
          return (
            <g key={i}>
              {cell === "X" && (
                <>
                  <motion.path d={`M${cx - 15} ${cy - 14} L${cx + 15} ${cy + 15}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }} />
                  <motion.path d={`M${cx + 14} ${cy - 15} L${cx - 15} ${cy + 14}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2, delay: 0.15 }} />
                </>
              )}
              {cell === "O" && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={17}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35 }}
                />
              )}
              {!cell && !over && (
                <rect
                  x={cx - CELL / 2} y={cy - CELL / 2} width={CELL} height={CELL}
                  fill="transparent" stroke="none"
                  className="cursor-pointer hover:fill-foreground/5"
                  role="button" tabIndex={0}
                  aria-label={`Place X in square ${i + 1}`}
                  onClick={() => play(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && play(i)}
                />
              )}
            </g>
          );
        })}

        {/* strike-through on a win */}
        {result && (
          <motion.path
            d={`M${centre(result.line[0]).join(" ")} L${centre(result.line[2]).join(" ")}`}
            stroke={result.who === "X" ? "#22c55e" : "#ef4444"}
            strokeWidth="5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </svg>

      <p className="text-sm font-bold">{status}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span>you {score.you}</span>
        <span>me {score.me}</span>
        <span>draws {score.ties}</span>
        {over && (
          <button onClick={() => setBoard(Array(9).fill(null))} className="btn px-3 py-1 text-foreground font-bold">
            play again
          </button>
        )}
      </div>
    </div>
  );
}

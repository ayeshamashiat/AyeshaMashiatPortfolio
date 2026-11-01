"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eraser, Pencil, Undo2, X } from "lucide-react";

type Point = [number, number];
interface Stroke {
  color: string; // "ink" follows the theme, anything else is a literal colour
  points: Point[];
}

const COLORS = ["ink", "#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];

/**
 * A page-wide doodle layer. Strokes are stored in page coordinates, so they
 * stay put as the visitor scrolls. The canvas itself only covers the viewport
 * (a document-sized one gets huge and slows scrolling down).
 */
export function DrawingPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const current = useRef<Stroke | null>(null);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("ink");
  const [count, setCount] = useState(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, -window.scrollX, -window.scrollY);
    ctx.clearRect(window.scrollX, window.scrollY, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3.2;
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#1a1a1a";

    const all = current.current ? [...strokes.current, current.current] : strokes.current;
    for (const s of all) {
      if (s.points.length === 0) continue;
      ctx.strokeStyle = s.color === "ink" ? ink : s.color;
      ctx.beginPath();
      ctx.moveTo(...s.points[0]);
      if (s.points.length === 1) ctx.lineTo(s.points[0][0] + 0.1, s.points[0][1]);
      for (let i = 1; i < s.points.length - 1; i++) {
        const [x, y] = s.points[i];
        const [nx, ny] = s.points[i + 1];
        ctx.quadraticCurveTo(x, y, (x + nx) / 2, (y + ny) / 2);
      }
      const last = s.points[s.points.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }
  }, []);

  // Keep the canvas viewport-sized and repaint (at most once per frame) on scroll.
  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; render(); });
    };
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", schedule, { passive: true });
    const themeObserver = new MutationObserver(render);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", schedule);
    };
  }, [render]);

  const pagePoint = (e: React.PointerEvent): Point => [e.pageX, e.pageY];

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    current.current = { color, points: [pagePoint(e)] };
    render();
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!current.current) return;
    current.current.points.push(pagePoint(e));
    render();
  };
  const onUp = () => {
    if (!current.current) return;
    strokes.current.push(current.current);
    current.current = null;
    setCount(strokes.current.length);
    render();
  };

  const undo = () => {
    strokes.current.pop();
    setCount(strokes.current.length);
    render();
  };
  const clear = () => {
    strokes.current = [];
    setCount(0);
    render();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        data-no-doodle
        aria-hidden
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="fixed left-0 top-0 z-[60]"
        style={{
          pointerEvents: active ? "auto" : "none",
          touchAction: active ? "none" : "auto",
          cursor: active ? "crosshair" : undefined,
        }}
      />

      <div
        data-no-doodle
        className="fixed bottom-5 right-5 z-[95] flex items-center gap-2 font-display"
      >
        {active && (
          <div className="doodle-card flex items-center gap-2 px-3 py-2 text-foreground">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={c === "ink" ? "Ink colour" : `Colour ${c}`}
                className={`h-6 w-6 rounded-full border-2 border-foreground transition-transform ${
                  color === c ? "scale-125 ring-2 ring-foreground/40" : ""
                }`}
                style={{ background: c === "ink" ? "var(--foreground)" : c }}
              />
            ))}
            <span className="mx-1 h-5 w-[2px] bg-foreground/30" />
            <button onClick={undo} disabled={!count} aria-label="Undo stroke" className="disabled:opacity-30">
              <Undo2 className="h-5 w-5" />
            </button>
            <button onClick={clear} disabled={!count} aria-label="Clear drawing" className="disabled:opacity-30">
              <Eraser className="h-5 w-5" />
            </button>
          </div>
        )}
        <button
          onClick={() => setActive((a) => !a)}
          aria-pressed={active}
          aria-label={active ? "Stop doodling" : "Doodle on this page"}
          className="doodle-button h-14 gap-2 px-4 text-foreground font-bold"
        >
          {active ? <X className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
          <span className="hidden sm:inline">{active ? "done" : "doodle on me!"}</span>
        </button>
      </div>
    </>
  );
}

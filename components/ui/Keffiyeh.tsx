import { useId } from "react";

/**
 * A strip of keffiyeh print, worn as a rule: bold bands, the olive-leaf chain and the fishnet.
 * Drawn in currentColor so it inks itself in both the day and night editions.
 */
export function KeffiyehBand({ height = 14, className = "", label = "Keffiyeh print, in solidarity with Palestine" }: { height?: number; className?: string; label?: string }) {
  const id = useId();
  const scale = height / 20;
  return (
    <svg className={`block w-full ${className}`} height={height} role="img" aria-label={label}>
      <title>{label}</title>
      <defs>
        <pattern id={id} width={24} height={20} patternUnits="userSpaceOnUse" patternTransform={`scale(${scale})`}>
          <rect width="24" height="2" fill="currentColor" />
          {/* olive branch */}
          <path d="M0 7 Q6 4.5 12 7 T24 7" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <ellipse cx="5.5" cy="4.3" rx="2.7" ry="1.05" transform="rotate(-28 5.5 4.3)" fill="currentColor" />
          <ellipse cx="17.5" cy="9.7" rx="2.7" ry="1.05" transform="rotate(28 17.5 9.7)" fill="currentColor" />
          <rect y="11.6" width="24" height="1" fill="currentColor" />
          {/* fishnet */}
          <path
            d="M-1 13 L6 20 M5 13 L12 20 M11 13 L18 20 M17 13 L24 20 M23 13 L30 20 M7 13 L0 20 M13 13 L6 20 M19 13 L12 20 M25 13 L18 20 M1 13 L-6 20"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <rect y="19.2" width="24" height="0.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${id})`} />
    </svg>
  );
}

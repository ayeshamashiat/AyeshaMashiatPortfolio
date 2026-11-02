import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat, Comic_Neue, Architects_Daughter, Patrick_Hand } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const comicNeue = Comic_Neue({
  variable: "--font-readable",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Ayesha Mashiat | Backend developer",
  description: "Ayesha Mashiat builds backend software and is curious about how AI actually works. Projects: Bouncer, Touch Grass Babu, PetniHunter, AgriSense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} ${architectsDaughter.variable} ${patrickHand.variable} ${comicNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        
        {/* Inline SVG filters for wobbly hand-drawn effect */}
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="doodle-border-filter" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="2" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            {/* Three seeds swapped in quick succession give lines the "boiling" hand-drawn jitter */}
            {[3, 11, 27].map((seed, i) => (
              <filter key={seed} id={`doodle-boil-${i + 1}`} x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed={seed} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            ))}
          </defs>
        </svg>
      </body>
    </html>
  );
}

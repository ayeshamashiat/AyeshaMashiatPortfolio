import type { Metadata } from "next";
import { JetBrains_Mono, Playfair_Display, Source_Serif_4, Noto_Serif_Bengali, Source_Sans_3, Noto_Sans_Bengali } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

// Newspaper type: a high-contrast serif for headlines, a text serif for body copy,
// and Noto Serif Bengali picks up the Bengali glyphs in both.
const headline = Playfair_Display({ variable: "--font-heading", subsets: ["latin"] });
const text = Source_Serif_4({ variable: "--font-body", subsets: ["latin"], style: ["normal", "italic"] });
const bengali = Noto_Serif_Bengali({ variable: "--font-bn", subsets: ["bengali"] });
// Clean sans for section labels, the date strip and buttons, like a daily's navigation.
const ui = Source_Sans_3({ variable: "--font-ui", subsets: ["latin"] });
const uiBengali = Noto_Sans_Bengali({ variable: "--font-ui-bn", subsets: ["bengali"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

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
      className={`${headline.variable} ${text.variable} ${bengali.variable} ${ui.variable} ${uiBengali.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-[var(--yellow)] selection:text-[#1a1a1a]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}

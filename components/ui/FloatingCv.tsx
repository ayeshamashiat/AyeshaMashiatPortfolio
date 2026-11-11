"use client";

import { CvButton } from "@/components/ui/CvButton";

/** One "View CV" button that stays put while you scroll, opening the in-page PDF viewer. */
export function FloatingCv() {
  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      <CvButton className="btn-solid !px-4 !py-2.5 shadow-[4px_4px_0_var(--foreground)]" />
    </div>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";

export const CV_PATH = "/AyeshaMashiatResume.pdf";

const noopSubscribe = () => () => {};

/** "View CV" opens an in-page PDF viewer; the viewer also offers open-in-tab and download. */
export function CvButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  // Portal target only exists in the browser.
  const inBrowser = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dialog = (
    <AnimatePresence>
      {open && (
        <motion.div
          data-no-doodle
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum vitae"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-3 md:p-8"
        >
          <div onClick={(e) => e.stopPropagation()} className="doodle-card flex h-full w-full max-w-4xl flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[2.5px] border-foreground px-4 py-3 font-display">
              <span className="font-bold">Ayesha Mashiat: CV</span>
              <div className="flex items-center gap-4 text-sm font-bold">
                <a href={CV_PATH} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline hover:decoration-wavy">
                  <ExternalLink className="h-4 w-4" /> open in tab
                </a>
                <a href={CV_PATH} download="AyeshaMashiatResume.pdf" className="inline-flex items-center gap-1 hover:underline hover:decoration-wavy">
                  <Download className="h-4 w-4" /> download
                </a>
                <button onClick={() => setOpen(false)} aria-label="Close CV">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <object data={`${CV_PATH}#view=FitH`} type="application/pdf" className="min-h-0 w-full flex-1 bg-white">
              <p className="p-6 font-display">
                Your browser can&apos;t show PDFs inline.{" "}
                <a href={CV_PATH} download="AyeshaMashiatResume.pdf" className="underline decoration-wavy">Download the CV</a> instead.
              </p>
            </object>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button onClick={() => setOpen(true)} className={`doodle-button gap-2 px-5 py-2.5 font-display font-bold ${className}`}>
        <FileText className="h-4 w-4" /> View CV
      </button>
      {inBrowser && createPortal(dialog, document.body)}
    </>
  );
}

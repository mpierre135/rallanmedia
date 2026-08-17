"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import photos from "@/lib/photography.json";

export default function Photography() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const active = index === null ? null : photos[index];

  return (
    <section id="photography" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="Photography"
          title="Imagery made for the brands we build"
          intro="Shot, generated, and retouched in-house — then used across the sites, ads, and campaigns in this portfolio."
        />

        <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 4) * 0.05} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-lg border hairline"
                aria-label={`Open image ${i + 1} of ${photos.length} — ${photo.credit}`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="w-full transition duration-500 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                  <span className="type-meta">{photo.credit}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/96 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photography viewer"
            onClick={() => setIndex(null)}
          >
            <motion.div
              className="relative max-h-[80vh] w-full max-w-5xl"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={active.src}
                src={active.src}
                alt=""
                width={active.width}
                height={active.height}
                sizes="90vw"
                className="max-h-[80vh] w-full rounded-xl object-contain"
                priority
              />
            </motion.div>

            <div
              className="mt-5 flex items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => step(-1)} className="type-meta hover:text-bone">
                ← Previous
              </button>
              <span className="type-meta tabular-nums">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                <span className="ml-3 text-muted">{active.credit}</span>
              </span>
              <button type="button" onClick={() => step(1)} className="type-meta hover:text-bone">
                Next →
              </button>
              <button
                type="button"
                onClick={() => setIndex(null)}
                className="type-meta hover:text-bone"
              >
                Close (Esc)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

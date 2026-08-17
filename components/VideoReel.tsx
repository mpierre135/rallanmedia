"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { VIDEO_ADS, type VideoAd } from "@/lib/portfolio";

export default function VideoReel() {
  const [active, setActive] = useState<VideoAd | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="reel" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="Video ads"
          title="Commercials without the shoot day"
          intro="Scripted, generated, cut, and graded here. Same output a production crew delivers, at a fraction of the schedule."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEO_ADS.map((ad, i) => (
            <Reveal key={ad.slug} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setActive(ad)}
                className="group block w-full overflow-hidden rounded-xl border hairline text-left transition duration-300 hover:-translate-y-1 hover:border-sodium/50"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-ink-raised">
                  {ad.poster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ad.poster}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <span className="type-eyebrow absolute left-5 top-4">{ad.category}</span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-sodium text-ink transition group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4 p-5">
                  <h3 className="text-sm font-semibold">{ad.title}</h3>
                  <span className="type-meta shrink-0 tabular-nums">{ad.runtime}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-baseline justify-between gap-6 pb-4">
                <h3 className="font-display text-lg font-bold">{active.title}</h3>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="type-meta transition hover:text-bone"
                >
                  Close (Esc)
                </button>
              </div>
              <video
                key={active.slug}
                src={active.src}
                poster={active.poster}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full rounded-xl border hairline bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

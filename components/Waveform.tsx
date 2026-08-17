"use client";

import { motion, useReducedMotion } from "motion/react";

// Deterministic so server and client render identical markup.
const BARS = Array.from({ length: 56 }, (_, i) => {
  const wave = Math.sin(i * 0.42) * 0.34 + Math.sin(i * 1.13) * 0.22;
  return Math.round((0.42 + Math.abs(wave)) * 100);
});

export default function Waveform() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-28 items-center gap-[2px]" aria-hidden>
      {BARS.map((height, i) => (
        // min-w-0 matters: a fixed bar width would set a min-content floor on
        // the whole hero column and push the layout wider than a phone.
        <motion.span
          key={i}
          className="min-w-0 flex-1 rounded-full bg-signal"
          style={{ opacity: 0.35 + (height / 100) * 0.65 }}
          initial={{ height: `${height}%` }}
          animate={
            reduced
              ? undefined
              : { height: [`${height}%`, `${Math.max(12, height * 0.32)}%`, `${height}%`] }
          }
          transition={{
            duration: 1.6 + (i % 7) * 0.16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 11) * 0.09,
          }}
        />
      ))}
    </div>
  );
}

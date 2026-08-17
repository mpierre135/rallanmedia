"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const VIEW_H = 1000;
const X = 12;

/** A vertical rail that stays flat until it spikes — the shape of a line that
 *  is being watched, which is what every system on this page is for. */
function railPath() {
  const bursts = [170, 330, 500, 660, 830];
  const amplitudes = [7, -11, 15, -9, 6];
  let d = `M ${X} 0`;

  for (const burst of bursts) {
    const start = burst - 26;
    d += ` L ${X} ${start}`;
    amplitudes.forEach((amp, i) => {
      d += ` L ${X + amp} ${start + (i + 1) * 9}`;
    });
    d += ` L ${X} ${start + amplitudes.length * 9 + 8}`;
  }

  return `${d} L ${X} ${VIEW_H}`;
}

const PATH = railPath();

export default function SignalLine() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.0005 });
  const markerY = useTransform(progress, [0, 1], [0, VIEW_H]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-3 top-0 z-40 hidden h-screen w-6 xl:block"
    >
      <svg
        viewBox={`0 0 24 ${VIEW_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        {/* Same top-to-bottom cyan→indigo ramp as the R in the logo mark. */}
        <defs>
          <linearGradient id="signal-rail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-signal-bright)" />
            <stop offset="45%" stopColor="var(--color-signal)" />
            <stop offset="100%" stopColor="var(--color-depth)" />
          </linearGradient>
        </defs>
        <path d={PATH} stroke="currentColor" strokeWidth={1} className="text-ink-edge" />
        <motion.path
          d={PATH}
          stroke="url(#signal-rail)"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={reduced ? undefined : { pathLength: progress }}
          pathLength={reduced ? undefined : 1}
        />
      </svg>

      {!reduced && (
        <svg
          viewBox={`0 0 24 ${VIEW_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <motion.circle cx={X} r={3} fill="var(--color-signal)" style={{ cy: markerY }} />
        </svg>
      )}
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import Waveform from "./Waveform";
import { CALENDLY_URL } from "@/lib/portfolio";

const TRANSCRIPT = [
  { time: "19:42:07", line: "Incoming call — unknown number", tone: "muted" },
  { time: "19:42:09", line: "AI voice answered", tone: "signal" },
  { time: "19:42:38", line: "Job captured — water heater, no hot water", tone: "bone" },
  { time: "19:43:02", line: "Booked — tomorrow, 8:00 AM", tone: "signal" },
  { time: "19:43:04", line: "Confirmation texted to customer", tone: "muted" },
] as const;

const toneClass = {
  muted: "text-muted",
  bone: "text-bone",
  signal: "text-signal",
} as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <motion.p
            className="type-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            R. Allan Media — Miami, Florida
          </motion.p>

          <motion.h1
            className="type-display mt-6 text-[length:var(--text-display)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            The calls you miss
            <br />
            are the jobs
            <br />
            <span className="text-signal">you lose.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg text-muted md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build the website, the brand media, and the automation behind it — so every
            call gets answered, every job gets booked, and every customer hears back.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href={CALENDLY_URL}
              className="rounded-full bg-signal px-7 py-3.5 font-semibold text-ink transition hover:bg-signal-bright"
            >
              Book a call
            </a>
            <a
              href="#work"
              className="rounded-full border border-muted/40 px-7 py-3.5 font-semibold transition hover:border-signal hover:text-signal"
            >
              See the work
            </a>
          </motion.div>

          <motion.p
            className="type-meta mt-10 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Built for electricians, HVAC techs, plumbers, gutter crews, barbers, and realtors
            across South Florida.
          </motion.p>
        </div>

        <motion.div
          className="min-w-0 lg:col-span-5"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="panel rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <span className="type-eyebrow">After-hours call</span>
              <span className="flex items-center gap-2 type-meta">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Live
              </span>
            </div>

            <div className="mt-6">
              <Waveform />
            </div>

            <ul className="mt-6 space-y-3 border-t hairline pt-6">
              {TRANSCRIPT.map((entry, i) => (
                <motion.li
                  key={entry.time}
                  className="flex gap-4 font-mono text-xs leading-relaxed"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.28 }}
                >
                  <span className="shrink-0 text-muted tabular-nums">{entry.time}</span>
                  <span className={toneClass[entry.tone]}>{entry.line}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

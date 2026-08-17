"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QUESTIONS, TIER_COPY, type Tier } from "@/lib/quiz";
import CalEmbed from "@/components/CalEmbed";
import { CAL_BOOKING_URL } from "@/lib/portfolio";

type Result = { score: number; tier: Tier };

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ name: "", email: "", phone: "", business: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const total = QUESTIONS.length;
  const onDetails = step === total;

  function choose(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setDir(1);
    setStep((s) => s + 1);
  }

  function back() {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, answers, source: "qualify" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult({ score: data.score, tier: data.tier });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (result) return <ResultPanel result={result} name={details.name} />;

  const question = QUESTIONS[step];

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="type-eyebrow tabular-nums">
          {String(Math.min(step + 1, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {step > 0 && (
          <button type="button" onClick={back} className="type-meta transition hover:text-bone">
            ← Back
          </button>
        )}
      </div>

      <div className="mt-4 h-px w-full bg-ink-edge">
        <motion.div
          className="h-px bg-signal"
          animate={{ width: `${((onDetails ? total : step) / total) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="relative mt-12 min-h-[26rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={onDetails ? "details" : question.id}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {onDetails ? (
              <form onSubmit={submit}>
                <h2 className="type-section text-3xl md:text-4xl">Where should we send it?</h2>
                <p className="mt-4 text-muted">
                  Your result is ready. Tell us who you are and we will show it.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    value={details.name}
                    onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Business name"
                    value={details.business}
                    onChange={(v) => setDetails((d) => ({ ...d, business: v }))}
                    autoComplete="organization"
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={details.email}
                    onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                    required
                    autoComplete="email"
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={details.phone}
                    onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                    autoComplete="tel"
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-6 font-mono text-xs text-alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-8 rounded-full bg-signal px-8 py-3.5 font-semibold text-ink transition hover:bg-signal-bright disabled:opacity-60"
                >
                  {status === "sending" ? "Scoring…" : "Show my result"}
                </button>
              </form>
            ) : (
              <>
                <h2 className="type-section text-3xl md:text-4xl">{question.prompt}</h2>
                {question.help && <p className="mt-4 text-muted">{question.help}</p>}

                <div className="mt-8 grid gap-3">
                  {question.choices.map((choice) => {
                    const selected = answers[question.id] === choice.value;
                    return (
                      <button
                        key={choice.value}
                        type="button"
                        onClick={() => choose(question.id, choice.value)}
                        aria-pressed={selected}
                        className={`rounded-xl border px-6 py-4 text-left transition hover:border-signal hover:bg-ink-raised ${
                          selected ? "border-signal bg-ink-raised" : "border-ink-edge"
                        }`}
                      >
                        {choice.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="type-eyebrow">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-ink-edge bg-ink-raised px-4 py-3 text-bone outline-none transition focus:border-signal"
      />
    </label>
  );
}

function ResultPanel({ result, name }: { result: Result; name: string }) {
  const copy = TIER_COPY[result.tier];
  const first = name.trim().split(/\s+/)[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="type-eyebrow">Your result</p>

      <div className="mt-6 flex items-baseline gap-5">
        <span className="type-display text-6xl text-signal tabular-nums md:text-7xl">
          {result.score}
        </span>
        <span className="type-meta">out of 100 — opportunity score</span>
      </div>

      <h2 className="type-section mt-8 text-3xl md:text-4xl">
        {first ? `${first}, ${copy.heading.charAt(0).toLowerCase()}${copy.heading.slice(1)}` : copy.heading}
      </h2>
      <p className="mt-5 max-w-2xl text-lg text-muted">{copy.body}</p>

      {copy.cta === "calendar" ? (
        <div className="mt-10 overflow-hidden rounded-2xl border hairline">
          <CalEmbed />
        </div>
      ) : copy.cta === "call" ? (
        <a
          href={CAL_BOOKING_URL}
          className="mt-10 inline-block rounded-full bg-signal px-8 py-3.5 font-semibold text-ink transition hover:bg-signal-bright"
        >
          Book the call
        </a>
      ) : (
        <p className="type-meta mt-10">
          We have your email. Watch for it in the next day or two.
        </p>
      )}
    </motion.div>
  );
}

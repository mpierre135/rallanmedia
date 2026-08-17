import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { QUESTIONS, scoreAnswers } from "@/lib/quiz";

export const runtime = "nodejs";

const answerShape = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, z.enum(q.choices.map((c) => c.value) as [string, ...string[]])]),
);

const payload = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  answers: z.object(answerShape),
  source: z.string().trim().max(80).optional(),
});

// Small in-process throttle. Enough to stop a script hammering the form; real
// abuse protection belongs at the edge.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ error: "Too many submissions. Try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = payload.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your answers and try again." }, { status: 400 });
  }

  const { name, email, phone, business, answers, source } = parsed.data;
  // Scored here, never trusted from the client.
  const { score, tier } = scoreAnswers(answers);

  try {
    const db = sql();
    await db`
      insert into quiz_leads (name, email, phone, business, answers, score, tier, source)
      values (${name}, ${email}, ${phone || null}, ${business || null},
              ${JSON.stringify(answers)}::jsonb, ${score}, ${tier}, ${source || null})
    `;
  } catch (error) {
    console.error("quiz_leads insert failed", error);
    // The visitor finished the quiz; show them their result regardless.
    return NextResponse.json({ score, tier, stored: false });
  }

  return NextResponse.json({ score, tier, stored: true });
}

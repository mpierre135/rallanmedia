export type Choice = { value: string; label: string; points: number };
export type Question = { id: string; prompt: string; help?: string; choices: Choice[] };

export const QUESTIONS: Question[] = [
  {
    id: "trade",
    prompt: "What kind of business do you run?",
    choices: [
      { value: "home-services", label: "Home services — HVAC, plumbing, electrical, roofing", points: 14 },
      { value: "specialty-trade", label: "Specialty trade — gutters, pools, landscaping, restoration", points: 13 },
      { value: "personal-services", label: "Personal services — barber, salon, med spa, fitness", points: 11 },
      { value: "real-estate", label: "Real estate or property", points: 10 },
      { value: "other", label: "Something else", points: 6 },
    ],
  },
  {
    id: "revenue",
    prompt: "Roughly what does the business bring in per month?",
    choices: [
      { value: "over-100k", label: "More than $100k", points: 15 },
      { value: "50-100k", label: "$50k to $100k", points: 14 },
      { value: "20-50k", label: "$20k to $50k", points: 11 },
      { value: "under-20k", label: "Under $20k", points: 5 },
      { value: "prefer-not", label: "Rather not say", points: 7 },
    ],
  },
  {
    id: "leads",
    prompt: "How many new enquiries do you get in a typical week?",
    choices: [
      { value: "over-50", label: "More than 50", points: 14 },
      { value: "20-50", label: "20 to 50", points: 13 },
      { value: "5-20", label: "5 to 20", points: 10 },
      { value: "under-5", label: "Fewer than 5", points: 5 },
    ],
  },
  {
    id: "missed",
    prompt: "When a call comes in and nobody picks up, what happens?",
    help: "This is usually where the money is.",
    choices: [
      { value: "nothing", label: "Nothing — they leave a voicemail, or they don't", points: 15 },
      { value: "callback-later", label: "We call back when we get a chance", points: 13 },
      { value: "answering-service", label: "A human answering service takes it", points: 8 },
      { value: "automated", label: "We already have something automated", points: 4 },
    ],
  },
  {
    id: "bottleneck",
    prompt: "What is actually holding the business back right now?",
    choices: [
      { value: "not-enough-leads", label: "Not enough people calling", points: 13 },
      { value: "losing-leads", label: "Leads come in but slip through the cracks", points: 15 },
      { value: "no-followup", label: "Quotes go out and nobody chases them", points: 14 },
      { value: "admin-time", label: "Too much time on admin instead of jobs", points: 11 },
      { value: "brand", label: "We look smaller than we are", points: 10 },
    ],
  },
  {
    id: "budget",
    prompt: "What could you put toward fixing it each month?",
    choices: [
      { value: "over-5k", label: "More than $5,000", points: 15 },
      { value: "2-5k", label: "$2,000 to $5,000", points: 14 },
      { value: "1-2k", label: "$1,000 to $2,000", points: 11 },
      { value: "under-1k", label: "Under $1,000", points: 5 },
      { value: "unsure", label: "Depends what it returns", points: 9 },
    ],
  },
  {
    id: "timeline",
    prompt: "When would you want this running?",
    choices: [
      { value: "now", label: "As soon as possible", points: 14 },
      { value: "1-3-months", label: "In the next month or two", points: 11 },
      { value: "this-year", label: "Sometime this year", points: 6 },
      { value: "researching", label: "Just looking for now", points: 3 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.reduce(
  (total, q) => total + Math.max(...q.choices.map((c) => c.points)),
  0,
);

export type Tier = "priority" | "fit" | "early";

/** Authoritative scoring. The client sends answers only; the server scores. */
export function scoreAnswers(answers: Record<string, string>): { score: number; tier: Tier } {
  let raw = 0;
  for (const question of QUESTIONS) {
    const choice = question.choices.find((c) => c.value === answers[question.id]);
    if (choice) raw += choice.points;
  }

  const score = Math.round((raw / MAX_SCORE) * 100);
  const tier: Tier = score >= 75 ? "priority" : score >= 50 ? "fit" : "early";
  return { score, tier };
}

export const TIER_COPY: Record<Tier, { heading: string; body: string; cta: "calendar" | "call" | "none" }> = {
  priority: {
    heading: "You are leaving money on the table every week",
    body: "Your volume and your budget are both there, and the gap is in how enquiries get handled. This is the fastest kind of fix we do. Pick a time below and we will map it on the call.",
    cta: "calendar",
  },
  fit: {
    heading: "There is a clear fix here, and it is not a big lift",
    body: "You have enough coming in to make automation pay for itself. Book a call and we will start with the single change that returns the most for what you described.",
    cta: "call",
  },
  early: {
    heading: "Fix the front of the funnel first",
    body: "Automation multiplies demand — it does not create it. At your stage the money is better spent on getting found and looking credible. Leave your email and we will send the one-page version of what to do first.",
    cta: "none",
  },
};

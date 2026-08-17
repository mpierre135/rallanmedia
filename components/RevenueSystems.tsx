import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { PROOF } from "@/lib/portfolio";

type System = {
  name: string;
  body: string;
  proof?: { name: string; url: string };
};

const SYSTEMS: System[] = [
  {
    name: "AI voice agent",
    body: "Answers the phone in your business's voice at 2am, on a Sunday, or while you are under a sink. It qualifies the caller, books the slot, and puts the job on your calendar before you hear about it.",
    proof: PROOF.voice,
  },
  {
    name: "Missed-call text-back",
    body: "The moment a call goes unanswered, the caller gets a text. No competitor gets a chance to call them back first. This one change pays for most of what else is on this page.",
  },
  {
    name: "Review responder",
    body: "Every Google review gets a reply that sounds like you wrote it, within the hour. Ratings climb, and the replies do the selling for you on the page buyers read first.",
    proof: PROOF.reviews,
  },
  {
    name: "Database reactivation",
    body: "Your old customer list is the cheapest lead source you own. A targeted text campaign works it and books from people who already trust you.",
  },
  {
    name: "Web chat to SMS",
    body: "The chat box on your site hands the conversation to text, so it keeps going after they close the tab. You answer from your phone like any other message.",
  },
  {
    name: "Booking and reminders",
    body: "Self-serve scheduling against your real availability, then reminders before the appointment. Fewer no-shows, no phone tag to confirm.",
  },
  {
    name: "Pipeline and follow-up",
    body: "Every lead lands in one place with a next step attached. Quotes that went quiet get chased automatically instead of aging out.",
  },
  {
    name: "Content and ad engine",
    body: "AI-produced video and image ads, scheduled and published across your channels, refreshed before the creative burns out.",
    proof: PROOF.video,
  },
];

export default function RevenueSystems() {
  return (
    <section id="systems" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="Revenue systems"
          title={
            <>
              Your front desk,
              <br />
              running around the clock
            </>
          }
          intro="Built on GoHighLevel and wired into your website, phone, and calendar. Pick the pieces you need — most shops start with the phone and the reviews."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border hairline bg-ink-edge sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEMS.map((system, i) => (
            <Reveal key={system.name} delay={(i % 4) * 0.08}>
              <article className="flex h-full flex-col bg-ink p-7">
                <h3 className="font-display text-lg font-bold">{system.name}</h3>
                <p className="mt-4 grow text-sm leading-relaxed text-muted">{system.body}</p>
                {system.proof && (
                  <a
                    href={system.proof.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-signal transition hover:text-signal-bright"
                  >
                    See {system.proof.name}
                    <span aria-hidden>→</span>
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border hairline px-8 py-7">
            <p className="grow text-lg">
              Not sure which of these you actually need?
            </p>
            <a
              href="/qualify"
              className="rounded-full border border-signal px-6 py-3 font-semibold text-signal transition hover:bg-signal hover:text-ink"
            >
              Take the 2-minute assessment
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

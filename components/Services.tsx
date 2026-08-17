import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const SERVICES = [
  {
    discipline: "Web development",
    title: "Sites that turn a search into a booked job",
    body: "Custom-built, not dropped into a template. Fast on a phone in a truck, structured so you show up for the searches that happen in your service area.",
    points: [
      "Local search structure, service area pages",
      "Quote requests and booking that actually work",
      "Speed budgets held on mobile data",
      "Reporting that shows which page books work",
    ],
  },
  {
    discipline: "AI media",
    title: "Branding, photos, video, commercials",
    body: "A campaign's worth of brand media without a shoot day. Identity, product and lifestyle imagery, short-form video, and broadcast-style commercials produced end to end.",
    points: [
      "Logo and identity systems",
      "Product and lifestyle photography",
      "Short-form video and commercials",
      "Ad creative in volume, on brand",
    ],
  },
  {
    discipline: "AI workflows",
    title: "The manual work, running on its own",
    body: "Intake, follow-up, quoting, and reporting wired together and monitored. Your team stops retyping the same information into four different tools.",
    points: [
      "Lead intake and routing",
      "Follow-up that never gets forgotten",
      "Quote and invoice generation",
      "Weekly reporting to your inbox",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="What we do"
          title="Three things, done properly"
          intro="Most shops sell one of these and subcontract the rest. We build all three, which is why they actually connect to each other."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border hairline bg-ink-edge md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.discipline} delay={i * 0.1}>
              <article className="flex h-full flex-col bg-ink p-8">
                <p className="type-eyebrow">{service.discipline}</p>
                <h3 className="type-section mt-5 text-2xl md:text-[1.75rem]">{service.title}</h3>
                <p className="mt-5 text-muted">{service.body}</p>
                <ul className="mt-8 space-y-3 border-t hairline pt-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm">
                      <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-sodium" />
                      <span className="text-bone/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

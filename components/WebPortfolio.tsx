import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CLIENT_SITES } from "@/lib/portfolio";

export default function WebPortfolio() {
  return (
    <section id="work" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="Selected work"
          title="Sites that are out there earning"
          intro="Every one of these is live right now. Click through and check them on your phone."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CLIENT_SITES.map((site, i) => (
            <Reveal key={site.slug} delay={(i % 3) * 0.08}>
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer"
                className="group block h-full overflow-hidden rounded-xl border hairline transition duration-300 hover:-translate-y-1 hover:border-signal/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-raised">
                  <Image
                    src={`/portfolio/${site.slug}.jpg`}
                    alt={`${site.name} homepage`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-bold">{site.name}</h3>
                    <span className="type-meta shrink-0">{site.trade}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{site.built}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-signal">
                    {site.url.replace(/^https:\/\//, "")}
                    <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

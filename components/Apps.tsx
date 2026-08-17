import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { APPS } from "@/lib/portfolio";

export default function Apps() {
  return (
    <section id="apps" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell">
        <SectionHead
          label="Our own products"
          title="Software we built for ourselves first"
          intro="We use all of these in-house. That is the only reason they are good enough to show you."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {APPS.map((app, i) => (
            <Reveal key={app.slug} delay={(i % 2) * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border hairline">
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-raised">
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={`${app.name} interface`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="type-eyebrow">Offline</span>
                    </div>
                  )}
                </div>

                <div className="flex grow flex-col p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="font-display text-xl font-bold">{app.name}</h3>
                    <span className="type-meta sm:shrink-0">{app.tagline}</span>
                  </div>
                  <p className="mt-4 grow text-sm leading-relaxed text-muted">
                    {app.description}
                  </p>

                  {app.url ? (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-xs text-signal transition hover:text-signal-bright"
                    >
                      Open {app.name}
                      <span aria-hidden>→</span>
                    </a>
                  ) : (
                    <span className="mt-6 font-mono text-xs text-muted">
                      Back soon — next release in progress
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

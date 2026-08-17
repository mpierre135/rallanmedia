"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import SectionHead from "./SectionHead";
import { CALENDLY_URL } from "@/lib/portfolio";

const PREP = [
  "What you do and where you do it",
  "How leads reach you today, and what happens when nobody picks up",
  "What you would do with more booked jobs next month",
];

export default function BookACall() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Calendly's script is heavy; it should not load until the section is close.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="book" className="scroll-mt-20 border-t hairline py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            label="Book a call"
            title="Twenty minutes, no pitch deck"
            intro="We look at how leads reach you now, where they fall through, and what it would take to fix it. If we are not the right fit, we will say so on the call."
          />

          <ul className="mt-10 space-y-4 border-t hairline pt-8">
            {PREP.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-signal" />
                <span className="text-bone/85">{item}</span>
              </li>
            ))}
          </ul>

          <p className="type-meta mt-10">
            Prefer email?{" "}
            <a href="mailto:info@rallanmedia.com" className="text-signal hover:text-signal-bright">
              info@rallanmedia.com
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div ref={ref} className="overflow-hidden rounded-2xl border hairline bg-ink-raised">
            {inView ? (
              <>
                <Script
                  src="https://assets.calendly.com/assets/external/widget.js"
                  strategy="lazyOnload"
                />
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=101725&text_color=ecf1f7&primary_color=229dcf`}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </>
            ) : (
              <div className="flex h-[700px] items-center justify-center">
                <span className="type-eyebrow">Loading calendar</span>
              </div>
            )}
          </div>

          <p className="type-meta mt-4">
            Calendar not loading?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="text-signal hover:text-signal-bright"
            >
              Open it in a new tab
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#systems", label: "Revenue systems" },
  { href: "#reel", label: "Video ads" },
  { href: "#work", label: "Work" },
  { href: "#photography", label: "Photography" },
  { href: "#apps", label: "Apps" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink/85 backdrop-blur-md">
      <nav className="shell flex items-center justify-between py-4" aria-label="Primary">
        <a href="#top" className="flex items-center" aria-label="R. Allan Media home">
          {/* The logo ships on an opaque black plate; screen blending drops it
              out against the page ground without needing a new export. */}
          <Image
            src="/logo-mark.png"
            alt="R. Allan Media"
            width={880}
            height={340}
            className="h-9 w-auto mix-blend-screen"
            priority
          />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#book"
            className="hidden rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-bright sm:inline-block"
          >
            Book a call
          </a>
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex h-5 w-6 flex-col justify-between">
              <span className="h-0.5 w-full bg-bone" />
              <span className="h-0.5 w-full bg-bone" />
              <span className="h-0.5 w-full bg-bone" />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t hairline lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2.5 text-muted transition hover:text-bone"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book"
                  className="mt-3 block rounded-full bg-signal px-5 py-3 text-center font-semibold text-ink"
                  onClick={() => setOpen(false)}
                >
                  Book a call
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

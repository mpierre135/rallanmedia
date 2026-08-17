import Image from "next/image";

const LEGAL = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-of-service", label: "Terms of service" },
  { href: "/data-deletion-policy", label: "Data deletion policy" },
];

const SOCIAL = [
  { href: "https://instagram.com/rallanmedia", label: "Instagram" },
  { href: "https://twitter.com/rallanmedia", label: "X" },
  { href: "https://linkedin.com/company/rallanmedia", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t hairline py-16">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/logo.png"
              alt="R. Allan Media"
              width={880}
              height={420}
              className="h-14 w-auto mix-blend-screen"
            />
            <p className="mt-5 text-sm text-muted">
              Websites, AI media, and automation for service businesses across South Florida.
            </p>
            <a
              href="mailto:info@rallanmedia.com"
              className="mt-4 inline-block font-mono text-xs text-sodium transition hover:text-flare"
            >
              info@rallanmedia.com
            </a>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="type-eyebrow">Legal</p>
              <ul className="mt-4 space-y-2.5">
                {LEGAL.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-muted transition hover:text-bone">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="type-eyebrow">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {SOCIAL.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted transition hover:text-bone"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="type-meta mt-14 border-t hairline pt-8">
          © {new Date().getFullYear()} R. Allan Media. Miami, Florida.
        </p>
      </div>
    </footer>
  );
}

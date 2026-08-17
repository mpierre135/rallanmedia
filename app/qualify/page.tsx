import type { Metadata } from "next";
import Image from "next/image";
import Quiz from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Is automation worth it for your business?",
  description: "A two-minute assessment for South Florida service businesses.",
  robots: { index: false, follow: false },
};

export default function QualifyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b hairline">
        <div className="shell flex items-center justify-between py-4">
          <a href="/" aria-label="R. Allan Media home">
            <Image
              src="/logo-mark.png"
              alt="R. Allan Media"
              width={880}
              height={340}
              className="h-9 w-auto mix-blend-screen"
              priority
            />
          </a>
          <span className="type-meta">2 minutes · 7 questions</span>
        </div>
      </header>

      <main className="shell grow py-16 md:py-24">
        {/* Wide enough for the booker on the result screen; the questions
            constrain themselves to a comfortable reading width inside this. */}
        <div className="mx-auto max-w-5xl">
          <Quiz />
        </div>
      </main>

      <footer className="border-t hairline py-8">
        <p className="shell type-meta">
          © {new Date().getFullYear()} R. Allan Media ·{" "}
          <a href="/privacy-policy" className="hover:text-bone">
            Privacy policy
          </a>
        </p>
      </footer>
    </div>
  );
}

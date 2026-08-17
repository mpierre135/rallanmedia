import Nav from "./Nav";
import Footer from "./Footer";
import type { LegalDoc } from "@/lib/legal";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Nav />
      <main className="shell py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="type-section text-4xl md:text-5xl">{doc.title}</h1>
          <p className="type-meta mt-4">Effective date: {doc.effective}</p>

          {doc.intro && <p className="mt-10 text-lg text-muted">{doc.intro}</p>}

          <div className="mt-12 space-y-10">
            {doc.blocks.map((block, i) => (
              <section key={i}>
                {block.heading && (
                  <h2 className="font-display text-xl font-bold">{block.heading}</h2>
                )}
                {block.paragraphs?.map((text) => (
                  <p key={text} className="mt-4 text-muted">
                    {text}
                  </p>
                ))}
                {block.list && (
                  <ul className="mt-4 space-y-2">
                    {block.list.map((item) => (
                      <li key={item} className="flex gap-3 text-muted">
                        <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-sodium" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Reveal from "./Reveal";

export default function SectionHead({
  label,
  title,
  intro,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="type-eyebrow">{label}</p>
      <h2 className="type-section mt-5 text-[length:var(--text-section)]">{title}</h2>
      {intro && <p className="mt-6 text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}

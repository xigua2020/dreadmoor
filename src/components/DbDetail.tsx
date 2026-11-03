import Link from "next/link";

/** Shared detail layout for database entries (fish, upgrades, recipes…). */
export default function DbDetail({
  name,
  image,
  description,
  facts,
  related,
}: {
  name: string;
  image?: string;
  description?: string;
  facts: { label: string; value?: React.ReactNode }[];
  related?: { label: string; href: string }[];
}) {
  const visibleFacts = facts.filter((f) => f.value);
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <div>
        {description && <p className="leading-7 text-muted">{description}</p>}
        {image && (
          <div className="mt-6 flex h-56 items-center justify-center rounded-xl border border-teal/30 bg-gradient-to-b from-elevated to-surface p-6">
            {/* Item renders are square with alpha — show contained, not cropped. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={name} className="h-full w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
          </div>
        )}
      </div>
      <aside className="card h-fit p-5">
        <p className="eyebrow mb-3">Quick Facts</p>
        <dl className="space-y-2.5 text-sm">
          {visibleFacts.map((fact) => (
            <div key={fact.label} className="flex justify-between gap-3 border-b border-teal/10 pb-2">
              <dt className="text-muted">{fact.label}</dt>
              <dd className="text-right font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
        {related && related.length > 0 && (
          <>
            <p className="eyebrow mb-2 mt-5">Related</p>
            <ul className="space-y-1 text-sm">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-teal-light hover:underline">{r.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}

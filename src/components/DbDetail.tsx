import Image from "next/image";
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
  facts: { label: string; value?: string }[];
  related?: { label: string; href: string }[];
}) {
  const visibleFacts = facts.filter((f) => f.value);
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_320px]">
      <div>
        {description && <p className="leading-7 text-muted">{description}</p>}
        {image && (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl border border-teal/30">
            <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
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

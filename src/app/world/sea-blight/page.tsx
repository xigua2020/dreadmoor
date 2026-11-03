import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { creatures, fish, locations } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "DREADMOOR Sea Blight – Mutations & Survival",
  description:
    "What is the Sea Blight in DREADMOOR: mutant fish, Blight Fog, blighted areas, the Essence treatment, and how to survive corrupted water.",
  path: "/world/sea-blight/",
});

export default function SeaBlightPage() {
  const mutants = fish.filter((f) => f.mutant);
  const blightAreas = locations.filter((l) => l.region === "Blight Water" || l.slug === "blight-line" || l.slug === "blighted-backwater");
  const hazards = creatures.filter((c) => c.category === "Environmental Hazards");
  return (
    <div className="py-10">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "World", path: "/world/" }, { name: "Sea Blight", path: "/world/sea-blight/" }])} />
      <Breadcrumbs items={[{ name: "World", href: "/world/" }, { name: "Sea Blight" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">The Sea Blight</h1>
      <p className="mt-3 max-w-3xl leading-7 text-muted">
        The Sea Blight is DREADMOOR&apos;s corruption — it mutants the fish, fogs the water and
        wears down the people. This reference collects what is actually known from the game.
        Verified against the official October 2026 demo build.
      </p>

      <div className="relative mt-6 aspect-[16/7] overflow-hidden rounded-xl border border-teal/30">
        <Image src="/images/night-fish-monster.webp" alt="A Sea Blight-mutated fish creature attacking the trawler at night in DREADMOOR" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
      </div>

      <div className="prose-dm mt-8 max-w-3xl">
        <h2>What the Blight Does</h2>
        <ul>
          <li><strong>Mutates fish.</strong> Ten of the twenty-eight recorded species are Sea Blight mutants — twisted variants that keep their peaceful or predatory catch loop but often carry distinct bait affinities and habitats.</li>
          <li><strong>Corrupts water.</strong> Blighted backwater and blighted channels are the only places mutant fish appear, concentrated along the Blight Line.</li>
          <li><strong>Endangers people.</strong> Blight Fog damages anyone lingering inside it, and untreated exposure is why Essence exists at all.</li>
        </ul>
        <h2>The Essence Treatment</h2>
        <p>
          At Betsy and Sons, <Link href="/world/characters/gill/">Gill</Link> and{" "}
          <Link href="/world/characters/bozur/">Bozur</Link> administer an <strong>Essence</strong>{" "}
          injection that suppresses the Blight&apos;s effects. The treatment is recorded as a{" "}
          <strong>debt</strong> repaid through work — the opening contract chain is literally how
          Malcolm pays for his survival. Nothing for free in the Submerged Lands.
        </p>
        <h2>Surviving Blighted Water</h2>
        <ul>
          <li>Plan routes around dense <Link href="/world/creatures/blight-fog/">Blight Fog</Link>; if caught inside, leave the area instead of pushing through.</li>
          <li>Approach the <Link href="/world/locations/blight-line/">Blight Line</Link> with a repaired hull and a full tank — see the <Link href="/guides/survival-guide/">survival guide</Link>.</li>
          <li>Mutant fish are caught with the same temperament rules as standard fish; check each entry&apos;s bait in the <Link href="/fishing/fish-list/">fish list</Link> before casting.</li>
        </ul>
      </div>

      <h2 className="section-title mb-4 mt-12">Sea Blight Mutants ({mutants.length})</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {mutants.map((f) => (
          <Link key={f.slug} href={`/fishing/fish-list/${f.slug}/`} className="card block p-3 text-center">
            {f.image && (
              <span className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-elevated p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image} alt={`${f.name} mutant fish render`} loading="lazy" className="h-full w-full object-contain" />
              </span>
            )}
            <span className="block text-sm font-semibold text-ink">{f.name}</span>
            <span className="mt-0.5 block text-xs text-muted">Lv {f.level} · {f.type}</span>
          </Link>
        ))}
      </div>

      <h2 className="section-title mb-4 mt-12">Blighted Areas &amp; Hazards</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {blightAreas.map((l) => (
          <Link key={l.slug} href={`/world/locations/${l.slug}/`} className="card block p-5">
            <h3 className="font-display text-lg font-bold text-ink">{l.name}</h3>
            <p className="mt-1 text-sm text-muted">{l.description}</p>
          </Link>
        ))}
        {hazards.map((c) => (
          <Link key={c.slug} href={`/world/creatures/${c.slug}/`} className="card block p-5">
            <h3 className="font-display text-lg font-bold text-ink">{c.name}</h3>
            <p className="mt-1 text-sm text-muted">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

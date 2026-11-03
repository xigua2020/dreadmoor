import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "About DREADMOOR Wiki",
  description: "About DREADMOOR Wiki — an independent fan-made wiki and guide resource for the fishing horror adventure DREADMOOR.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="py-10">
      <Breadcrumbs items={[{ name: "About" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">About DREADMOOR Wiki</h1>
      <div className="prose-dm mt-4 max-w-3xl">
        <p>
          DREADMOOR Wiki is an independent, fan-made resource for players of{" "}
          <strong>DREADMOOR</strong>, the first-person fishing horror adventure developed by Dream
          Dock and published by Digital Vortex Entertainment on Steam.
        </p>
        <p>
          Our goal is simple: practical, verified information. We publish guides and database
          entries — fish species, bait, boat upgrades, crafting recipes, locations, creatures and
          quests — based on the released game, and we update them as the game evolves through Early
          Access.
        </p>
        <p>
          This website is not affiliated with, endorsed by, or connected to Dream Dock or Digital
          Vortex Entertainment. DREADMOOR and all related game content are trademarks and copyright
          of their respective owners. You can find the game on{" "}
          <a href={site.steamUrl} target="_blank" rel="noopener noreferrer">Steam</a>.
        </p>
      </div>
    </div>
  );
}

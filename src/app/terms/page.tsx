import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of service for DREADMOOR Wiki.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <div className="py-10">
      <Breadcrumbs items={[{ name: "Terms of Service" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">Terms of Service</h1>
      <div className="prose-dm mt-4 max-w-3xl">
        <p>
          By using DREADMOOR Wiki you agree to these terms. The site is provided for informational
          purposes as a fan-made resource for the game DREADMOOR.
        </p>
        <h2>Content</h2>
        <p>
          We work to keep guides and database entries accurate and clearly version-labelled, but
          game content changes over time — especially between the demo period and Early Access —
          and information may become outdated. Content is provided &quot;as is&quot;, without
          warranties of any kind.
        </p>
        <h2>Intellectual property</h2>
        <p>
          DREADMOOR, its artwork, screenshots and related assets are the property of Dream Dock
          and Digital Vortex Entertainment. This fan site claims no ownership of game content and
          uses such material for informational and commentary purposes. Original text on this site
          may not be reproduced in bulk without permission.
        </p>
        <h2>External links</h2>
        <p>
          Links to Steam, YouTube and other third-party sites are provided for convenience. We are
          not responsible for the content or policies of external sites.
        </p>
      </div>
    </div>
  );
}

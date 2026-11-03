import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for DREADMOOR Wiki.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <div className="py-10">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      <h1 className="font-display text-3xl font-bold text-ink">Privacy Policy</h1>
      <div className="prose-dm mt-4 max-w-3xl">
        <p>
          DREADMOOR Wiki is a content website. We do not require accounts, and we do not collect
          personal information through registration or comment systems, because we do not operate
          any.
        </p>
        <h2>Analytics</h2>
        <p>
          If analytics are enabled on this site, we use privacy-respecting, aggregated usage
          measurement (such as Google Analytics 4) to understand which guides are useful. Analytics
          data is processed according to the provider&apos;s own policies and is not used to
          identify individual visitors.
        </p>
        <h2>Advertising</h2>
        <p>
          This site may display advertising in the future. Ad networks may use cookies or similar
          technologies to serve and measure ads. Where required, consent will be requested before
          personalized advertising is shown.
        </p>
        <h2>Embedded content</h2>
        <p>
          Videos on this site are embedded from YouTube using click-to-load placeholders, so no
          connection to YouTube is made until you choose to play a video.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be raised through the channels listed on our About page.
        </p>
      </div>
    </div>
  );
}

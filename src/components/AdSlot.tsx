import { site } from "../config/site";

/**
 * Reserved ad placement. Renders nothing until advertising is configured
 * (NEXT_PUBLIC_ADS_ENABLED=1 and a real ad unit is wired in), so layouts
 * stay stable and content-first in the meantime.
 */
export default function AdSlot({ id, className = "" }: { id: string; className?: string }) {
  if (!site.adsEnabled) return null;
  return (
    <div
      data-ad-slot={id}
      className={`flex min-h-24 items-center justify-center rounded-lg border border-dashed border-teal/25 text-xs text-muted ${className}`}
    >
      Advertisement
    </div>
  );
}

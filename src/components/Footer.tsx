import Link from "next/link";
import { nav, site } from "../config/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-teal/20 bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            DREAD<span className="text-copper-light">MOOR</span>{" "}
            <span className="text-teal-light">Wiki</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            DREADMOOR Wiki is an independent fan-made resource for players exploring the Submerged
            Lands. Find practical guides covering fishing, fish species, boat upgrades, crafting,
            quests, creatures, and survival. This website is not affiliated with Dream Dock or
            Digital Vortex Entertainment.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <p className="eyebrow mb-3">Wiki Sections</p>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-teal-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3">Game &amp; Community</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a href={site.steamUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-teal-light">
                Play DREADMOOR on Steam
              </a>
            </li>
            <li>
              <a href={site.steamCommunityUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-teal-light">
                Steam Community Hub
              </a>
            </li>
            <li><Link href="/about/" className="text-muted hover:text-teal-light">About</Link></li>
            <li><Link href="/privacy/" className="text-muted hover:text-teal-light">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="text-muted hover:text-teal-light">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-teal/10 py-4 text-center text-xs text-muted">
        DREADMOOR Wiki — a fan-made community wiki. DREADMOOR is a trademark of its respective owners.
      </div>
    </footer>
  );
}

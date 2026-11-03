"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube facade: renders a lightweight thumbnail until the
 * user chooses to play, keeping the embed off the critical loading path.
 */
export default function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-teal/30 bg-abyss">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-copper/90 text-2xl text-ink transition-transform group-hover:scale-110">
              ▶
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

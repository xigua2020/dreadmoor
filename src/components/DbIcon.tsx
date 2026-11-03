/**
 * Original, unified SVG icon set for database cards.
 * Used only when real game icons are not available — never presented as
 * in-game assets.
 */
const PATHS: Record<string, string> = {
  fish: "M2 12c3-4 7-6 11-6 5 0 8 3 10 6-2 3-5 6-10 6-4 0-8-2-11-6Zm-1 0 4-3v6l-4-3Zm14-1.5a1 1 0 1 0 0 .01M7 9c2 1 4 1 6 0",
  bait: "M12 3v4m0 0a5 5 0 0 1 5 5c0 3-2 5-5 5s-5-2-5-5a5 5 0 0 1 5-5Zm-2 9 4 4m0-4-4 4",
  boat: "M4 15h16l-2 4H6l-2-4Zm2 0V9h12v6M9 9V5h6v4m-3-2v2",
  recipe: "M6 3h12v18H6V3Zm3 4h6M9 11h6M9 15h4",
  blueprint: "M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5M12 8v8",
  material: "M12 3l7 4v10l-7 4-7-4V7l7-4Zm0 0v8m7-4-7 4m-7-4 7 4m0 10v-6",
  creature: "M12 4a7 7 0 0 1 7 7c0 5-3 8-7 9-4-1-7-4-7-9a7 7 0 0 1 7-7Zm-3 6a1 1 0 1 0 .01 0 1 1 0 0 0-.01 0Zm6 0a1 1 0 1 0 .01 0 1 1 0 0 0-.01 0ZM9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5",
  location: "M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  quest: "M5 4h11l3 3v13H5V4Zm3 5h8M8 13h8M8 17h5",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  engine: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm7.5 2H22M2 11.5h2.5M12 2v2.5M12 19.5V22m6.3-15.7 1.8-1.8M5.7 18.3l-1.8 1.8m14.4 0 1.8 1.8M5.7 5.7 3.9 3.9",
  hull: "M12 3l7 3v5.5c0 4.2-3 7.6-7 9.5-4-1.9-7-5.3-7-9.5V6l7-3Zm-3 8 2.2 2.2L15.5 9",
  propeller: "M12 12m-1.6 0a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0M12 10.4c-.4-3.4.2-6.9 2.2-6.9 2.1 0 1.9 4.1-.6 6.5m-1.6 2c-3.4.4-6.9-.2-6.9-2.2 0-2.1 4.1-1.9 6.5.6m2 1.6c.4 3.4-.2 6.9-2.2 6.9-2.1 0-1.9-4.1.6-6.5m1.6-2c3.4-.4 6.9.2 6.9 2.2 0 2.1-4.1 1.9-6.5-.6",
  aux: "M4 8h16v11H4V8Zm0 0 2.5-4h11L20 8M9 12h6",
  worm: "M4 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2M6 9c1.5 0 1.5-1.5 3-1.5S10.5 9 12 9s1.5-1.5 3-1.5S16.5 9 18 9",
  scale: "M12 3v18M5 7l7-2 7 2M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8",
};

export default function DbIcon({ name, className = "h-5 w-5" }: { name: keyof typeof PATHS | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={PATHS[name] ?? PATHS.quest} />
    </svg>
  );
}

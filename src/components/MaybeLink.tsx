import Link from "next/link";

/** Renders a link when an href exists, otherwise plain text. */
export default function MaybeLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <Link href={href} className="text-teal-light hover:underline">
      {children}
    </Link>
  );
}

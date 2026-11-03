import Link from "next/link";

export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-teal-light">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden className="text-teal/60">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-teal-light">{item.name}</Link>
            ) : (
              <span className="text-ink" aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

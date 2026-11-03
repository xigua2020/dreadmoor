import Image from "next/image";
import Link from "next/link";

/** Visual card with image, title and description. */
export default function ImageCard({
  href,
  image,
  alt,
  eyebrow,
  title,
  description,
}: {
  href: string;
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="card group block overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-teal-light">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-muted">{description}</p>
      </div>
    </Link>
  );
}

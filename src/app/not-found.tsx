import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="eyebrow mb-3">Lost at Sea</p>
      <h1 className="font-display text-3xl font-bold text-ink">Page Not Found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        This page drifted beyond the charts — it may not exist yet, or the content has not been
        verified and published.
      </p>
      <Link href="/" className="btn btn-primary mt-6">Back to DREADMOOR Wiki</Link>
    </div>
  );
}

import Link from "next/link";

/** Shared listing table for database pages. */
export default function DbListing({
  title,
  intro,
  columns,
  rows,
}: {
  title: string;
  intro: string;
  columns: string[];
  rows: { cells: (string | React.ReactNode)[]; href?: string }[];
}) {
  return (
    <>
      <p className="mb-6 max-w-3xl leading-7 text-muted">{intro}</p>
      <div className="overflow-x-auto rounded-lg border border-teal/30">
        <table className="data-table">
          <thead>
            <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <td key={j}>
                    {j === 0 && row.href ? (
                      <Link href={row.href} className="font-medium text-teal-light hover:underline">{cell}</Link>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">{title} — entries are added as they are verified in-game.</p>
    </>
  );
}

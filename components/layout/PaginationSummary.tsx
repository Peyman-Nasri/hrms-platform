import { getPaginationBounds } from "@/app/lib/pagination";
import { PaginationSummaryProps } from "@/types/layouts";
import Link from "next/link";

export default function PaginationSummary({
  page,
  pageSize,
  total,
  totalPages,
  makeHref,
  itemLabel = "items",
  showSummary = true,
}: PaginationSummaryProps) {
  const { start, end } = getPaginationBounds(page, pageSize, total);

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  if (total === 0) {
    return null;
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-2">
      {showSummary && (
        <div className="text-muted small">
          Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
          <strong>{total}</strong> {itemLabel}
        </div>
      )}

      {totalPages > 1 && (
        <div
          className="btn-group rounded-3 overflow-hidden"
          role="group"
          aria-label="Pagination controls"
        >
          {isFirst ? (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-0"
              disabled
            >
              <i className="bi bi-chevron-left me-1" />
              <span className="d-none d-sm-inline">Previous</span>
              <span className="d-inline d-sm-none">Prev</span>
            </button>
          ) : (
            <Link
              href={makeHref(page - 1)}
              className="btn btn-outline-secondary btn-sm rounded-0 d-flex align-items-center"
            >
              <i className="bi bi-chevron-left me-1" />
              <span className="d-none d-sm-inline">Previous</span>
              <span className="d-inline d-sm-none">Prev</span>
            </Link>
          )}

          <button
            type="button"
            className="btn btn-light btn-sm border-secondary-subtle text-muted rounded-0"
            disabled
          >
            Page <strong className="mx-1">{page}</strong> of{" "}
            <strong>{totalPages}</strong>
          </button>

          {isLast ? (
            <button
              type="button"
              className="btn btn-light btn-sm border-secondary-subtle text-muted rounded-0"
              disabled
            >
              <span className="d-none d-sm-inline">Next</span>
              <span className="d-inline d-sm-none">Next</span>
              <i className="bi bi-chevron-right ms-1" />
            </button>
          ) : (
            <Link
              href={makeHref(page + 1)}
              className="btn btn-outline-secondary btn-sm rounded-0 d-flex align-items-center"
            >
              <span className="d-none d-sm-inline">Next</span>
              <span className="d-inline d-sm-none">Next</span>
              <i className="bi bi-chevron-right ms-1" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

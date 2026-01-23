import Link from "next/link";

type TimeReportDetailHeaderProps = {
  employeeName: string;
  date: Date;
  status: string;
};

export default function TimeReportDetailHeader({
  employeeName,
  date,
  status,
}: TimeReportDetailHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString();

  const statusClass =
    status === "APPROVED"
      ? "bg-success"
      : status === "REJECTED"
        ? "bg-danger"
        : status === "SUBMITTED"
          ? "bg-primary"
          : "bg-secondary";

  return (
    <>
      {/* ===== Mobile Header ===== */}
      <div className="d-flex d-md-none align-items-center gap-3 mb-3">
        <Link
          href="/time-reports"
          className="btn btn-light border btn-sm d-flex align-items-center justify-content-center rounded-circle"
          aria-label="Back to Time Reports"
          style={{ width: "36px", height: "36px" }}
        >
          <i className="bi bi-arrow-left" />
        </Link>

        <div className="d-flex flex-column text-truncate">
          <h2 className="mb-0 fs-5 text-truncate">{employeeName}</h2>
          <span className="text-muted small">{formattedDate}</span>
        </div>

        <span className={`badge ${statusClass} ms-auto`}>{status}</span>
      </div>

      {/* ===== Desktop Header ===== */}
      <div className="d-none d-md-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <h1 className="mb-0">{employeeName}</h1>

          <span className={`badge ${statusClass}`}>{status}</span>
        </div>

        <div className="d-flex flex-column text-end">
          <Link href="/time-reports" className="btn btn-light border">
            ← Back to Time Reports
          </Link>
        </div>
      </div>
    </>
  );
}

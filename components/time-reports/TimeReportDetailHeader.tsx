import Link from "next/link";

type TimeReportDetailHeaderProps = {
  employeeName: string;
};

export default function TimeReportDetailHeader({
  employeeName,
}: TimeReportDetailHeaderProps) {
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

        <h2 className="mb-0 fs-4 text-truncate">{employeeName}</h2>
      </div>

      {/* ===== Desktop Header ===== */}
      <div className="d-none d-md-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">{employeeName}</h1>

        <Link href="/time-reports" className="btn btn-light border">
          ← Back to Time Reports
        </Link>
      </div>
    </>
  );
}

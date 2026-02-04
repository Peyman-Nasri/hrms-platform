import Link from "next/link";
import type { TimeReportsListProps } from "@/types/time-reports";
import {
  formatEmployeeLabel,
  formatHours,
  formatStatusBadgeClass,
} from "@/app/utils/time-reports";
import { formatDate } from "@/app/utils/format";

type Props = {
  timeReports: TimeReportsListProps["timeReports"];
};

export function TimeReportsMobileView({ timeReports }: Props) {
  const hasReports = timeReports.length > 0;

  return (
    <div className="d-block d-md-none">
      <div className="d-flex flex-column gap-3 mt-3">
        {hasReports ? (
          timeReports.map((r) => {
            const employeeLabel = formatEmployeeLabel(r);

            return (
              <Link
                key={r.id}
                href={`/time-reports/${r.id}`}
                className="card p-3 text-decoration-none text-dark"
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold">{employeeLabel}</span>
                  <span className="text-muted small">{formatDate(r.date)}</span>
                </div>

                {r.employee?.email && (
                  <div className="text-muted small">{r.employee.email}</div>
                )}

                <div className="d-flex align-items-center gap-2 mt-2">
                  <span className={`badge ${formatStatusBadgeClass(r.status)}`}>
                    {r.status}
                  </span>

                  <span className="text-muted small">
                    {formatHours(r.hours)} h
                  </span>
                </div>

                {r.description && (
                  <div className="text-muted small mt-2 text-truncate">
                    {r.description}
                  </div>
                )}

                <div className="text-muted small mt-2">
                  Created: {formatDate(r.createdAt)}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center text-muted py-4">
            No time reports found.
          </div>
        )}
      </div>
    </div>
  );
}

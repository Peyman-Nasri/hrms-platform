import Link from "next/link";
import type { TimeReportsListProps } from "@/types/time-reports";
import {
  formatDate,
  formatEmployeeLabel,
  formatHours,
  formatStatusBadgeClass,
} from "@/app/utils/timeReportsListUtils";

type Props = {
  timeReports: TimeReportsListProps["timeReports"];
};

export function TimeReportsTableView({ timeReports }: Props) {
  const hasReports = timeReports.length > 0;

  return (
    <div className="d-none d-md-block">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Description</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {hasReports ? (
              timeReports.map((r) => {
                const employeeLabel = formatEmployeeLabel(r);

                return (
                  <tr key={r.id}>
                    <td>{formatDate(r.date)}</td>

                    <td>
                      <Link
                        href={`/time-reports/${r.id}`}
                        className="text-decoration-none fw-medium text-dark"
                      >
                        {employeeLabel}
                      </Link>
                      {r.employee?.email && (
                        <div className="text-muted small">
                          {r.employee.email}
                        </div>
                      )}
                    </td>

                    <td>{formatHours(r.hours)}</td>

                    <td>
                      <span
                        className={`badge ${formatStatusBadgeClass(r.status)}`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="text-truncate" style={{ maxWidth: 220 }}>
                      {r.description || "—"}
                    </td>

                    <td className="text-muted small">
                      {formatDate(r.createdAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No time reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

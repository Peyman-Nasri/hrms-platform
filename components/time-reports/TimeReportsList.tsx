import Link from "next/link";
import PaginationSummary from "../layout/PaginationSummary";
import { TimeReportsListProps } from "@/types/time-reports";

export default function TimeReportsList({
  timeReports,
  page,
  pageSize,
  total,
  totalPages,
  status,
  employeeId,
}: TimeReportsListProps) {
  const hasReports = timeReports.length > 0;

  const makeHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));

    if (status && status.trim()) params.set("status", status.trim());
    if (employeeId && employeeId.trim()) {
      params.set("employeeId", employeeId.trim());
    }

    return `/time-reports?${params.toString()}`;
  };

  const formatDate = (value: string | Date) =>
    new Date(value).toLocaleDateString();

  const formatHours = (value: string | number) => {
    if (typeof value === "number") return value.toString();
    return value;
  };

  return (
    <>
      {/* ===== Desktop / Tablet (md and up) ===== */}
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
                  const employeeLabel = r.employee
                    ? `${r.employee.firstName} ${r.employee.lastName}`
                    : r.employeeId;

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
                          className={`badge ${
                            r.status === "APPROVED"
                              ? "bg-success"
                              : r.status === "REJECTED"
                                ? "bg-danger"
                                : r.status === "SUBMITTED"
                                  ? "bg-primary"
                                  : "bg-secondary"
                          }`}
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

      {/* ===== Mobile (< md) ===== */}
      <div className="d-block d-md-none">
        <div className="d-flex flex-column gap-3 mt-3">
          {hasReports ? (
            timeReports.map((r) => {
              const employeeLabel = r.employee
                ? `${r.employee.firstName} ${r.employee.lastName}`
                : r.employeeId;

              return (
                <Link
                  key={r.id}
                  href={`/time-reports/${r.id}`}
                  className="card p-3 text-decoration-none text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold">{employeeLabel}</span>
                    <span className="text-muted small">
                      {formatDate(r.date)}
                    </span>
                  </div>

                  {r.employee?.email && (
                    <div className="text-muted small">{r.employee.email}</div>
                  )}

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <span
                      className={`badge ${
                        r.status === "APPROVED"
                          ? "bg-success"
                          : r.status === "REJECTED"
                            ? "bg-danger"
                            : r.status === "SUBMITTED"
                              ? "bg-primary"
                              : "bg-secondary"
                      }`}
                    >
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

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="time reports"
        makeHref={makeHref}
      />
    </>
  );
}

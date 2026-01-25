import PaginationSummary from "../layout/PaginationSummary";

type ContractEmployee = {
  firstName: string;
  lastName: string;
  email: string;
};

type ContractListItem = {
  id: string;
  employeeId: string;
  status: "OPEN" | "CLOSED" | string;
  startDate: string | Date;
  endDate?: string | Date | null;
  createdAt: string | Date;
  employee?: ContractEmployee | null;
  _count?: {
    timeReports: number;
  };
};

type ContractsListProps = {
  contracts: ContractListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  status?: string;
  employeeId?: string;
};

export default function ContractsList({
  contracts,
  page,
  pageSize,
  total,
  totalPages,
  status,
  employeeId,
}: ContractsListProps) {
  const hasContracts = contracts.length > 0;

  const makeHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));

    if (status && status.trim()) params.set("status", status.trim());
    if (employeeId && employeeId.trim()) {
      params.set("employeeId", employeeId.trim());
    }

    return `/contracts?${params.toString()}`;
  };

  const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString();
  };

  const formatEmployeeLabel = (
    employee: ContractEmployee | null | undefined,
    fallbackEmployeeId: string,
  ) => {
    if (employee) {
      return `${employee.firstName} ${employee.lastName}`;
    }
    return fallbackEmployeeId;
  };

  const formatStatusBadgeClass = (statusValue: string) => {
    if (statusValue === "OPEN") return "bg-success";
    if (statusValue === "CLOSED") return "bg-secondary";
    return "bg-light text-dark";
  };

  const formatTimeReportsCount = (count?: number) => {
    if (typeof count !== "number") return "—";
    return `${count} report${count === 1 ? "" : "s"}`;
  };

  return (
    <>
      {/* ===== Desktop / Tablet (md and up) ===== */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Status</th>
                <th>Start</th>
                <th>End</th>
                <th>Time Reports</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {hasContracts ? (
                contracts.map((c) => {
                  const employeeLabel = formatEmployeeLabel(
                    c.employee,
                    c.employeeId,
                  );
                  const timeReportsCount = c._count?.timeReports ?? undefined;

                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="fw-medium">{employeeLabel}</div>
                        {c.employee?.email && (
                          <div className="text-muted small">
                            {c.employee.email}
                          </div>
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${formatStatusBadgeClass(c.status)}`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td>{formatDate(c.startDate)}</td>
                      <td>{formatDate(c.endDate ?? null)}</td>

                      <td className="text-muted small">
                        {formatTimeReportsCount(timeReportsCount)}
                      </td>

                      <td className="text-muted small">
                        {formatDate(c.createdAt)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No contracts found.
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
          {hasContracts ? (
            contracts.map((c) => {
              const employeeLabel = formatEmployeeLabel(
                c.employee,
                c.employeeId,
              );
              const timeReportsCount = c._count?.timeReports ?? undefined;

              return (
                <div key={c.id} className="card p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold">{employeeLabel}</span>
                    <span className="text-muted small">
                      {formatDate(c.startDate)}
                    </span>
                  </div>

                  {c.employee?.email && (
                    <div className="text-muted small">{c.employee.email}</div>
                  )}

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <span
                      className={`badge ${formatStatusBadgeClass(c.status)}`}
                    >
                      {c.status}
                    </span>

                    <span className="text-muted small">
                      {formatTimeReportsCount(timeReportsCount)}
                    </span>
                  </div>

                  <div className="text-muted small mt-2">
                    End: {formatDate(c.endDate ?? null)}
                  </div>

                  <div className="text-muted small mt-1">
                    Created: {formatDate(c.createdAt)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-muted py-4">
              No contracts found.
            </div>
          )}
        </div>
      </div>

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="contracts"
        makeHref={makeHref}
      />
    </>
  );
}

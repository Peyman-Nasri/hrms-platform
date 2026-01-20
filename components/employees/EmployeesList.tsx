import Link from "next/link";
import PaginationSummary from "../layout/PaginationSummary";

type EmployeeListItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | string;
  workLocation?: string | null;
  createdAt: string | Date;
};

type EmployeesListProps = {
  employees: EmployeeListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  q?: string;
  status?: "ACTIVE" | "INACTIVE";
  workLocation?: string;
};

export default function EmployeesList({
  employees,
  page,
  pageSize,
  total,
  totalPages,
  q,
  status,
  workLocation,
}: EmployeesListProps) {
  const hasEmployees = employees.length > 0;

  const makeHref = (p: number) => {
    const params = new URLSearchParams();
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));
    if (q && q.trim()) params.set("q", q.trim());
    if (status) params.set("status", status);
    if (workLocation && workLocation.trim())
      params.set("workLocation", workLocation.trim());

    return `/employees?${params.toString()}`;
  };

  return (
    <>
      {/* ===== Desktop / Tablet (md and up) ===== */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Work Location</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {hasEmployees ? (
                employees.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link
                        href={`/employees/${e.id}`}
                        className="text-decoration-none fw-medium text-dark"
                      >
                        {e.firstName} {e.lastName}
                      </Link>
                    </td>

                    <td>{e.email}</td>

                    <td>
                      <span
                        className={`badge ${
                          e.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>

                    <td>{e.workLocation ?? "—"}</td>

                    <td className="text-muted small">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No employees found.
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
          {hasEmployees ? (
            employees.map((e) => (
              <Link
                key={e.id}
                href={`/employees/${e.id}`}
                className="card p-3 text-decoration-none text-dark"
              >
                <div className="fw-semibold">
                  {e.firstName} {e.lastName}
                </div>

                <div className="text-muted small">{e.email}</div>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <span
                    className={`badge ${
                      e.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {e.status}
                  </span>

                  <span className="text-muted small">
                    {e.workLocation ?? "—"}
                  </span>
                </div>

                <div className="text-muted small mt-1">
                  Created: {new Date(e.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-muted py-4">
              No employees found.
            </div>
          )}
        </div>
      </div>

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="employees"
        makeHref={makeHref}
      />
    </>
  );
}

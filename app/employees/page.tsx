export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { list } from "@/server/employees/employees.service";
import EmployeesHeader from "@/components/employees/EmployeeHeader";

export default async function EmployeesPage() {
  const employees = await list();

  return (
    <div>
      <EmployeesHeader />

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
              {employees.map((e) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Mobile (< md) ===== */}
      <div className="d-block d-md-none">
        <div className="d-flex flex-column gap-3 mt-3">
          {employees.map((e) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

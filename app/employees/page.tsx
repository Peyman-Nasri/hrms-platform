export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { list } from "@/server/employees/employees.service";

export default async function EmployeesPage() {
  const employees = await list();

  return (
    <div>
      <h1 className="mb-4">Employees</h1>

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
  );
}

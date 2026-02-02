import Link from "next/link";
import type { EmployeesListProps } from "@/types/employees";
import {
  formatDate,
  formatStatusBadgeClass,
} from "@/app/utils/employeesListUtils";

type Props = {
  employees: EmployeesListProps["employees"];
};

export function EmployeesTableView({ employees }: Props) {
  const hasEmployees = employees.length > 0;

  return (
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
                      className={`badge ${formatStatusBadgeClass(e.status)}`}
                    >
                      {e.status}
                    </span>
                  </td>

                  <td>{e.workLocation ?? "—"}</td>

                  <td className="text-muted small">
                    {formatDate(e.createdAt)}
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
  );
}

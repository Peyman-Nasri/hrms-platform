import Link from "next/link";
import type { EmployeesListProps } from "@/types/employees";
import {
  formatDate,
  formatStatusBadgeClass,
} from "@/app/utils/employeesListUtils";

type Props = {
  employees: EmployeesListProps["employees"];
};

export function EmployeesMobileView({ employees }: Props) {
  const hasEmployees = employees.length > 0;

  return (
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
                <span className={`badge ${formatStatusBadgeClass(e.status)}`}>
                  {e.status}
                </span>

                <span className="text-muted small">
                  {e.workLocation ?? "—"}
                </span>
              </div>

              <div className="text-muted small mt-1">
                Created: {formatDate(e.createdAt)}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-muted py-4">No employees found.</div>
        )}
      </div>
    </div>
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { getById } from "@/server/employees/employees.service";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function EmployeeDetailPage({ params }: Props) {
  const { id } = await params;
  const employee = await getById(id);

  if (!employee) {
    return (
      <div className="p-4">
        <h1 className="mb-4">Employee Not Found</h1>
        <Link href="/employees" className="btn btn-secondary">
          Back to Employees
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* ===== Header ===== */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">
          {employee.firstName} {employee.lastName}
        </h1>

        {/* Desktop back button */}
        <Link
          href="/employees"
          className="btn btn-light border d-none d-md-inline-flex"
        >
          ← Back to Employees
        </Link>
      </div>

      {/* Mobile back button */}
      <div className="d-block d-md-none mb-3">
        <Link href="/employees" className="btn btn-outline-secondary w-100">
          ← Back to Employees
        </Link>
      </div>

      {/* ===== Desktop / Tablet layout ===== */}
      <div className="d-none d-md-block">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Basic Information</h5>

            <div className="row">
              <div className="col-md-4">
                <strong>Email</strong>
                <div>{employee.email}</div>
              </div>

              <div className="col-md-4">
                <strong>Status</strong>
                <div>
                  <span
                    className={`badge ${
                      employee.status === "ACTIVE"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {employee.status}
                  </span>
                </div>
              </div>

              <div className="col-md-4">
                <strong>Work Location</strong>
                <div>{employee.workLocation ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile layout ===== */}
      <div className="d-block d-md-none">
        <div className="card mb-3">
          <div className="card-body">
            <div className="mb-3">
              <strong>Email</strong>
              <div className="text-muted">{employee.email}</div>
            </div>

            <div className="mb-3">
              <strong>Status</strong>
              <div>
                <span
                  className={`badge ${
                    employee.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </div>

            <div>
              <strong>Work Location</strong>
              <div className="text-muted">{employee.workLocation ?? "—"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

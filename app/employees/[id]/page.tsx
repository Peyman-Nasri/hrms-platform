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
  const { id } = await params; // ⬅️ IMPORTANT: unwrap the Promise
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
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="mb-0">
          {employee.firstName} {employee.lastName}
        </h1>

        <Link href="/employees" className="btn btn-light border">
          ← Back to Employees
        </Link>
      </div>

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
                    employee.status === "ACTIVE" ? "bg-success" : "bg-secondary"
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
  );
}

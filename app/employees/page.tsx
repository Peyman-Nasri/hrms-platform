import Link from "next/link";
import { prisma } from "@/lib/prisma";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | string;
  workLocation: string | null;
};

export default async function EmployeesPage() {
  const employees: Employee[] = await prisma.employee.findMany({
    orderBy: { lastName: "asc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      status: true,
      email: true,
      workLocation: true,
    },
  });

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

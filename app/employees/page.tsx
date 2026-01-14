import Link from "next/link";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  status: "ACTIVE" | "INACTIVE";
  workLocation: string;
};

export type EmployeesResponse = {
  data: Employee[];
};

async function getEmployees(): Promise<EmployeesResponse> {
  const res = await fetch("http://localhost:3000/api/employees", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  return res.json();
}

export default async function EmployeesPage() {
  const { data } = await getEmployees();

  return (
    <div>
      <h1 className="mb-4">Employees</h1>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Work Location</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e) => (
              <tr key={e.id}>
                <td>
                  <Link
                    href={`/employees/${e.id}`}
                    className="text-decoration-none fw-medium text-dark"
                  >
                    {e.firstName} {e.lastName}
                  </Link>
                </td>

                <td>
                  <span
                    className={`badge ${
                      e.status === "ACTIVE" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>

                <td>{e.workLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

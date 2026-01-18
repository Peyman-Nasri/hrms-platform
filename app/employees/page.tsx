export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { list } from "@/server/employees/employees.service";
import EmployeesHeader from "@/components/employees/EmployeeHeader";
import EmployeesList from "@/components/employees/EmployeesList";

export default async function EmployeesPage() {
  const employees = await list();

  return (
    <div>
      <EmployeesHeader />
      <EmployeesList employees={employees} />
    </div>
  );
}

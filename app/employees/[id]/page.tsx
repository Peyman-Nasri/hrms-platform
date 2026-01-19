export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { getById } from "@/server/employees/employees.service";
import EmployeeDetailHeader from "@/components/employees/EmployeeDetailHeader";
import EmployeeBasicInformation from "@/components/employees/EmployeeBasicInformation";

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
      <EmployeeDetailHeader
        firstName={employee.firstName}
        lastName={employee.lastName}
      />

      <EmployeeBasicInformation
        id={employee.id}
        email={employee.email}
        status={employee.status}
        workLocation={employee.workLocation}
      />
    </div>
  );
}

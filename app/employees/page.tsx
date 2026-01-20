export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPaginated } from "@/server/employees/employees.service";
import EmployeesHeader from "@/components/employees/EmployeesHeader";
import EmployeesList from "@/components/employees/EmployeesList";

type EmployeesPageSearchParams = {
  page?: string;
  pageSize?: string;
};

type EmployeesPageProps = {
  searchParams: Promise<EmployeesPageSearchParams>;
};

export default async function EmployeesPage({
  searchParams,
}: EmployeesPageProps) {
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams.page;
  const pageSizeParam = resolvedSearchParams.pageSize;

  const rawPage = pageParam ? Number(pageParam) : undefined;
  const rawPageSize = pageSizeParam ? Number(pageSizeParam) : undefined;

  const {
    data: employees,
    total,
    totalPages,
    page,
    pageSize,
  } = await listPaginated(rawPage, rawPageSize);

  return (
    <div>
      <EmployeesHeader />
      <EmployeesList
        employees={employees}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}

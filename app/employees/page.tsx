export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPaginated } from "@/server/employees/employees.service";
import EmployeesHeader from "@/components/employees/EmployeesHeader";
import EmployeesList from "@/components/employees/EmployeesList";
import SearchBar from "@/components/layout/SearchBar";

type EmployeesPageSearchParams = {
  page?: string;
  pageSize?: string;
  q?: string;
};

type EmployeesPageProps = {
  searchParams: Promise<EmployeesPageSearchParams>;
};

export default async function EmployeesPage({
  searchParams,
}: EmployeesPageProps) {
  const sp = await searchParams;

  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const {
    data: employees,
    total,
    totalPages,
    page,
    pageSize,
  } = await listPaginated(rawPage, rawPageSize, q);

  return (
    <div>
      <EmployeesHeader />

      <SearchBar paramKey="q" className="mb-3" />

      <EmployeesList
        employees={employees}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        q={q}
      />
    </div>
  );
}

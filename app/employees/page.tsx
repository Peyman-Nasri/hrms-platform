export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import {
  getEmployeeFilterOptions,
  listPaginated,
} from "@/server/employees/employees.service";

import EmployeesHeader from "@/components/employees/EmployeesHeader";
import EmployeesList from "@/components/employees/EmployeesList";
import SearchBar from "@/components/layout/SearchBar";
import FilterSelect from "@/components/layout/FilterSection";

import type {
  EmployeesPageProps,
  EmployeesPageSearchParams,
  EmployeeStatusFilter,
} from "@/types/employees";

export default async function EmployeesPage({
  searchParams,
}: EmployeesPageProps) {
  const sp: EmployeesPageSearchParams = await searchParams;

  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status as EmployeeStatusFilter | undefined;
  const status =
    statusParam === "ACTIVE" || statusParam === "INACTIVE"
      ? statusParam
      : undefined;

  const workLocationParam = sp.workLocation ?? "";

  const [
    { data: employees, total, totalPages, page, pageSize },
    filterOptions,
  ] = await Promise.all([
    listPaginated(rawPage, rawPageSize, q, status, workLocationParam),
    getEmployeeFilterOptions(),
  ]);

  const workLocationOptions = filterOptions.workLocations.map((loc) => ({
    label: loc,
    value: loc,
  }));

  return (
    <div>
      <EmployeesHeader />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch gap-2 mb-3">
        <div className="flex-grow-1">
          <SearchBar paramKey="q" />
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
          <FilterSelect
            paramKey="status"
            options={[
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ]}
            emptyLabel="All Statuses"
            allowEmpty
          />

          <FilterSelect
            paramKey="workLocation"
            options={workLocationOptions}
            emptyLabel="All Locations"
            allowEmpty
          />
        </div>
      </div>

      <EmployeesList
        employees={employees}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        q={q}
        status={status}
        workLocation={workLocationParam}
      />
    </div>
  );
}

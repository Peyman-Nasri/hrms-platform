export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import {
  getEmployeeFilterOptions,
  listPaginated,
} from "@/server/employees/employees.service";

import EmployeesHeader from "@/components/features/employees/EmployeesHeader";
import EmployeesList from "@/components/features/employees/EmployeesList";
import SearchBar from "@/components/shared/SearchBar";
import FilterSelect from "@/components/shared/FilterSection";
import type { EmployeesPageProps } from "@/types/employees";
import {
  EMPLOYEE_STATUS_OPTIONS,
  parseEmployeeSearchParams,
} from "../constants/employees";

export default async function EmployeesPage({
  searchParams,
}: EmployeesPageProps) {
  const sp = await searchParams;

  const { rawPage, rawPageSize, q, status, workLocation } =
    parseEmployeeSearchParams(sp);

  const [
    { data: employees, total, totalPages, page, pageSize },
    filterOptions,
  ] = await Promise.all([
    listPaginated(rawPage, rawPageSize, q, status, workLocation),
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
            options={EMPLOYEE_STATUS_OPTIONS}
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
        workLocation={workLocation}
      />
    </div>
  );
}

import type { EmployeesListProps } from "@/types/employees";
import { EmployeesTableView } from "./EmployeesTableView";
import { EmployeesMobileView } from "./EmployeesMobileView";
import { buildEmployeesHref } from "@/app/utils/employees";
import PaginationSummary from "@/components/shared/PaginationSummary";

export default function EmployeesList({
  employees,
  page,
  pageSize,
  total,
  totalPages,
  q,
  status,
  workLocation,
}: EmployeesListProps) {
  const makeHref = (p: number) =>
    buildEmployeesHref({ page: p, pageSize, q, status, workLocation });

  return (
    <>
      <EmployeesTableView employees={employees} />
      <EmployeesMobileView employees={employees} />

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="employees"
        makeHref={makeHref}
      />
    </>
  );
}

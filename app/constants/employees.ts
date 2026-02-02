import type {
  EmployeesPageSearchParams,
  EmployeeStatusFilter,
} from "@/types/employees";

export const EMPLOYEE_STATUS_OPTIONS: Array<{
  label: string;
  value: EmployeeStatusFilter;
}> = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export function parseEmployeeSearchParams(sp: EmployeesPageSearchParams) {
  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status as EmployeeStatusFilter | undefined;
  const status =
    statusParam === "ACTIVE" || statusParam === "INACTIVE"
      ? statusParam
      : undefined;

  const workLocation = sp.workLocation ?? "";

  return {
    rawPage,
    rawPageSize,
    q,
    status,
    workLocation,
  };
}

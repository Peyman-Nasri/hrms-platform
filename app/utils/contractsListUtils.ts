import type { ContractEmployee } from "@/types/contracts";

export function buildContractsHref(params: {
  page: number;
  pageSize: number;
  status?: string;
  employeeId?: string;
}) {
  const search = new URLSearchParams();

  search.set("page", String(params.page));
  search.set("pageSize", String(params.pageSize));

  if (params.status?.trim()) {
    search.set("status", params.status.trim());
  }

  if (params.employeeId?.trim()) {
    search.set("employeeId", params.employeeId.trim());
  }

  return `/contracts?${search.toString()}`;
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export function formatEmployeeLabel(
  employee: ContractEmployee | null | undefined,
  fallbackEmployeeId: string,
) {
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
  return fallbackEmployeeId;
}

export function formatStatusBadgeClass(statusValue: string) {
  if (statusValue === "OPEN") return "bg-success";
  if (statusValue === "CLOSED") return "bg-secondary";
  return "bg-light text-dark";
}

export function formatTimeReportsCount(count?: number) {
  if (typeof count !== "number") return "—";
  return `${count} report${count === 1 ? "" : "s"}`;
}

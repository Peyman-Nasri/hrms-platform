import type { EmployeeStatusFilter } from "@/types/employees";

export function buildEmployeesHref(params: {
  page: number;
  pageSize: number;
  q?: string;
  status?: EmployeeStatusFilter;
  workLocation?: string;
}) {
  const search = new URLSearchParams();

  search.set("page", String(params.page));
  search.set("pageSize", String(params.pageSize));

  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.status) search.set("status", params.status);
  if (params.workLocation?.trim()) {
    search.set("workLocation", params.workLocation.trim());
  }

  return `/employees?${search.toString()}`;
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export function formatStatusBadgeClass(status: string) {
  return status === "ACTIVE" ? "bg-success" : "bg-secondary";
}

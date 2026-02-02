import type { TimeReportsListProps } from "@/types/time-reports";

type TimeReportItem = TimeReportsListProps["timeReports"][number];

export function buildTimeReportsHref(params: {
  page: number;
  pageSize: number;
  status?: string;
  employeeId?: string;
}) {
  const search = new URLSearchParams();

  search.set("page", String(params.page));
  search.set("pageSize", String(params.pageSize));

  if (params.status?.trim()) search.set("status", params.status.trim());
  if (params.employeeId?.trim()) {
    search.set("employeeId", params.employeeId.trim());
  }

  return `/time-reports?${search.toString()}`;
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export function formatHours(value: string | number) {
  if (typeof value === "number") return value.toString();
  return value;
}

export function formatStatusBadgeClass(status: string) {
  if (status === "APPROVED") return "bg-success";
  if (status === "REJECTED") return "bg-danger";
  if (status === "SUBMITTED") return "bg-primary";
  return "bg-secondary";
}

export function formatEmployeeLabel(report: TimeReportItem) {
  if (report.employee) {
    return `${report.employee.firstName} ${report.employee.lastName}`;
  }
  return report.employeeId;
}

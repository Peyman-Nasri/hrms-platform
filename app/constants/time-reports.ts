import type {
  TimeReportsPageSearchParams,
  TimeReportStatusFilter,
} from "@/types/time-reports";

export const TIME_REPORT_STATUS_OPTIONS: Array<{
  label: string;
  value: TimeReportStatusFilter;
}> = [
  { label: "Draft", value: "DRAFT" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export function parseTimeReportsSearchParams(sp: TimeReportsPageSearchParams) {
  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status as TimeReportStatusFilter | undefined;
  const status =
    statusParam === "DRAFT" ||
    statusParam === "SUBMITTED" ||
    statusParam === "APPROVED" ||
    statusParam === "REJECTED"
      ? statusParam
      : undefined;

  const employeeId = sp.employeeId || undefined;

  return {
    rawPage,
    rawPageSize,
    q,
    status,
    employeeId,
  };
}

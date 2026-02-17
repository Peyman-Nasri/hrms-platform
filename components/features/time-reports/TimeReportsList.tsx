import type { TimeReportsListProps } from "@/types/time-reports";
import { TimeReportsTableView } from "./TimeReportsTableView";
import { TimeReportsMobileView } from "./TimeReportsMobileView";
import { buildTimeReportsHref } from "@/app/utils/time-reports";
import PaginationSummary from "@/components/shared/PaginationSummary";

export default function TimeReportsList({
  timeReports,
  page,
  pageSize,
  total,
  totalPages,
  status,
  employeeId,
}: TimeReportsListProps) {
  const makeHref = (p: number) =>
    buildTimeReportsHref({ page: p, pageSize, status, employeeId });

  return (
    <>
      <TimeReportsTableView timeReports={timeReports} />
      <TimeReportsMobileView timeReports={timeReports} />

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="time reports"
        makeHref={makeHref}
      />
    </>
  );
}

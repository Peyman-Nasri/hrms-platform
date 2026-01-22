export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPaginated } from "@/server/time-report/time-report.service";
import TimeReportsHeader from "@/components/time-reports/TimeReportsHeader";
import TimeReportsList from "@/components/time-reports/TimeReportsList";
import FilterSelect from "@/components/layout/FilterSection";
import { Prisma } from "@prisma/client";

type TimeReportsPageSearchParams = {
  page?: string;
  pageSize?: string;
  status?: string;
  employeeId?: string;
};

type TimeReportsPageProps = {
  searchParams: Promise<TimeReportsPageSearchParams>;
};

export default async function TimeReportsPage({
  searchParams,
}: TimeReportsPageProps) {
  const sp = await searchParams;

  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;

  const statusParam = sp.status;
  const status =
    statusParam === "DRAFT" ||
    statusParam === "SUBMITTED" ||
    statusParam === "APPROVED" ||
    statusParam === "REJECTED"
      ? statusParam
      : undefined;

  const employeeId = sp.employeeId || undefined;

  const {
    data: timeReportsRaw,
    total,
    totalPages,
    page,
    pageSize,
  } = await listPaginated(rawPage, rawPageSize, employeeId, status);

  const timeReports = timeReportsRaw.map((r) => ({
    ...r,
    hours:
      r.hours instanceof Prisma.Decimal ? r.hours.toNumber() : Number(r.hours),
  }));

  const statusOptions = [
    { label: "Draft", value: "DRAFT" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  return (
    <div>
      <TimeReportsHeader />

      <div className="d-flex flex-wrap gap-2 justify-content-md-end mb-3">
        <FilterSelect
          paramKey="status"
          options={statusOptions}
          emptyLabel="All statuses"
          allowEmpty
        />
      </div>

      <TimeReportsList
        timeReports={timeReports}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        status={status ?? ""}
        employeeId={employeeId ?? ""}
      />
    </div>
  );
}

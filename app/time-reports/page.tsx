export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Prisma } from "@prisma/client";
import { listPaginated } from "@/server/time-report/time-report.service";
import TimeReportsHeader from "@/components/time-reports/TimeReportsHeader";
import TimeReportsList from "@/components/time-reports/TimeReportsList";
import FilterSelect from "@/components/layout/FilterSection";
import SearchBar from "@/components/layout/SearchBar";
import { listEmployees } from "@/server/employees/employees.repo";
import { listContracts } from "@/server/contracts/contracts.repo";

type TimeReportsPageSearchParams = {
  page?: string;
  pageSize?: string;
  status?: string;
  employeeId?: string;
  q?: string;
};

type TimeReportsPageProps = {
  searchParams: Promise<TimeReportsPageSearchParams>;
};

type EmployeeWithContracts = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contracts: {
    id: string;
    name: string;
  }[];
};

type TimeReportWithEmployeeAndContract = Prisma.TimeReportGetPayload<{
  include: {
    employee: true;
    contract: true;
  };
}>;

export default async function TimeReportsPage({
  searchParams,
}: TimeReportsPageProps) {
  const sp = await searchParams;

  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status;
  const status =
    statusParam === "DRAFT" ||
    statusParam === "SUBMITTED" ||
    statusParam === "APPROVED" ||
    statusParam === "REJECTED"
      ? statusParam
      : undefined;

  const employeeId = sp.employeeId || undefined;

  const [
    { data: timeReportsRawBase, total, totalPages, page, pageSize },
    employeesRaw,
    contractsRaw,
  ] = await Promise.all([
    listPaginated(rawPage, rawPageSize, employeeId, q, status),
    listEmployees({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    }),
    listContracts({
      select: {
        id: true,
        name: true,
        employeeId: true,
      },
    }),
  ]);

  const timeReportsRaw =
    timeReportsRawBase as TimeReportWithEmployeeAndContract[];

  const employeesMap = new Map<string, EmployeeWithContracts>();

  for (const e of employeesRaw) {
    employeesMap.set(e.id, {
      id: e.id,
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      contracts: [],
    });
  }

  for (const c of contractsRaw) {
    const entry = employeesMap.get(c.employeeId);
    if (!entry) continue;

    const exists = entry.contracts.some((k) => k.id === c.id);
    if (!exists) {
      entry.contracts.push({
        id: c.id,
        name: c.name,
      });
    }
  }

  const employeesWithContracts = Array.from(employeesMap.values());

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
      <TimeReportsHeader employeesWithContracts={employeesWithContracts} />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch gap-2 mb-3">
        <div className="flex-grow-1">
          <SearchBar paramKey="q" />
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
          <FilterSelect
            paramKey="status"
            options={statusOptions}
            emptyLabel="All Statuses"
            allowEmpty
          />
        </div>
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

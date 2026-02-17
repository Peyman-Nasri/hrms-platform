export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { getById } from "@/server/time-report/time-report.service";
import TimeReportDetailHeader from "@/components/features/time-reports/TimeReportDetailHeader";
import TimeReportBasicInformation from "@/components/features/time-reports/TimeReportBasicInformation";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async function TimeReportDetailPage({ params }: Props) {
  const { id } = await params;
  const timeReport = await getById(id);

  if (!timeReport) {
    return (
      <div className="p-4">
        <h1 className="mb-4">Time Report Not Found</h1>
        <Link href="/time-reports" className="btn btn-secondary">
          Back to Time Reports
        </Link>
      </div>
    );
  }

  const employeeName = timeReport.employee
    ? `${timeReport.employee.firstName} ${timeReport.employee.lastName}`
    : "Unknown employee";

  const hours =
    timeReport.hours instanceof Prisma.Decimal
      ? timeReport.hours.toNumber()
      : Number(timeReport.hours);

  return (
    <div>
      <TimeReportDetailHeader employeeName={employeeName} />

      <TimeReportBasicInformation
        id={timeReport.id}
        employeeName={employeeName}
        employeeEmail={timeReport.employee?.email ?? ""}
        status={timeReport.status}
        date={timeReport.date}
        hours={hours}
        description={timeReport.description}
        contract={timeReport.contract}
      />
    </div>
  );
}

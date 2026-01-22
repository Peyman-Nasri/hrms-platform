import { normalizePage, normalizePageSize } from "@/app/lib/pagination";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type TimeReportStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

type ListTimeReportsPaginatedOptions = {
  page?: number;
  pageSize?: number;
  employeeId?: string;
  status?: TimeReportStatus;
  dateFrom?: Date;
  dateTo?: Date;
  select?: Prisma.TimeReportSelect;
};

export async function listTimeReportsPaginated({
  page,
  pageSize,
  employeeId,
  status,
  dateFrom,
  dateTo,
  select,
}: ListTimeReportsPaginatedOptions = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);

  const andConditions: Prisma.TimeReportWhereInput[] = [];

  if (employeeId) {
    andConditions.push({ employeeId });
  }

  if (status) {
    andConditions.push({ status });
  }

  if (dateFrom || dateTo) {
    andConditions.push({
      date: {
        ...(dateFrom ? { gte: dateFrom } : {}),
        ...(dateTo ? { lte: dateTo } : {}),
      },
    });
  }

  const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

  const [total, reports] = await Promise.all([
    prisma.timeReport.count({ where }),
    prisma.timeReport.findMany({
      where,
      select,
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const finalPage = Math.min(safePage, totalPages);

  const data =
    finalPage === safePage
      ? reports
      : await prisma.timeReport.findMany({
          where,
          select,
          orderBy: [{ date: "desc" }, { createdAt: "desc" }],
          skip: (finalPage - 1) * safePageSize,
          take: safePageSize,
        });

  return {
    data,
    total,
    page: finalPage,
    pageSize: safePageSize,
    totalPages,
    employeeId: employeeId ?? "",
    status: status ?? "",
    dateFrom: dateFrom ?? null,
    dateTo: dateTo ?? null,
  };
}

export function listTimeReports(args?: Prisma.TimeReportFindManyArgs) {
  return prisma.timeReport.findMany({
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    ...args,
  });
}

export function getTimeReportById(
  id: string,
  args?: Omit<Prisma.TimeReportFindUniqueArgs, "where">,
) {
  return prisma.timeReport.findUnique({
    ...(args ?? {}),
    where: { id },
  });
}

export function createTimeReport(data: Prisma.TimeReportCreateInput) {
  return prisma.timeReport.create({ data });
}

export function updateTimeReport(
  id: string,
  data: Prisma.TimeReportUpdateInput,
) {
  return prisma.timeReport.update({ where: { id }, data });
}

export function deleteTimeReport(id: string) {
  return prisma.timeReport.delete({ where: { id } });
}

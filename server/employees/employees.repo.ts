import { normalizePage, normalizePageSize } from "@/app/utils/pagination";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ListEmployeesPaginatedOptions = {
  page?: number;
  pageSize?: number;
  q?: string;
  status?: "ACTIVE" | "INACTIVE";
  workLocation?: string;
  select?: Prisma.EmployeeSelect;
};

export async function listDistinctWorkLocations(): Promise<string[]> {
  const rows = await prisma.employee.findMany({
    where: {
      workLocation: {
        not: null,
      },
    },
    select: {
      workLocation: true,
    },
    distinct: ["workLocation"],
    orderBy: {
      workLocation: "asc",
    },
  });

  return rows.map((r) => r.workLocation).filter((loc): loc is string => !!loc);
}

export async function listEmployeesPaginated({
  page,
  pageSize,
  q,
  status,
  workLocation,
  select,
}: ListEmployeesPaginatedOptions = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);

  const query = q?.trim();
  const workLocQuery = workLocation?.trim();

  const andConditions: Prisma.EmployeeWhereInput[] = [];

  if (status === "ACTIVE" || status === "INACTIVE") {
    andConditions.push({ status });
  }

  if (workLocQuery) {
    andConditions.push({
      workLocation: {
        contains: workLocQuery,
        mode: "insensitive",
      },
    });
  }

  if (query) {
    andConditions.push({
      OR: [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { workLocation: { contains: query, mode: "insensitive" } },
      ],
    });
  }

  const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

  const [total, employees] = await Promise.all([
    prisma.employee.count({ where }),
    prisma.employee.findMany({
      where,
      select,
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const finalPage = Math.min(safePage, totalPages);

  const data =
    finalPage === safePage
      ? employees
      : await prisma.employee.findMany({
          where,
          select,
          orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
          skip: (finalPage - 1) * safePageSize,
          take: safePageSize,
        });

  return {
    data,
    total,
    page: finalPage,
    pageSize: safePageSize,
    totalPages,
    q: query ?? "",
    status: status ?? "",
    workLocation: workLocQuery ?? "",
  };
}

export function listEmployees(args?: Prisma.EmployeeFindManyArgs) {
  return prisma.employee.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    ...args,
  });
}

export function getEmployeeById(
  id: string,
  args?: Omit<Prisma.EmployeeFindUniqueArgs, "where">,
) {
  return prisma.employee.findUnique({
    ...(args ?? {}),
    where: { id },
  });
}

export function createEmployee(data: Prisma.EmployeeCreateInput) {
  return prisma.employee.create({ data });
}

export function updateEmployee(id: string, data: Prisma.EmployeeUpdateInput) {
  return prisma.employee.update({ where: { id }, data });
}

export function deleteEmployee(id: string) {
  return prisma.employee.delete({ where: { id } });
}

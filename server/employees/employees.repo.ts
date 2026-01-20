import { normalizePage, normalizePageSize } from "@/app/lib/pagination";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ListEmployeesPaginatedOptions = {
  page?: number;
  pageSize?: number;
  where?: Prisma.EmployeeWhereInput;
  select?: Prisma.EmployeeSelect;
  q?: string;
};

export async function listEmployeesPaginated({
  page,
  pageSize,
  q,
  select,
}: ListEmployeesPaginatedOptions = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);

  const query = q?.trim();
  const where: Prisma.EmployeeWhereInput | undefined = query
    ? {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { workLocation: { contains: query, mode: "insensitive" } },
        ],
      }
    : undefined;

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

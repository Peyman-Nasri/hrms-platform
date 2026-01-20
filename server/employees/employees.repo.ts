import { normalizePage, normalizePageSize } from "@/app/lib/pagination";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ListEmployeesPaginatedOptions = {
  page?: number;
  pageSize?: number;
  where?: Prisma.EmployeeWhereInput;
  select?: Prisma.EmployeeSelect;
};

export async function listEmployeesPaginated({
  page,
  pageSize,
  where,
  select,
}: ListEmployeesPaginatedOptions = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);

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

  return {
    data: employees,
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
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

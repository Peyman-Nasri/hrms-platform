import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export function listEmployees(args?: Prisma.EmployeeFindManyArgs) {
  return prisma.employee.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    ...args,
  });
}

export function getEmployeeById(
  id: string,
  args?: Omit<Prisma.EmployeeFindUniqueArgs, "where">
) {
  return prisma.employee.findUnique({
    where: { id },
    ...args,
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

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalEmployees, activeEmployees, openContracts] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({
      where: { status: "ACTIVE" },
    }),
    prisma.contract.count({
      where: { status: "OPEN" },
    }),
  ]);

  return {
    totalEmployees,
    activeEmployees,
    openContracts,
  };
}

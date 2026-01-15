import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export function listContracts(args?: Prisma.ContractFindManyArgs) {
  return prisma.contract.findMany({
    orderBy: [{ startDate: "desc" }],
    ...args,
  });
}

export function getContractById(id: string) {
  return prisma.contract.findUnique({ where: { id } });
}

export function createContract(data: Prisma.ContractCreateInput) {
  return prisma.contract.create({ data });
}

export function updateContract(id: string, data: Prisma.ContractUpdateInput) {
  return prisma.contract.update({ where: { id }, data });
}

export function deleteContract(id: string) {
  return prisma.contract.delete({ where: { id } });
}

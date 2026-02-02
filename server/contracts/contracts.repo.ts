import { normalizePage, normalizePageSize } from "@/app/utils/pagination";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type ContractStatus = "OPEN" | "CLOSED";

type ListContractsPaginatedOptions = {
  page?: number;
  pageSize?: number;
  employeeId?: string;
  status?: ContractStatus;
  dateFrom?: Date;
  dateTo?: Date;
  select?: Prisma.ContractSelect;
  q?: string;
};

export async function listContractsPaginated({
  page,
  pageSize,
  employeeId,
  status,
  dateFrom,
  dateTo,
  q,
  select,
}: ListContractsPaginatedOptions = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);
  const query = q?.trim();

  const andConditions: Prisma.ContractWhereInput[] = [];

  if (employeeId) {
    andConditions.push({ employeeId });
  }

  if (status) {
    andConditions.push({ status });
  }

  if (dateFrom || dateTo) {
    andConditions.push({
      startDate: {
        ...(dateFrom ? { gte: dateFrom } : {}),
        ...(dateTo ? { lte: dateTo } : {}),
      },
    });
  }

  if (query) {
    andConditions.push({
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { employee: { firstName: { contains: query, mode: "insensitive" } } },
        { employee: { lastName: { contains: query, mode: "insensitive" } } },
        { employee: { email: { contains: query, mode: "insensitive" } } },
      ],
    });
  }

  const where = andConditions.length > 0 ? { AND: andConditions } : undefined;

  const [total, contracts] = await Promise.all([
    prisma.contract.count({ where }),
    prisma.contract.findMany({
      where,
      select,
      orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
      skip: (safePage - 1) * safePageSize,
      take: safePageSize,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const finalPage = Math.min(safePage, totalPages);

  const data =
    finalPage === safePage
      ? contracts
      : await prisma.contract.findMany({
          where,
          select,
          orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
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
    employeeId: employeeId ?? "",
    status: status ?? "",
    dateFrom: dateFrom ?? null,
    dateTo: dateTo ?? null,
  };
}

export function listContracts(args?: Prisma.ContractFindManyArgs) {
  return prisma.contract.findMany({
    orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
    ...args,
  });
}

export function getContractById(
  id: string,
  args?: Omit<Prisma.ContractFindUniqueArgs, "where">,
) {
  return prisma.contract.findUnique({
    ...(args ?? {}),
    where: { id },
  });
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

import {
  CreateContractSchema,
  UpdateContractSchema,
} from "./contracts.schemas";
import * as repo from "./contracts.repo";
import { listContractsPaginated } from "./contracts.repo";
import { Prisma } from "@prisma/client";

type ContractStatus = "OPEN" | "CLOSED";

type ContractWithRelations = Prisma.ContractGetPayload<{
  include: {
    employee: true;
    timeReports: true;
  };
}>;

export async function listPaginated(
  page?: number,
  pageSize?: number,
  employeeId?: string,
  q?: string,
  status?: ContractStatus,
  dateFrom?: Date,
  dateTo?: Date,
) {
  return listContractsPaginated({
    page,
    pageSize,
    employeeId,
    status,
    dateFrom,
    dateTo,
    q,
    select: {
      id: true,
      name: true,
      employeeId: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
      employee: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      _count: {
        select: {
          timeReports: true,
        },
      },
    },
  });
}

export async function list() {
  return repo.listContracts({
    select: {
      id: true,
      name: true,
      employeeId: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getById(
  id: string | undefined,
): Promise<ContractWithRelations | null> {
  if (!id) return null;

  return repo.getContractById(id, {
    include: {
      employee: true,
      timeReports: true,
    },
  }) as Promise<ContractWithRelations | null>;
}

export async function create(input: unknown) {
  const data = CreateContractSchema.parse(input);

  return repo.createContract({
    name: data.name,
    employee: { connect: { id: data.employeeId } },
    status: data.status ?? "OPEN",
    startDate: data.startDate,
    endDate: data.endDate ?? null,
  });
}

export async function update(id: string, input: unknown) {
  const data = UpdateContractSchema.parse(input);

  return repo.updateContract(id, {
    name: data.name,
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate === undefined ? undefined : data.endDate,
  });
}

export async function remove(id: string) {
  return repo.deleteContract(id);
}

import {
  CreateContractSchema,
  UpdateContractSchema,
} from "./contracts.schemas";
import * as repo from "./contracts.repo";

export async function create(input: unknown) {
  const data = CreateContractSchema.parse(input);

  if (data.endDate && data.endDate < data.startDate) {
    throw new Error("endDate must be after startDate");
  }

  return repo.createContract({
    employee: { connect: { id: data.employeeId } },
    status: data.status ?? "OPEN",
    startDate: data.startDate,
    endDate: data.endDate ?? null,
  });
}

export async function update(id: string, input: unknown) {
  const data = UpdateContractSchema.parse(input);

  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    throw new Error("endDate must be after startDate");
  }

  return repo.updateContract(id, {
    ...data,
    endDate: data.endDate ?? undefined,
  });
}

export async function remove(id: string) {
  return repo.deleteContract(id);
}

import {
  CreateEmployeeSchema,
  UpdateEmployeeBasicSchema,
} from "./employees.schemas";
import * as repo from "./employees.repo";
import {
  listDistinctWorkLocations,
  listEmployeesPaginated,
} from "./employees.repo";

export async function getEmployeeFilterOptions() {
  const workLocations = await listDistinctWorkLocations();

  return {
    workLocations,
  };
}

export async function listPaginated(
  page?: number,
  pageSize?: number,
  q?: string,
  status?: "ACTIVE" | "INACTIVE",
  workLocation?: string,
) {
  return listEmployeesPaginated({
    page,
    pageSize,
    q,
    status,
    workLocation,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      workLocation: true,
      createdAt: true,
    },
  });
}

export async function list() {
  return repo.listEmployees({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      workLocation: true,
      createdAt: true,
    },
  });
}

export async function getById(id: string | undefined) {
  if (!id) return null;

  return repo.getEmployeeById(id, {
    include: { contracts: true },
  });
}

export async function create(input: unknown) {
  const data = CreateEmployeeSchema.parse(input);
  return repo.createEmployee({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    status: data.status ?? "ACTIVE",
    workLocation: data.workLocation ?? null,
  });
}

export async function update(id: string, input: unknown) {
  const data = UpdateEmployeeBasicSchema.parse(input);

  return repo.updateEmployee(id, {
    status: data.status,
    workLocation: data.workLocation === "" ? null : (data.workLocation ?? null),
  });
}

export async function remove(id: string) {
  return repo.deleteEmployee(id);
}

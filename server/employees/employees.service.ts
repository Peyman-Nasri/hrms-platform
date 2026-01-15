import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
} from "./employees.schemas";
import * as repo from "./employees.repo";

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

export async function getById(id: string) {
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
  const data = UpdateEmployeeSchema.parse(input);
  return repo.updateEmployee(id, {
    ...data,
    // normalize empty strings if needed
    workLocation: data.workLocation === "" ? null : data.workLocation,
  });
}

export async function remove(id: string) {
  return repo.deleteEmployee(id);
}

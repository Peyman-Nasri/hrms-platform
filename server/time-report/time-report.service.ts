import {
  CreateTimeReportSchema,
  UpdateTimeReportSchema,
} from "./time-report.schema";
import * as repo from "./time-report.repo";
import { listTimeReportsPaginated } from "./time-report.repo";

export async function listPaginated(
  page?: number,
  pageSize?: number,
  employeeId?: string,
  status?: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED",
  dateFrom?: Date,
  dateTo?: Date,
) {
  return listTimeReportsPaginated({
    page,
    pageSize,
    employeeId,
    status,
    dateFrom,
    dateTo,
    select: {
      id: true,
      employeeId: true,
      contractId: true,
      date: true,
      hours: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      employee: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      contract: {
        select: {
          id: true,
          status: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });
}

export async function list() {
  return repo.listTimeReports({
    select: {
      id: true,
      employeeId: true,
      contractId: true,
      date: true,
      hours: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getById(id: string | undefined) {
  if (!id) return null;

  return repo.getTimeReportById(id, {
    include: {
      employee: true,
      contract: true,
    },
  });
}

export async function create(input: unknown) {
  const data = CreateTimeReportSchema.parse(input);

  return repo.createTimeReport({
    employee: {
      connect: { id: data.employeeId },
    },
    contract: data.contractId
      ? { connect: { id: data.contractId } }
      : undefined,
    date: data.date,
    hours: data.hours,
    description: data.description ?? null,
    status: data.status ?? "DRAFT",
  });
}

export async function update(id: string, input: unknown) {
  const data = UpdateTimeReportSchema.parse(input);

  return repo.updateTimeReport(id, {
    date: data.date,
    hours: data.hours,
    description:
      data.description === undefined ? undefined : (data.description ?? null),
    status: data.status,
  });
}

export async function remove(id: string) {
  return repo.deleteTimeReport(id);
}

import {
  CreateTimeReportSchema,
  UpdateTimeReportSchema,
} from "@/server/time-report/time-report.schema";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export type TimeReportStatusFilter =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED";

export type TimeReportsPageSearchParams = {
  page?: string;
  pageSize?: string;
  status?: string;
  employeeId?: string;
  q?: string;
};

export type TimeReportsPageProps = {
  searchParams: Promise<TimeReportsPageSearchParams>;
};

export type EmployeeWithContracts = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contracts: {
    id: string;
    name: string;
  }[];
};

export type TimeReportWithEmployeeAndContract = Prisma.TimeReportGetPayload<{
  include: {
    employee: true;
    contract: true;
  };
}>;

export type UpdateTimeReportInput = z.infer<typeof UpdateTimeReportSchema>;

export type TimeReportContract = {
  id: string;
  name: string;
  employeeId: string;
  status: "OPEN" | "CLOSED";
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TimeReportBasicInformationProps = {
  id: string;
  employeeName: string;
  employeeEmail: string;
  status: UpdateTimeReportInput["status"];
  date: Date;
  hours: number;
  description?: string | null;
  contract?: TimeReportContract | null;
};

export type TimeReportDetailHeaderProps = {
  employeeName: string;
};

export type TimeReportsHeaderProps = {
  employeesWithContracts: EmployeeWithContracts[];
};

export type TimeReportEmployee = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TimeReportListItem = {
  id: string;
  employeeId: string;
  contractId?: string | null;
  date: string | Date;
  hours: string | number;
  description?: string | null;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | string;
  createdAt: string | Date;
  employee?: TimeReportEmployee | null;
};

export type TimeReportsListProps = {
  timeReports: TimeReportListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  status?: string;
  employeeId?: string;
};

export type TimeReportBasicInformationFormProps = {
  id: string;
  employeeName: string;
  employeeEmail: string;
  initialStatus: UpdateTimeReportInput["status"];
  initialDate: Date;
  initialHours: number;
  initialDescription: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
};

export type CreateTimeReportInput = z.infer<typeof CreateTimeReportSchema>;

export type TimeReportCreateFormProps = {
  onCreated: () => void;
  employeesWithContracts: EmployeeWithContracts[];
};

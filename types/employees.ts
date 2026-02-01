import {
  CreateEmployeeSchema,
  UpdateEmployeeBasicSchema,
} from "@/server/employees/employees.schemas";
import { z } from "zod";

export type EmployeeStatusFilter = "ACTIVE" | "INACTIVE";

export type EmployeesPageSearchParams = {
  page?: string;
  pageSize?: string;
  q?: string;
  status?: string;
  workLocation?: string;
};

export type EmployeesPageProps = {
  searchParams: Promise<EmployeesPageSearchParams>;
};

export type UpdateEmployeeBasicInput = z.infer<
  typeof UpdateEmployeeBasicSchema
>;

export type EmployeeBasicInformationProps = {
  id: string;
  email: string;
  status: UpdateEmployeeBasicInput["status"];
  workLocation?: UpdateEmployeeBasicInput["workLocation"] | null;
};

export type EmployeeDetailHeaderProps = {
  firstName: string;
  lastName: string;
};

export type EmployeeListItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | string;
  workLocation?: string | null;
  createdAt: string | Date;
};

export type EmployeesListProps = {
  employees: EmployeeListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  q?: string;
  status?: "ACTIVE" | "INACTIVE";
  workLocation?: string;
};

export type EmployeeBasicInformationFormProps = {
  id: string;
  email: string;
  initialStatus: UpdateEmployeeBasicInput["status"];
  initialWorkLocation?: UpdateEmployeeBasicInput["workLocation"] | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
};

export type CreateEmployeeInput = z.infer<typeof CreateEmployeeSchema>;

export type EmployeeCreateFormProps = {
  onCreated: () => void;
};

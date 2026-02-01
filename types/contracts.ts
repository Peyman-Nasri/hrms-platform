import { CreateContractSchema } from "@/server/contracts/contracts.schemas";
import { z } from "zod";

export type ContractStatusFilter = "OPEN" | "CLOSED";

export type ContractsPageSearchParams = {
  page?: string;
  pageSize?: string;
  status?: string;
  employeeId?: string;
  q?: string;
};

export type ContractsPageProps = {
  searchParams: Promise<ContractsPageSearchParams>;
};

export type ContractEmployee = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ContractListItem = {
  id: string;
  name: string;
  employeeId: string;
  status: "OPEN" | "CLOSED" | string;
  startDate: string | Date;
  endDate?: string | Date | null;
  createdAt: string | Date;
  employee?: ContractEmployee | null;
  _count?: {
    timeReports: number;
  };
};

export type ContractsListProps = {
  contracts: ContractListItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  status?: string;
  employeeId?: string;
};

export type EmployeeOption = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ContractsHeaderProps = {
  employees: EmployeeOption[];
};

export type CreateContractInput = z.infer<typeof CreateContractSchema>;

export type ContractCreateFormProps = {
  onCreated: () => void;
  employees: EmployeeOption[];
};

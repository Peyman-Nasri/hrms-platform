import type {
  ContractsPageSearchParams,
  ContractStatusFilter,
} from "@/types/contracts";

export const CONTRACT_STATUS_OPTIONS: Array<{
  label: string;
  value: ContractStatusFilter;
}> = [
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
];

export function parseContractSearchParams(sp: ContractsPageSearchParams) {
  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status as ContractStatusFilter | undefined;
  const status =
    statusParam === "OPEN" || statusParam === "CLOSED"
      ? statusParam
      : undefined;

  const employeeId = sp.employeeId || undefined;

  return {
    rawPage,
    rawPageSize,
    q,
    status,
    employeeId,
  };
}

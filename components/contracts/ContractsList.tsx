import PaginationSummary from "../layout/PaginationSummary";
import type { ContractsListProps } from "@/types/contracts";

import { ContractsTableView } from "./ContractsTableView";
import { ContractsMobileView } from "./ContractsMobileView";
import { buildContractsHref } from "@/app/utils/contractsListUtils";

export default function ContractsList({
  contracts,
  page,
  pageSize,
  total,
  totalPages,
  status,
  employeeId,
}: ContractsListProps) {
  const makeHref = (p: number) =>
    buildContractsHref({ page: p, pageSize, status, employeeId });

  return (
    <>
      <ContractsTableView contracts={contracts} />
      <ContractsMobileView contracts={contracts} />

      <PaginationSummary
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        itemLabel="contracts"
        makeHref={makeHref}
      />
    </>
  );
}

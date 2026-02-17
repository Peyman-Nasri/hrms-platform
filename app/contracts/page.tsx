export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPaginated } from "@/server/contracts/contracts.service";
import { listEmployees } from "@/server/employees/employees.repo";
import ContractsHeader from "@/components/features/contracts/ContractsHeader";
import ContractsList from "@/components/features/contracts/ContractsList";
import FilterSelect from "@/components/shared/FilterSection";
import SearchBar from "@/components/shared/SearchBar";

import {
  CONTRACT_STATUS_OPTIONS,
  parseContractSearchParams,
} from "../constants/contracts";

import type { ContractsPageProps } from "@/types/contracts";

export default async function ContractsPage({
  searchParams,
}: ContractsPageProps) {
  const sp = await searchParams;

  const { rawPage, rawPageSize, q, status, employeeId } =
    parseContractSearchParams(sp);

  const [{ data: contracts, total, totalPages, page, pageSize }, employees] =
    await Promise.all([
      listPaginated(rawPage, rawPageSize, employeeId, q, status),
      listEmployees({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      }),
    ]);

  return (
    <div>
      <ContractsHeader employees={employees} />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch gap-2 mb-3">
        <div className="flex-grow-1">
          <SearchBar paramKey="q" />
        </div>

        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
          <FilterSelect
            paramKey="status"
            options={CONTRACT_STATUS_OPTIONS}
            emptyLabel="All Statuses"
            allowEmpty
          />
        </div>
      </div>

      <ContractsList
        contracts={contracts}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        status={status ?? ""}
        employeeId={employeeId ?? ""}
      />
    </div>
  );
}

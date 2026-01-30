export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPaginated } from "@/server/contracts/contracts.service";
import FilterSelect from "@/components/layout/FilterSection";
import SearchBar from "@/components/layout/SearchBar";
import ContractsHeader from "@/components/contracts/ContractsHeader";
import ContractsList from "@/components/contracts/ContractsList";
import { listEmployees } from "@/server/employees/employees.repo";

type ContractsPageSearchParams = {
  page?: string;
  pageSize?: string;
  status?: string;
  employeeId?: string;
  q?: string;
};

type ContractsPageProps = {
  searchParams: Promise<ContractsPageSearchParams>;
};

export default async function ContractsPage({
  searchParams,
}: ContractsPageProps) {
  const sp = await searchParams;

  const rawPage = sp.page ? Number(sp.page) : undefined;
  const rawPageSize = sp.pageSize ? Number(sp.pageSize) : undefined;
  const q = sp.q ?? "";

  const statusParam = sp.status;
  const status =
    statusParam === "OPEN" || statusParam === "CLOSED"
      ? statusParam
      : undefined;

  const employeeId = sp.employeeId || undefined;

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

  const statusOptions = [
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
  ];

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
            options={statusOptions}
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

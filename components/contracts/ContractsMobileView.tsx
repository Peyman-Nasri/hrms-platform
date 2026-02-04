import {
  formatEmployeeLabel,
  formatStatusBadgeClass,
  formatTimeReportsCount,
} from "@/app/utils/contracts";
import { formatDate } from "@/app/utils/format";
import type { ContractsListProps } from "@/types/contracts";

type ContractsMobileListProps = {
  contracts: ContractsListProps["contracts"];
};

export function ContractsMobileView({ contracts }: ContractsMobileListProps) {
  const hasContracts = contracts.length > 0;

  return (
    <div className="d-block d-md-none">
      <div className="d-flex flex-column gap-3 mt-3">
        {hasContracts ? (
          contracts.map((c) => {
            const employeeLabel = formatEmployeeLabel(c.employee, c.employeeId);
            const timeReportsCount = c._count?.timeReports ?? undefined;

            return (
              <div key={c.id} className="card p-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold">{employeeLabel}</span>
                  <span className="text-muted small">
                    {formatDate(c.startDate)}
                  </span>
                </div>

                {c.employee?.email && (
                  <div className="text-muted small">{c.employee.email}</div>
                )}

                <div className="small">
                  <span className="text-muted">Contract: </span>
                  <span className="fw-medium">{c.name}</span>
                </div>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <span className={`badge ${formatStatusBadgeClass(c.status)}`}>
                    {c.status}
                  </span>

                  <span className="text-muted small">
                    {formatTimeReportsCount(timeReportsCount)}
                  </span>
                </div>

                <div className="text-muted small mt-2">
                  End: {formatDate(c.endDate ?? null)}
                </div>

                <div className="text-muted small mt-1">
                  Created: {formatDate(c.createdAt)}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted py-4">No contracts found.</div>
        )}
      </div>
    </div>
  );
}

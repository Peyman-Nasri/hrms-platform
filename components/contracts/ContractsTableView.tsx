import {
  formatEmployeeLabel,
  formatStatusBadgeClass,
  formatTimeReportsCount,
} from "@/app/utils/contracts";
import { formatDate } from "@/app/utils/format";
import type { ContractsListProps } from "@/types/contracts";

type ContractsTableViewProps = {
  contracts: ContractsListProps["contracts"];
};

export function ContractsTableView({ contracts }: ContractsTableViewProps) {
  const hasContracts = contracts.length > 0;

  return (
    <div className="d-none d-md-block">
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Employee</th>
              <th>Contract</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Time Reports</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {hasContracts ? (
              contracts.map((c) => {
                const employeeLabel = formatEmployeeLabel(
                  c.employee,
                  c.employeeId,
                );
                const timeReportsCount = c._count?.timeReports ?? undefined;

                return (
                  <tr key={c.id}>
                    <td>
                      <div className="fw-medium">{employeeLabel}</div>
                      {c.employee?.email && (
                        <div className="text-muted small">
                          {c.employee.email}
                        </div>
                      )}
                    </td>

                    <td>
                      <div className="fw-medium">{c.name}</div>
                    </td>

                    <td>
                      <span
                        className={`badge ${formatStatusBadgeClass(c.status)}`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td>{formatDate(c.startDate)}</td>
                    <td>{formatDate(c.endDate ?? null)}</td>

                    <td className="text-muted small">
                      {formatTimeReportsCount(timeReportsCount)}
                    </td>

                    <td className="text-muted small">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No contracts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

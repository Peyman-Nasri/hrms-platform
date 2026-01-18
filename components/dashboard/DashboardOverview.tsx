import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";

type DashboardOverviewProps = {
  totalEmployees: number;
  activeEmployees: number;
  openContracts: number;
};

export default function DashboardOverview({
  totalEmployees,
  activeEmployees,
  openContracts,
}: DashboardOverviewProps) {
  return (
    <>
      {/* ===== Desktop / Tablet (md and up) ===== */}
      <div className="d-none d-md-block">
        <div className="row g-3">
          <div className="col-md-4">
            <StatCard title="Total Employees" value={totalEmployees} />
          </div>
          <div className="col-md-4">
            <StatCard title="Active Employees" value={activeEmployees} />
          </div>
          <div className="col-md-4">
            <StatCard title="Open Contracts" value={openContracts} />
          </div>
        </div>

        <div className="mt-4">
          <h5 className="fw-semibold mb-3">Quick Actions</h5>

          <div className="d-flex gap-3">
            <QuickAction
              title="Employees"
              description="View and manage employee records"
              href="/employees"
            />
            <QuickAction
              title="Time Reports"
              description="Review employee time reports"
              href="/reports/time"
            />
            <QuickAction
              title="Salary Reports"
              description="Review employee salary reports"
              href="/reports/salary"
            />
          </div>
        </div>
      </div>

      {/* ===== Mobile (< md) ===== */}
      <div className="d-block d-md-none">
        <div className="row g-3">
          <div className="col-12">
            <StatCard title="Total Employees" value={totalEmployees} />
          </div>
          <div className="col-12">
            <StatCard title="Active Employees" value={activeEmployees} />
          </div>
          <div className="col-12">
            <StatCard title="Open Contracts" value={openContracts} />
          </div>
        </div>

        <div className="mt-4">
          <h5 className="fw-semibold mb-3">Quick Actions</h5>

          <div className="d-flex flex-column gap-3">
            <QuickAction
              title="Employees"
              description="View and manage employee records"
              href="/employees"
            />
            <QuickAction
              title="Time Reports"
              description="Review employee time reports"
              href="/reports/time"
            />
            <QuickAction
              title="Salary Reports"
              description="Review employee salary reports"
              href="/reports/salary"
            />
          </div>
        </div>
      </div>
    </>
  );
}

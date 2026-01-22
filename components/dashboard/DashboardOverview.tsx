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
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <StatCard title="Total Employees" value={totalEmployees} />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Active Employees" value={activeEmployees} />
        </div>
        <div className="col-12 col-md-4">
          <StatCard title="Open Contracts" value={openContracts} />
        </div>
      </div>

      <div className="mt-4">
        <h5 className="fw-semibold mb-3">Quick Actions</h5>

        <div className="d-flex flex-column flex-md-row gap-3">
          <QuickAction
            title="Employees"
            description="View and manage employee records"
            href="/employees"
          />
          <QuickAction
            title="Time Reports"
            description="Review employee time reports"
            href="/time-reports"
          />
          <QuickAction
            title="Salary Reports"
            description="Review employee salary reports"
            href="/reports/salary"
          />
        </div>
      </div>
    </>
  );
}

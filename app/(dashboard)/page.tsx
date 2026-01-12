import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";

export default function DashboardPage() {
  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h1 className="fw-semibold">Dashboard</h1>
        <p className="text-muted mb-0">Overview of your HR management system</p>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <StatCard title="Total Employees" value="—" />
        </div>
        <div className="col-md-4">
          <StatCard title="Active Employees" value="—" />
        </div>
        <div className="col-md-4">
          <StatCard title="Open Contracts" value="—" />
        </div>
      </div>

      <div>
        <h5 className="fw-semibold mb-3">Quick Actions</h5>

        <div className="d-flex gap-3">
          <QuickAction
            title="Employees"
            description="View and manage employee records"
            href="/employees"
          />
          <QuickAction
            title="Reports"
            description="Review time and salary reports"
            href="#"
          />
        </div>
      </div>
    </div>
  );
}

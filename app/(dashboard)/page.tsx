export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import { getDashboardStats } from "@/server/dashboard/dashboard.service";

export default async function DashboardPage() {
  const { totalEmployees, activeEmployees, openContracts } =
    await getDashboardStats();

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <h1 className="fw-semibold">Dashboard</h1>
        <p className="text-muted mb-0">Overview of Employee Records</p>
      </div>

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

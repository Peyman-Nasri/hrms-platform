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
    </div>
  );
}

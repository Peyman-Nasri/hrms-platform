import StatCard from "@/components/features/dashboard/StatCard";
import QuickAction from "@/components/features/dashboard/QuickAction";
import type { DashboardOverviewProps } from "@/types/dashboard";

import DonutEmployeesByStatus from "@/components/features/dashboard/charts/DonutEmployeesByStatus";
import DonutContractsByStatus from "@/components/features/dashboard/charts/DonutContractsByStatus";
import AreaContractsTrend from "@/components/features/dashboard/charts/AreaContractsTrend";
import LineHeadcountTrend from "@/components/features/dashboard/charts/LineHeadcountTrend";

export default function DashboardOverview({
  totalEmployees,
  activeEmployees,
  openContracts,
}: DashboardOverviewProps) {
  return (
    <>
      <section>
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
      </section>

      <section className="mt-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-semibold mb-0">Performance Overview</h5>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <DonutEmployeesByStatus />
          </div>
          <div className="col-12 col-lg-6">
            <DonutContractsByStatus />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-12 col-lg-6">
            <AreaContractsTrend />
          </div>
          <div className="col-12 col-lg-6">
            <LineHeadcountTrend />
          </div>
        </div>
      </section>

      <section className="mt-4">
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
            title="Contract Reports"
            description="Review employee contract reports"
            href="/contracts"
          />
        </div>
      </section>
    </>
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { getDashboardStats } from "@/server/dashboard/dashboard.service";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

export default async function DashboardPage() {
  const { totalEmployees, activeEmployees, openContracts } =
    await getDashboardStats();

  return (
    <div className="d-flex flex-column gap-4">
      <DashboardHeader />

      <DashboardOverview
        totalEmployees={totalEmployees}
        activeEmployees={activeEmployees}
        openContracts={openContracts}
      />
    </div>
  );
}

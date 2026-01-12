import Link from "next/link";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>Dashboard</h1>
        <p style={{ color: "#666", marginTop: 4 }}>
          Overview of your HR management system
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16 }}>
        <StatCard title="Total Employees" value="—" />
        <StatCard title="Active Employees" value="—" />
        <StatCard title="Open Contracts" value="—" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
          Quick Actions
        </h2>

        <div style={{ display: "flex", gap: 16 }}>
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 8,
          width: 260,
          cursor: "pointer",
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 600 }}>{title}</h3>
        <p style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

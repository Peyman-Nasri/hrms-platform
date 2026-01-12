import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 260, padding: 16, borderRight: "1px solid #eee" }}>
        <div style={{ fontWeight: 700 }}>HRMS</div>
        <nav style={{ marginTop: 16, display: "grid", gap: 8 }}>
          <a href="/employees">Employees</a>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}

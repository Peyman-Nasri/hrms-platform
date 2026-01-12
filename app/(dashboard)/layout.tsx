import type { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex min-vh-100">
      <aside className="border-end p-3" style={{ width: 260 }}>
        <div className="fw-bold fs-5 mb-3">HRMS</div>

        <nav className="nav flex-column gap-2">
          <Link href="/employees" className="nav-link p-0">
            Employees
          </Link>
        </nav>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">{children}</main>
    </div>
  );
}

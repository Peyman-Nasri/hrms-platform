"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-end p-3 bg-white" style={{ width: 260 }}>
      <div className="fw-bold fs-4 mb-3">
        <i className="bi bi-people-fill me-2 text-primary" />
        HRMS
      </div>

      <hr className={styles.sidebarSeparatorFull} />

      <nav className="nav flex-column gap-1 mt-2">
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        >
          <i className="bi bi-speedometer2 fs-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/employees"
          className={`${styles.link} ${
            pathname.startsWith("/employees") ? styles.active : ""
          }`}
        >
          <i className="bi bi-people fs-5" />
          <span>Employees</span>
        </Link>
      </nav>
    </aside>
  );
}

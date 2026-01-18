"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { status } = useSession();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const dashboardActive = pathname === "/";
  const employeesActive = pathname.startsWith("/employees");
  const timeReportsActive = pathname.startsWith("/reports/time");
  const salaryReportsActive = pathname.startsWith("/reports/salary");

  if (status === "unauthenticated" || pathname === "/login") {
    return null;
  }

  return (
    <aside
      className={`border-end bg-white d-flex flex-column ${
        collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
      }`}
    >
      <div className="p-3 pb-2 d-flex align-items-center justify-content-between">
        {!collapsed && (
          <div className="d-flex align-items-center">
            <i className="bi bi-people-fill me-2 text-primary fs-4" />
            <span className="fw-bold fs-4">HRMS</span>
          </div>
        )}

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-circle"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i
            className={`bi ${
              collapsed ? "bi-chevron-right" : "bi-chevron-left"
            }`}
          />
        </button>
      </div>

      {!collapsed && <hr className={styles.sidebarSeparatorFull} />}

      <nav className="nav flex-column mt-2 px-2 pb-3 gap-1 flex-grow-1">
        <Link
          href="/"
          className={`${styles.link} ${dashboardActive ? styles.active : ""} ${
            collapsed ? styles.linkCollapsed : ""
          }`}
          title="Dashboard"
        >
          <i className="bi bi-speedometer2 fs-5" />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link
          href="/employees"
          className={`${styles.link} ${employeesActive ? styles.active : ""} ${
            collapsed ? styles.linkCollapsed : ""
          }`}
          title="Employees"
        >
          <i className="bi bi-people fs-5" />
          {!collapsed && <span>Employees</span>}
        </Link>
        <Link
          href="/reports/time"
          className={`${styles.link} ${
            timeReportsActive ? styles.active : ""
          } ${collapsed ? styles.linkCollapsed : ""}`}
          title="Time Reports"
        >
          <i className="bi bi-clock-history fs-5" />
          {!collapsed && <span>Time Reports</span>}
        </Link>

        <Link
          href="/reports/salary"
          className={`${styles.link} ${
            salaryReportsActive ? styles.active : ""
          } ${collapsed ? styles.linkCollapsed : ""}`}
          title="Salary Reports"
        >
          <i className="bi bi-cash-stack fs-5" />
          {!collapsed && <span>Salary Reports</span>}
        </Link>
      </nav>
      <div className="mt-auto px-2 pb-3">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className={`btn w-100 d-flex align-items-center gap-2 ${
            collapsed ? "justify-content-center" : "justify-content-start"
          } btn-outline-danger`}
        >
          <i className="bi bi-box-arrow-right fs-5"></i>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import LogoutConfirmModal from "../auth/logoutConfirm";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const { status } = useSession();

  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
  const timeReportsActive = pathname.startsWith("/time-reports");
  const contractReportsActive = pathname.startsWith("/contracts");

  if (status === "unauthenticated" || pathname === "/login") {
    return null;
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    signOut({ callbackUrl: "/login" });
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside
        className={`border-end bg-body d-flex flex-column ${
          collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
        }`}
      >
        <div className="p-3 pb-2 d-flex align-items-center justify-content-between">
          <button
            type="button"
            className="btn p-0 border-0 bg-transparent d-flex align-items-center"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Open HRMS menu"
          >
            <i className="bi bi-people-fill me-2 text-primary fs-4" />
            {!collapsed && <span className="fw-bold fs-4">HRMS</span>}
            {!collapsed && (
              <i
                className={`bi ms-1 small ${
                  menuOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"
                }`}
              />
            )}
          </button>

          <button
            type="button"
            className={
              collapsed
                ? "btn p-0 border-0 bg-transparent d-flex align-items-center justify-content-center"
                : "btn btn-sm btn-outline-secondary rounded-circle"
            }
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{ marginLeft: 5 }}
          >
            <i
              className={`bi ${
                collapsed ? "bi-chevron-right" : "bi-chevron-left"
              }`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="px-3 pb-2">
            <div className="mb-2">
              <ThemeToggle collapsed={collapsed} />
            </div>
            <button
              type="button"
              className={`btn w-100 d-flex align-items-center gap-2 ${
                collapsed ? "justify-content-center" : "justify-content-start"
              } btn-outline-danger`}
              onClick={handleLogoutClick}
            >
              <i className="bi bi-box-arrow-right fs-5" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        <hr className={styles.sidebarSeparatorFull} />

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
            href="/time-reports"
            className={`${styles.link} ${timeReportsActive ? styles.active : ""} ${
              collapsed ? styles.linkCollapsed : ""
            }`}
            title="Time Reports"
          >
            <i className="bi bi-clock-history fs-5" />
            {!collapsed && <span>Time Reports</span>}
          </Link>

          <Link
            href="/contracts"
            className={`${styles.link} ${
              contractReportsActive ? styles.active : ""
            } ${collapsed ? styles.linkCollapsed : ""}`}
            title="Contract Reports"
          >
            <i className="bi bi-cash-stack fs-5" />
            {!collapsed && <span>Contract Reports</span>}
          </Link>
        </nav>
      </aside>

      <LogoutConfirmModal
        show={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}

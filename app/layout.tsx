import "bootstrap/dist/css/bootstrap.min.css";
import type { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex min-vh-100">
          <aside className="border-end p-3" style={{ width: 260 }}>
            <nav className="nav flex-column gap-2">
              <Link
                href="/#"
                className="nav-link px-2 py-2 rounded text-dark fs-5 fw-medium"
              >
                Dashboard
              </Link>

              <Link
                href="/employees"
                className="nav-link px-2 py-2 rounded text-dark fs-5 fw-medium"
              >
                Employees
              </Link>
            </nav>
          </aside>

          <main className="flex-grow-1 p-4 bg-light">{children}</main>
        </div>
      </body>
    </html>
  );
}

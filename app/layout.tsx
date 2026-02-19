import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import AuthProvider from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/toast/ToastContext";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata = {
  title: "HRMS Platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ToastProvider>
            <ThemeProvider>
              <div className="d-flex min-vh-100">
                <Sidebar />
                <main className="flex-grow-1 p-4 bg-body">{children}</main>
              </div>
            </ThemeProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

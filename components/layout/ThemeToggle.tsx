"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({
  collapsed = false,
}: {
  collapsed?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={
        "btn btn-outline-secondary w-100 d-flex align-items-center gap-2 " +
        (collapsed ? "justify-content-center" : "justify-content-start")
      }
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <i
        className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-stars-fill"} fs-5`}
      />
      {!collapsed && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}

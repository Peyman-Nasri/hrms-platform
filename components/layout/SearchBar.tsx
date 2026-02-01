"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchBarProps } from "@/types/layouts";

export default function SearchBar({
  paramKey = "q",
  placeholder = "Type to search",
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const trimmed = value.trim();
      const currentInUrl = searchParams.get(paramKey) ?? "";

      if (trimmed === currentInUrl) return;

      const sp = new URLSearchParams(searchParams.toString());

      if (trimmed) {
        sp.set(paramKey, trimmed);
      } else {
        sp.delete(paramKey);
      }

      sp.set("page", "1");

      router.replace(`${pathname}?${sp.toString()}`);
    }, debounceMs);

    return () => window.clearTimeout(handle);
  }, [value, debounceMs, router, pathname, paramKey, searchParams]);

  const clear = () => setValue("");

  return (
    <div className={className}>
      <div className="input-group">
        <span className="input-group-text bg-white">
          <i className="bi bi-search" />
        </span>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-control"
          placeholder={placeholder}
          aria-label={placeholder}
        />

        {value.trim() && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={clear}
            aria-label="Clear search"
            title="Clear"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}
      </div>
    </div>
  );
}

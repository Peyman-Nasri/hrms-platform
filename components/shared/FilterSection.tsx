"use client";

import { FilterSelectProps } from "@/types/layouts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterSelect({
  paramKey,
  options,
  allowEmpty = true,
  emptyLabel = "All",
  className,
  size = "md",
}: FilterSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey) ?? "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;

    if (newValue === currentValue) return;

    const sp = new URLSearchParams(searchParams.toString());

    if (!newValue) sp.delete(paramKey);
    else sp.set(paramKey, newValue);

    sp.set("page", "1");

    router.replace(`${pathname}?${sp.toString()}`);
  }

  const selectClass = "form-select" + (size === "sm" ? " form-select-sm" : "");

  return (
    <div className={className}>
      <select
        className={selectClass}
        value={currentValue}
        onChange={handleChange}
      >
        {allowEmpty && <option value="">{emptyLabel}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

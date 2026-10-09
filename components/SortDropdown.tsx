"use client";

import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const options = [
    { label: "ডিফল্ট", value: "default" },
    { label: "দাম: কম থেকে বেশি", value: "low-high" },
    { label: "দাম: বেশি থেকে কম", value: "high-low" },
  ];

  return (
    <div className="relative inline-block w-full sm:w-auto">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-9 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
"use client";

import { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("");
      onSearch("");
      return;
    }
    if (!/^ORD-\d+(-\d+)?$/i.test(value.trim())) {
      setError("รูปแบบไม่ถูกต้อง ต้องขึ้นต้นด้วย ORD- ตามด้วยตัวเลข เช่น ORD-001 หรือ ORD-897605493019231-534");
      return;
    }
    setError("");
    onSearch(value.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="🔍 กรอกหมายเลขคำสั่งซื้อ เช่น ORD-897605493019231-534"
          className="flex-1 rounded-lg border border-[#3F3F46] bg-[#18181B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 transition-all"
        />
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:from-[#EF4444] hover:to-[#DC2626] hover:shadow-xl hover:shadow-red-500/30 active:from-[#B91C1C] active:to-[#991B1B]"
        >
          🔍 ค้นหา
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-[#FCA5A5]">❌ {error}</p>
      )}
    </form>
  );
}

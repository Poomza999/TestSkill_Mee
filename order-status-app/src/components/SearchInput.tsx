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
      setError("กรุณากรอกหมายเลขคำสั่งซื้อ");
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
          placeholder="กรอกหมายเลขคำสั่งซื้อ เช่น ORD-897605493019231-534"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          ค้นหา
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}

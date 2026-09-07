"use client";

interface TabsProps {
  activeTab: "current" | "past";
  onTabChange: (tab: "current" | "past") => void;
  currentCount: number;
  pastCount: number;
}

export default function Tabs({
  activeTab,
  onTabChange,
  currentCount,
  pastCount,
}: TabsProps) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => onTabChange("current")}
        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
          activeTab === "current"
            ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        ออเดอร์ปัจจุบัน
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {currentCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${
          activeTab === "past"
            ? "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        }`}
      >
        ออเดอร์ที่ผ่านมา
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {pastCount}
        </span>
      </button>
    </div>
  );
}

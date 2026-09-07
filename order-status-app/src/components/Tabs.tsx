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
    <div className="flex bg-[#18181B] rounded-lg p-1 gap-1">
      <button
        onClick={() => onTabChange("current")}
        className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${
          activeTab === "current"
            ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/20"
            : "text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#27272A]"
        }`}
      >
        📦 ออเดอร์ยังไม่ชำระ
        <span
          className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
            activeTab === "current"
              ? "bg-white/20 text-white"
              : "bg-[#27272A] text-[#A1A1AA]"
          }`}
        >
          {currentCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`flex-1 py-3 text-sm font-medium rounded-md transition-all ${
          activeTab === "past"
            ? "bg-[#DC2626] text-white shadow-lg shadow-red-500/20"
            : "text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#27272A]"
        }`}
      >
        ✅ ออเดอร์ที่ชำระสำเร็จ
        <span
          className={`ml-2 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
            activeTab === "past"
              ? "bg-white/20 text-white"
              : "bg-[#27272A] text-[#A1A1AA]"
          }`}
        >
          {pastCount}
        </span>
      </button>
    </div>
  );
}

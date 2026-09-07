"use client";

import { useState } from "react";
import type { Order } from "@/data/orders";

const statusStyles: Record<string, string> = {
  pending:
    "bg-[#1C1917] text-[#FCD34D] border border-[#92400E]",
  in_progress:
    "bg-[#1C1917] text-[#FCA5A5] border border-[#7F1D1D]",
  completed:
    "bg-[#1C1917] text-[#86EFAC] border border-[#14532D]",
  pending_payment:
    "bg-[#1C1917] text-[#FDBA74] border border-[#7C2D12]",
};

const statusBorders: Record<string, string> = {
  pending: "#92400E",
  in_progress: "#7F1D1D",
  completed: "#14532D",
  pending_payment: "#7C2D12",
};

export default function OrderCard({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const borderColor = statusBorders[order.status] || "#3F3F46";

  return (
    <div
      className="rounded-xl border border-[#27272A] bg-gradient-to-br from-[#18181B] to-[#1A1A1E] p-4 shadow-lg transition-all hover:shadow-xl hover:border-[#3F3F46]"
      style={{ borderLeftWidth: "4px", borderLeftColor: borderColor }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-semibold text-[#EF4444]">
              {order.id}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md bg-[#27272A] px-2 py-1 text-xs text-[#A1A1AA] transition-colors hover:bg-[#3F3F46] hover:text-[#FAFAFA]"
              title="คัดลอกหมายเลข"
            >
              {copied ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>คัดลอก</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-1 text-sm text-[#D4D4D8]">
            🛍️ {order.items}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[#71717A]">
              📅 {order.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-[#FCA5A5]">
            ฿{order.total.toLocaleString()}
          </span>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status]}`}
          >
            {order.statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

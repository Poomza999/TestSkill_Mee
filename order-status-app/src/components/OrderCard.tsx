"use client";

import { useState } from "react";
import type { Order } from "@/data/orders";

const statusStyles: Record<string, string> = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  in_progress:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending_payment:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
              {order.id}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              title="คัดลอกหมายเลข"
            >
              {copied ? (
                <>
                  <svg
                    className="h-3.5 w-3.5 text-green-500"
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
                  <span className="text-green-600 dark:text-green-400">
                    Copied!
                  </span>
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
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {order.items}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {order.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
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

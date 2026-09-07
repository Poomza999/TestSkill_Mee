"use client";

import { useMemo } from "react";
import type { Order } from "@/data/orders";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: Order[];
  searchTerm: string;
}

export default function OrderList({ orders, searchTerm }: OrderListProps) {
  const filtered = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter((o) =>
      o.id.toUpperCase().includes(searchTerm.toUpperCase())
    );
  }, [orders, searchTerm]);

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-[#52525B]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="mt-4 text-sm text-[#71717A]">
          🔍 ไม่พบคำสั่งซื้อ &quot;{searchTerm}&quot;
        </p>
        <p className="mt-1 text-xs text-[#52525B]">
          ลองค้นหาด้วยหมายเลขอื่น เช่น ORD-897605493019231-534
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {filtered.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { orders } from "@/data/orders";
import SearchInput from "@/components/SearchInput";
import OrderList from "@/components/OrderList";
import Tabs from "@/components/Tabs";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  const currentOrders = useMemo(
    () => orders.filter((o) => o.type === "current"),
    []
  );
  const pastOrders = useMemo(
    () => orders.filter((o) => o.type === "past"),
    []
  );

  const displayOrders = activeTab === "current" ? currentOrders : pastOrders;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            ตรวจสอบสถานะคำสั่งซื้อ
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            ป้อนหมายเลขคำสั่งซื้อในรูปแบบ ORD-xxx-xxx เพื่อตรวจสอบสถานะ
          </p>
        </div>

        <div className="mb-6">
          <SearchInput onSearch={setSearchTerm} />
        </div>

        <div>
          <Tabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentCount={currentOrders.length}
            pastCount={pastOrders.length}
          />
          <div className="mt-4">
            <OrderList orders={displayOrders} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export type OrderStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "pending_payment";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  items: string;
  total: number;
  type: "current" | "past";
}

export const orders: Order[] = [
  {
    id: "ORD-897605493019231-534",
    date: "07/09/2026",
    status: "pending",
    statusLabel: "อยู่ในคิว",
    items: "เสื้อยืด x2, กางเกง x1",
    total: 850,
    type: "current",
  },
  {
    id: "ORD-923456789012345-123",
    date: "06/09/2026",
    status: "in_progress",
    statusLabel: "กำลังดำเนินการ",
    items: "หมวก x1, กระเป๋า x1",
    total: 590,
    type: "current",
  },
  {
    id: "ORD-654321098765432-678",
    date: "05/09/2026",
    status: "pending_payment",
    statusLabel: "รอชำระเงิน",
    items: "รองเท้า x1",
    total: 1200,
    type: "current",
  },
  {
    id: "ORD-112233445566778-901",
    date: "01/09/2026",
    status: "completed",
    statusLabel: "เสร็จสิ้น",
    items: "เสื้อแจ็คเก็ต x1",
    total: 1500,
    type: "past",
  },
  {
    id: "ORD-998877665544332-210",
    date: "28/08/2026",
    status: "completed",
    statusLabel: "เสร็จสิ้น",
    items: "แว่นตา x1, นาฬิกา x1",
    total: 3200,
    type: "past",
  },
];

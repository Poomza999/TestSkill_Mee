import streamlit as st
import re

st.set_page_config(
    page_title="ตรวจสอบสถานะคำสั่งซื้อ",
    page_icon="📦",
    layout="centered",
)

ORDERS = [
    {
        "id": "ORD-897605493019231-534",
        "date": "07/09/2026",
        "status": "pending",
        "status_label": "อยู่ในคิว",
        "items": "เสื้อยืด x2, กางเกง x1",
        "total": 850,
        "type": "current",
    },
    {
        "id": "ORD-923456789012345-123",
        "date": "06/09/2026",
        "status": "in_progress",
        "status_label": "กำลังดำเนินการ",
        "items": "หมวก x1, กระเป๋า x1",
        "total": 590,
        "type": "current",
    },
    {
        "id": "ORD-654321098765432-678",
        "date": "05/09/2026",
        "status": "pending_payment",
        "status_label": "รอชำระเงิน",
        "items": "รองเท้า x1",
        "total": 1200,
        "type": "current",
    },
    {
        "id": "ORD-112233445566778-901",
        "date": "01/09/2026",
        "status": "completed",
        "status_label": "เสร็จสิ้น",
        "items": "เสื้อแจ็คเก็ต x1",
        "total": 1500,
        "type": "past",
    },
    {
        "id": "ORD-998877665544332-210",
        "date": "28/08/2026",
        "status": "completed",
        "status_label": "เสร็จสิ้น",
        "items": "แว่นตา x1, นาฬิกา x1",
        "total": 3200,
        "type": "past",
    },
]

STATUS_COLORS = {
    "pending": ("#422006", "#FCD34D"),
    "in_progress": ("#7F1D1D", "#FCA5A5"),
    "completed": ("#14532D", "#86EFAC"),
    "pending_payment": ("#7C2D12", "#FDBA74"),
}


def render_order_card(order: dict):
    bg, fg = STATUS_COLORS.get(order["status"], ("#1A1A1A", "#FAFAFA"))
    st.markdown(
        f"""
        <div style="border:1px solid #333; border-radius:12px; padding:16px; margin-bottom:12px; background:#1A1A1A;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div style="flex:1; min-width:200px;">
                    <div style="font-family:monospace; font-size:14px; font-weight:600; color:#FCA5A5;">
                        {order["id"]}
                    </div>
                    <div style="font-size:14px; color:#A1A1AA; margin-top:4px;">
                        {order["items"]}
                    </div>
                    <div style="font-size:12px; color:#71717A; margin-top:4px;">
                        {order["date"]}
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-size:16px; font-weight:600; color:#FCA5A5;">
                        ฿{order["total"]:,}
                    </span>
                    <span style="background:{bg}; color:{fg}; padding:4px 12px; border-radius:9999px; font-size:12px; font-weight:500;">
                        {order["status_label"]}
                    </span>
                </div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def main():
    st.markdown(
        """
        <style>
        .stApp { background-color: #0F0F0F; }
        h1 { color: #FCA5A5 !important; }
        .stTabs [data-baseweb="tab"] { color: #A1A1AA; }
        .stTabs [aria-selected="true"] { color: #FCA5A5 !important; border-bottom-color: #DC2626 !important; }
        .stButton > button { background-color: #DC2626; color: white; border: none; }
        .stButton > button:hover { background-color: #B91C1C; }
        .stTextInput > div > div > input { background-color: #1A1A1A; color: #FAFAFA; border-color: #333; }
        </style>
        """,
        unsafe_allow_html=True,
    )
    st.markdown(
        "<h1 style='margin-bottom:4px;'>ตรวจสอบสถานะคำสั่งซื้อ</h1>",
        unsafe_allow_html=True,
    )
    st.caption("ป้อนหมายเลขคำสั่งซื้อในรูปแบบ ORD-xxx-xxx เพื่อตรวจสอบสถานะ")

    col1, col2 = st.columns([3, 1])
    with col1:
        search_input = st.text_input(
            "ค้นหา",
            placeholder="กรอกหมายเลขคำสั่งซื้อ เช่น ORD-897605493019231-534",
            label_visibility="collapsed",
        )
    with col2:
        search_btn = st.button("ค้นหา", use_container_width=True)

    search_term = ""
    if search_btn or search_input:
        raw = search_input.strip()
        if raw:
            if not re.match(r"^ORD-\d+(-\d+)?$", raw, re.IGNORECASE):
                st.error(
                    "รูปแบบไม่ถูกต้อง ต้องขึ้นต้นด้วย ORD- ตามด้วยตัวเลข เช่น ORD-001 หรือ ORD-897605493019231-534"
                )
                return
            search_term = raw.upper()

    current_orders = [o for o in ORDERS if o["type"] == "current"]
    past_orders = [o for o in ORDERS if o["type"] == "past"]

    tab_current, tab_past = st.tabs(
        [
            f"📦 ออเดอร์ปัจจุบัน ({len(current_orders)})",
            f"✅ ออเดอร์ที่ผ่านมา ({len(past_orders)})",
        ]
    )

    def display_orders(orders: list, search: str):
        if search:
            orders = [o for o in orders if search in o["id"].upper()]
        if not orders:
            st.info(f'ไม่พบคำสั่งซื้อ "{search}"')
            return
        for order in orders:
            render_order_card(order)

    with tab_current:
        display_orders(current_orders, search_term)

    with tab_past:
        display_orders(past_orders, search_term)


if __name__ == "__main__":
    main()

import streamlit as st
import re

st.set_page_config(
    page_title="ตรวจสอบสถานะคำสั่งซื้อ",
    page_icon="📦",
    layout="centered",
)

st.markdown("""
<style>
/* Force dark background everywhere */
html, body, [class*="css"] {
    background-color: #0A0A0A !important;
    color: #FAFAFA !important;
}

.stApp {
    background-color: #0A0A0A !important;
}

.stApp > header {
    background-color: #0A0A0A !important;
}

section.stMain {
    background-color: #0A0A0A !important;
}

.block-container {
    background-color: #0A0A0A !important;
    padding-top: 2rem !important;
}

/* Header and text */
h1, h2, h3, h4, h5, h6 {
    color: #EF4444 !important;
}

p, span, label, li, td, th, div {
    color: #FAFAFA !important;
}

.stCaption, .stCaption p {
    color: #71717A !important;
}

.stMarkdown p {
    color: #FAFAFA !important;
}

/* Tabs */
.stTabs [data-baseweb="tab-list"] {
    background-color: #18181B !important;
    border-radius: 10px !important;
    gap: 4px !important;
    padding: 4px !important;
}

.stTabs [data-baseweb="tab"] {
    background-color: transparent !important;
    color: #71717A !important;
    border-radius: 8px !important;
    padding: 10px 20px !important;
    font-weight: 500 !important;
    border: none !important;
    border-bottom: none !important;
}

.stTabs [data-baseweb="tab"]:hover {
    color: #FCA5A5 !important;
    background-color: #27272A !important;
}

.stTabs [aria-selected="true"] {
    color: #FFFFFF !important;
    background-color: #DC2626 !important;
    border-bottom: none !important;
}

.stTabs [data-baseweb="tab-highlight"] {
    background-color: transparent !important;
    border-bottom: none !important;
}

.stTabs [data-baseweb="tab-border"] {
    background-color: transparent !important;
    border-bottom: none !important;
}

/* Buttons */
.stButton > button {
    background: linear-gradient(135deg, #DC2626, #B91C1C) !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 10px 24px !important;
    font-weight: 600 !important;
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3) !important;
    transition: all 0.3s ease !important;
}

.stButton > button:hover {
    background: linear-gradient(135deg, #EF4444, #DC2626) !important;
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4) !important;
    color: #FFFFFF !important;
}

.stButton > button:active {
    background: linear-gradient(135deg, #B91C1C, #991B1B) !important;
    color: #FFFFFF !important;
}

/* Text Input */
.stTextInput > div > div > input {
    background-color: #18181B !important;
    color: #FAFAFA !important;
    border: 1px solid #3F3F46 !important;
    border-radius: 8px !important;
    padding: 12px 16px !important;
}

.stTextInput > div > div > input:focus {
    border-color: #DC2626 !important;
    box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2) !important;
    color: #FAFAFA !important;
}

.stTextInput > div > div > input::placeholder {
    color: #52525B !important;
}

.stTextInput > label {
    color: #A1A1AA !important;
}

/* Alerts */
div[data-testid="stError"] {
    background-color: #1C1917 !important;
    border: 1px solid #DC2626 !important;
    border-left: 4px solid #DC2626 !important;
    border-radius: 8px !important;
}

div[data-testid="stError"] p,
div[data-testid="stError"] span {
    color: #FCA5A5 !important;
}

div[data-testid="stError"] svg {
    color: #EF4444 !important;
}

div[data-testid="stInfo"] {
    background-color: #18181B !important;
    border: 1px solid #3F3F46 !important;
    border-left: 4px solid #52525B !important;
    border-radius: 8px !important;
}

div[data-testid="stInfo"] p,
div[data-testid="stInfo"] span {
    color: #A1A1AA !important;
}

div[data-testid="stWarning"] {
    background-color: #1C1917 !important;
    border: 1px solid #92400E !important;
    border-left: 4px solid #FCD34D !important;
    border-radius: 8px !important;
}

div[data-testid="stWarning"] p,
div[data-testid="stWarning"] span {
    color: #FCD34D !important;
}

div[data-testid="stSuccess"] {
    background-color: #14532D !important;
    border: 1px solid #22C55E !important;
    border-left: 4px solid #22C55E !important;
    border-radius: 8px !important;
}

div[data-testid="stSuccess"] p,
div[data-testid="stSuccess"] span {
    color: #86EFAC !important;
}

/* Selectbox */
.stSelectbox > div > div {
    background-color: #18181B !important;
    color: #FAFAFA !important;
}

.stSelectbox > div > div > div {
    color: #FAFAFA !important;
}

/* Sidebar */
section[data-testid="stSidebar"] {
    background-color: #0F0F0F !important;
}

section[data-testid="stSidebar"] p,
section[data-testid="stSidebar"] span,
section[data-testid="stSidebar"] label {
    color: #FAFAFA !important;
}

/* Checkbox & Radio */
.stCheckbox > label > span,
.stRadio > label > span {
    color: #FAFAFA !important;
}

/* Expander */
.stExpander > details > summary {
    background-color: #18181B !important;
    color: #FAFAFA !important;
}

/* Progress */
.stProgress > div > div {
    background-color: #3F3F46 !important;
}

.stProgress > div > div > div {
    background-color: #DC2626 !important;
}

/* Divider */
hr {
    border-color: #27272A !important;
    border-top-color: #27272A !important;
}

/* Code blocks */
.stCodeBlock {
    background-color: #18181B !important;
}

/* Tables */
.stDataFrame {
    background-color: #18181B !important;
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #0A0A0A !important;
}

::-webkit-scrollbar-thumb {
    background: #3F3F46 !important;
    border-radius: 4px !important;
}

::-webkit-scrollbar-thumb:hover {
    background: #52525B !important;
}

/* Footer */
footer {
    background-color: #0A0A0A !important;
}

footer p {
    color: #52525B !important;
}

/* Streamlit branding removal */
#MainMenu {
    visibility: hidden;
}

header[data-testid="stHeader"] {
    background-color: #0A0A0A !important;
}

header[data-testid="stHeader"] > div {
    background-color: #0A0A0A !important;
}
</style>
""", unsafe_allow_html=True)


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
    "pending": {"bg": "#1C1917", "border": "#92400E", "text": "#FCD34D"},
    "in_progress": {"bg": "#1C1917", "border": "#7F1D1D", "text": "#FCA5A5"},
    "completed": {"bg": "#1C1917", "border": "#14532D", "text": "#86EFAC"},
    "pending_payment": {"bg": "#1C1917", "border": "#7C2D12", "text": "#FDBA74"},
}


def render_order_card(order: dict):
    colors = STATUS_COLORS.get(order["status"], {"bg": "#18181B", "border": "#3F3F46", "text": "#FAFAFA"})
    st.markdown(
        f"""
        <div style="
            border: 1px solid {colors['border']};
            border-left: 4px solid {colors['border']};
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            background: linear-gradient(145deg, #18181B, #1A1A1E);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        ">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div style="flex:1; min-width:200px;">
                    <div style="
                        font-family: monospace;
                        font-size: 15px;
                        font-weight: 700;
                        color: #EF4444;
                        letter-spacing: 0.5px;
                    ">
                        {order["id"]}
                    </div>
                    <div style="font-size: 14px; color: #D4D4D8; margin-top: 8px;">
                        🛍️ {order["items"]}
                    </div>
                    <div style="font-size: 12px; color: #71717A; margin-top: 6px;">
                        📅 {order["date"]}
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:16px;">
                    <span style="font-size: 18px; font-weight: 700; color: #FCA5A5;">
                        ฿{order["total"]:,}
                    </span>
                    <span style="
                        background-color: {colors['bg']};
                        border: 1px solid {colors['border']};
                        color: {colors['text']};
                        padding: 6px 14px;
                        border-radius: 9999px;
                        font-size: 12px;
                        font-weight: 600;
                    ">
                        {order["status_label"]}
                    </span>
                </div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def main():
    st.markdown("""
    <div style="text-align: center; padding: 20px 0 30px 0;">
        <h1 style="
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #EF4444, #FCA5A5);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent !important;
        ">
            ตรวจสอบสถานะคำสั่งซื้อ
        </h1>
        <p style="color: #71717A; font-size: 1rem; margin: 0;">
            ป้อนหมายเลขคำสั่งซื้อในรูปแบบ ORD-xxx-xxx เพื่อตรวจสอบสถานะ
        </p>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns([4, 1])
    with col1:
        search_input = st.text_input(
            "ค้นหา",
            placeholder="🔍 กรอกหมายเลขคำสั่งซื้อ เช่น ORD-897605493019231-534",
            label_visibility="collapsed",
        )
    with col2:
        search_btn = st.button("🔍 ค้นหา", use_container_width=True)

    search_term = ""
    if search_btn or search_input:
        raw = search_input.strip()
        if raw:
            if not re.match(r"^ORD-\d+(-\d+)?$", raw, re.IGNORECASE):
                st.error("❌ รูปแบบไม่ถูกต้อง ต้องขึ้นต้นด้วย ORD- ตามด้วยตัวเลข เช่น ORD-001 หรือ ORD-897605493019231-534")
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
            st.info(f'🔍 ไม่พบคำสั่งซื้อ "{search}"')
            return
        for order in orders:
            render_order_card(order)

    with tab_current:
        display_orders(current_orders, search_term)

    with tab_past:
        display_orders(past_orders, search_term)

    st.markdown("""
    <div style="
        text-align: center;
        padding: 40px 0 20px 0;
        border-top: 1px solid #27272A;
        margin-top: 40px;
    ">
        <p style="color: #52525B; font-size: 0.85rem; margin: 0;">
            Order Status Tracker © 2026
        </p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()

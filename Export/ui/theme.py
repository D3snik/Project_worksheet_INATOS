import streamlit as st


def configurar_pagina():
    st.set_page_config(page_title="Central PDF", page_icon="📄", layout="wide")


def render_estilos():
    st.markdown(
        """
        <style>
        .stApp {
            background:
                radial-gradient(circle at top left, rgba(250, 99, 71, 0.10), transparent 26%),
                radial-gradient(circle at top right, rgba(255, 208, 160, 0.18), transparent 22%),
                linear-gradient(180deg, #f8f7f4 0%, #f3f1eb 100%);
        }

        .block-container {
            padding-top: 1.4rem;
            padding-bottom: 3rem;
            max-width: 1200px;
        }

        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem 0 1.2rem 0;
        }

        .brand {
            font-size: 2.1rem;
            font-weight: 800;
            letter-spacing: -0.04em;
            color: #1f1f1f;
        }

        .brand span {
            color: #e24d37;
        }

        .topnav {
            display: flex;
            gap: 0.8rem;
            flex-wrap: wrap;
            justify-content: flex-end;
        }

        .navpill {
            background: rgba(255, 255, 255, 0.75);
            border: 1px solid rgba(31, 31, 31, 0.08);
            border-radius: 999px;
            color: #363636;
            font-size: 0.95rem;
            padding: 0.55rem 0.95rem;
        }

        .hero {
            text-align: center;
            padding: 2rem 0 1.6rem 0;
        }

        .hero h1 {
            color: #242424;
            font-size: 3.4rem;
            line-height: 1.05;
            letter-spacing: -0.06em;
            margin-bottom: 0.8rem;
        }

        .hero p {
            color: #5b5b5b;
            font-size: 1.2rem;
            max-width: 780px;
            margin: 0 auto;
        }

        .section-tabs {
            display: flex;
            justify-content: center;
            gap: 0.8rem;
            flex-wrap: wrap;
            margin: 1.8rem 0 2rem 0;
        }

        .section-tab {
            border-radius: 999px;
            padding: 0.7rem 1rem;
            border: 1px solid rgba(36, 36, 36, 0.10);
            background: rgba(255, 255, 255, 0.72);
            color: #444;
            font-weight: 600;
        }

        .tool-card {
            background: rgba(255, 255, 255, 0.88);
            border: 1px solid rgba(36, 36, 36, 0.08);
            border-radius: 24px;
            padding: 1.6rem;
            min-height: 235px;
            box-shadow: 0 16px 40px rgba(70, 55, 24, 0.07);
        }

        .tool-icon {
            width: 56px;
            height: 56px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }

        .tool-icon-red {
            background: linear-gradient(135deg, #ff8b6b 0%, #e24d37 100%);
        }

        .tool-icon-blue {
            background: linear-gradient(135deg, #89b4ff 0%, #4b74d9 100%);
        }

        .tool-title {
            color: #252525;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.55rem;
        }

        .tool-copy {
            color: #666;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1rem;
        }

        .panel {
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(36, 36, 36, 0.08);
            border-radius: 28px;
            padding: 1.8rem;
            box-shadow: 0 16px 50px rgba(70, 55, 24, 0.09);
            margin-top: 2rem;
        }

        .panel h3 {
            color: #242424;
            font-size: 1.7rem;
            margin-bottom: 0.4rem;
        }

        .panel p {
            color: #666;
            margin-bottom: 1.2rem;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
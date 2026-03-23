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
            background: #ffffff;
            border: 1px solid #d8d8e0;
            border-radius: 22px;
            padding: 1.8rem 1.75rem;
            min-height: 250px;
            box-shadow: none;
            transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }

        .tool-card:hover {
            border-color: #1b1b1b;
            box-shadow: 0 0 0 1px #1b1b1b;
            transform: translateY(-1px);
        }

        .tool-card-link {
            text-decoration: none !important;
            display: block;
            color: inherit !important;
        }

        .tool-card-link:hover {
            text-decoration: none !important;
        }

        .tool-icon-wrap {
            width: 74px;
            height: 74px;
            position: relative;
            margin-bottom: 1.1rem;
        }

        .tool-icon-default,
        .tool-icon-hover {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.18s ease, transform 0.18s ease;
        }

        .tool-icon-hover {
            opacity: 0;
            transform: scale(0.92);
        }

        .tool-card:hover .tool-icon-default {
            opacity: 0;
            transform: scale(0.92);
        }

        .tool-card:hover .tool-icon-hover {
            opacity: 1;
            transform: scale(1);
        }

        .tool-icon-image {
            width: 64px;
            height: 64px;
            object-fit: contain;
            border-radius: 16px;
        }

        .tool-icon-stack {
            position: relative;
            width: 60px;
            height: 48px;
        }

        .tool-icon-square {
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            background: #f87850;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
        }

        .tool-icon-square.back {
            top: 10px;
            left: 20px;
        }

        .tool-icon-square.front {
            top: 0;
            left: 0;
        }

        .tool-icon-note {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            background: linear-gradient(135deg, #7aa6ff 0%, #4f76d8 100%);
            color: #ffffff;
            font-size: 1.7rem;
            box-shadow: inset 0 -10px 18px rgba(0, 0, 0, 0.12);
        }

        .tool-title {
            color: #252525;
            font-size: 1.28rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }

        .tool-copy {
            color: #6c6c74;
            font-size: 0.98rem;
            line-height: 1.45;
            margin-bottom: 0;
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
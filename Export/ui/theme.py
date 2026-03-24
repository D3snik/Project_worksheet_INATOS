import streamlit as st


def configurar_pagina():
    st.set_page_config(page_title="Central PDF", page_icon="📄", layout="wide")


def _estilos_base():
    return """
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
    """


def _estilos_header():
    return """
        .topbar-row-marker + div[data-testid="stHorizontalBlock"] {
            align-items: center;
            gap: 0.25rem;
            margin: 0 0 1.5rem 0;
            padding-bottom: 0.9rem;
            border-bottom: 1px solid rgba(31, 31, 31, 0.10);
        }

        .brand-button-marker + div[data-testid="stButton"],
        .header-link-marker + div[data-testid="stButton"] {
            width: auto;
        }

        .brand-button-marker + div[data-testid="stButton"] > button {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: #161616 !important;
            font-size: 2.05rem !important;
            font-weight: 900 !important;
            letter-spacing: -0.05em;
            min-height: auto !important;
            padding: 0 !important;
            justify-content: flex-start !important;
        }

        .brand-button-marker + div[data-testid="stButton"] > button p {
            font-size: 2.05rem !important;
            font-weight: 900 !important;
            line-height: 1 !important;
        }

        .brand-button-marker + div[data-testid="stButton"] > button:hover {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transform: none !important;
        }

        .header-link-marker + div[data-testid="stButton"] > button {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: #202020 !important;
            font-size: 1rem !important;
            font-weight: 800 !important;
            letter-spacing: -0.01em;
            min-height: auto !important;
            padding: 0.15rem 0 !important;
            justify-content: flex-start !important;
            border-radius: 0 !important;
        }

        .header-link-marker + div[data-testid="stButton"] > button p {
            font-size: 1rem !important;
            font-weight: 800 !important;
        }

        .header-link-marker + div[data-testid="stButton"] > button[kind="primary"] {
            color: #e24d37 !important;
            box-shadow: inset 0 -2px 0 #e24d37 !important;
        }

        .header-link-marker + div[data-testid="stButton"] > button:hover {
            background: transparent !important;
            border: none !important;
            box-shadow: inset 0 -2px 0 #e24d37 !important;
            transform: none !important;
            color: #e24d37 !important;
        }
    """


def _estilos_home():
    return """
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

        .card-click-marker + div[data-testid="stButton"] {
            margin-top: -250px;
            height: 0;
            position: relative;
            z-index: 3;
            width: 100%;
        }

        .card-click-marker + div[data-testid="stButton"] > button {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 250px;
            min-height: 250px;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            color: transparent !important;
            padding: 0;
        }

        .card-click-marker + div[data-testid="stButton"] > button:hover {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transform: none;
        }

        .card-click-marker + div[data-testid="stButton"] > button p {
            display: none !important;
        }

        .tool-icon-wrap {
            width: 74px;
            height: 74px;
            position: relative;
            margin-bottom: 1.1rem;
        }

        .tool-icon-default {
            width: 74px;
            height: 74px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tool-icon-image {
            width: 64px;
            height: 64px;
            object-fit: contain;
            border-radius: 16px;
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
    """


def _estilos_modulos():
    return """
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

        .tool-hero {
            text-align: center;
            padding: 2.6rem 0 0.6rem 0;
        }

        .tool-hero-compact {
            padding-bottom: 0;
        }

        .tool-hero h1 {
            color: #26324a;
            font-size: 3rem;
            line-height: 1.06;
            letter-spacing: -0.05em;
            margin-bottom: 0.9rem;
        }

        .tool-hero p {
            color: #44516a;
            font-size: 1.05rem;
            max-width: 760px;
            margin: 0 auto;
        }

        .tool-upload-shell {
            max-width: 760px;
            margin: 1.4rem auto 0 auto;
            text-align: center;
        }

        .upload-help {
            color: #1f1f1f;
            margin-top: 0.8rem;
            font-size: 0.96rem;
        }

        div[data-testid="stFileUploader"] {
            max-width: 760px;
            margin: 0 auto;
        }

        div[data-testid="stFileUploader"] > div {
            width: 100%;
        }

        div[data-testid="stFileUploader"] section,
        div[data-testid="stFileUploaderDropzone"],
        div[data-testid="stFileUploaderDropzone"] > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        div[data-testid="stFileUploader"] > label {
            display: none;
        }

        div[data-testid="stFileUploader"] section {
            background: transparent;
            border: none;
            padding: 0;
        }

        div[data-testid="stFileUploaderDropzone"] {
            background: transparent;
            border: none;
            padding: 0;
        }

        div[data-testid="stFileUploader"] button {
            background: #ef3b33;
            color: #ffffff;
            border: none;
            border-radius: 14px;
            min-height: 82px;
            width: 100%;
            max-width: 420px;
            padding: 1rem 2.4rem;
            font-size: 1.55rem;
            font-weight: 800;
            box-shadow: 0 10px 24px rgba(239, 59, 51, 0.24);
            margin: 0 auto;
        }

        div[data-testid="stFileUploader"] button:hover {
            background: #d9322b;
            color: #ffffff;
        }

        div[data-testid="stFileUploader"] button * {
            color: #ffffff !important;
        }

        div[data-testid="stFileUploaderDropzoneInstructions"] {
            display: none;
        }

        div[data-testid="stFileUploaderFile"],
        div[data-testid="stFileUploaderFileName"],
        div[data-testid="stFileUploaderDeleteBtn"] {
            display: none !important;
        }

        div[data-testid="stFileUploader"] small {
            display: none;
        }

        div[data-testid="stSpinner"] p,
        .stSpinner p {
            color: #1f1f1f !important;
        }

        .result-shell {
            margin-top: 2rem;
        }
    """


def render_estilos():
    css = "\n".join(
        [
            _estilos_base(),
            _estilos_header(),
            _estilos_home(),
            _estilos_modulos(),
        ]
    )

    st.markdown(
        f"""
        <style>
        {css}
        </style>
        """,
        unsafe_allow_html=True,
    )
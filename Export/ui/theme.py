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
        .app-header {
            display: flex;
            align-items: center;
            gap: 3rem;
            padding: 0.15rem 0 0.95rem 0;
            margin: -0.15rem 0 1.35rem 0;
            border-bottom: 1px solid rgba(22, 22, 22, 0.12);
        }

        .brand-link {
            display: inline-flex;
            align-items: baseline;
            gap: 0;
            text-decoration: none;
            white-space: nowrap;
        }

        .brand-word {
            color: #101010;
            font-size: 2.15rem;
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 1;
            font-family: Georgia, "Times New Roman", serif;
        }

        .brand-accent {
            color: #e53935;
            font-size: 2.15rem;
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 1;
            font-family: Georgia, "Times New Roman", serif;
        }

        .brand-link:hover,
        .brand-link:visited,
        .brand-link:active {
            text-decoration: none;
        }

        .header-nav {
            display: flex;
            align-items: center;
            gap: 2.4rem;
        }

        .header-link {
            display: inline-flex;
            align-items: center;
            color: #151515;
            font-size: 0.98rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            line-height: 1;
            padding: 0.5rem 0 0.35rem 0;
            white-space: nowrap;
            text-decoration: none;
            border-bottom: 2px solid transparent;
        }

        .header-link:visited,
        .header-link:active {
            color: #151515;
            text-decoration: none;
        }

        .header-link.is-active {
            color: #151515;
            border-bottom-color: #e53935;
        }

        .header-link:hover {
            color: #151515;
            text-decoration: none;
            border-bottom-color: #e53935;
        }

        @media (max-width: 860px) {
            .app-header {
                flex-wrap: wrap;
                gap: 1rem 1.5rem;
            }

            .header-nav {
                gap: 1.2rem;
                flex-wrap: wrap;
            }
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

        .tool-card-link {
            display: block;
            color: inherit;
            text-decoration: none;
        }

        .tool-card-link:visited,
        .tool-card-link:hover,
        .tool-card-link:active {
            color: inherit;
            text-decoration: none;
        }

        .tool-card-link:hover .tool-card {
            border-color: #1b1b1b;
            box-shadow: 0 0 0 1px #1b1b1b;
            transform: translateY(-1px);
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
            text-align: center;
        }

        div[data-testid="stFileUploader"] > div {
            width: fit-content;
            max-width: 100%;
            margin: 0 auto;
        }

        div[data-testid="stFileUploader"] section,
        div[data-testid="stFileUploaderDropzone"],
        div[data-testid="stFileUploaderDropzone"] > div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: fit-content;
            max-width: 100%;
            margin: 0 auto;
        }

        div[data-testid="stFileUploader"] > label {
            display: none;
        }

        div[data-testid="stFileUploader"] section {
            background: transparent;
            border: none;
            padding: 0;
            width: fit-content;
        }

        div[data-testid="stFileUploaderDropzone"] {
            background: transparent;
            border: none;
            padding: 0;
            width: fit-content;
        }

        div[data-testid="stFileUploader"] button {
            background: #ef3b33;
            color: #ffffff;
            border: none;
            border-radius: 14px;
            min-height: 82px;
            min-width: 260px;
            width: auto;
            max-width: none;
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
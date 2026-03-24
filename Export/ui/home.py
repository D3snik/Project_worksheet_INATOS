import streamlit as st


EXCEL_ICON_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAA2FBMVEX///8OhkoRXDQbpGYHfT8vxYIAAAAAg0UBWTBMclX5+/oxkV4RXzUeqGkZn2H6/v1Or3tRypEAdikMbjl3qYfl8Op5wJoGTygSkFIAoF4ltHMEUykAdzNqpHwLQSMNdUB+1qsGLxh4loIISSdWgGVZtYYaGhphYWGHh4e3t7fa2trw8PChoaExMTHj4+OCs5O10sDX596WvqVPvIa93swAl0sAvnHH7NmSy6yp4sXF3M5FlWRWm2+myLMINx0AVydNZFUAJwiPp5YATRmouKwqYz65yL4AQAAH2CCxAAADiElEQVR4nO2ce3fSMBTAUyxmFhRldA/XsjEcBVYeRZ0KY0yn2/f/RpK05dGEMB7tzfT+/hlNduB37s2rPaeXvF6k4TVb7WuSKdftVtNrLGmQxQu/bWUrFGO1fblUx4cRivE7opTXhXUipOslpYDDFOIvS7WgfUJai1KaOMVWRJvchfixlAdtsogXSnXA590i3Q6X0ih5DJ9LQVskYVKaBYqFijTa0BJJ2g3iAe3Bq7E80oR2EGkSbRbzOS2i3ZCaDiqS8TnzOWiohCAIgiB6UlJhKUjNKDh6r+LzBxUXdipOX76evlLxMa/k5lsKToHSaL1UPp9CrL6r47Re6ubH/qWudpXKX6AUSqEUSqEUSqHUBtgyrt4lyVJqTMsyqCFwkpnUQPbzq8hIaug8X8kwzk8ykeqZm0iZxwaNOXmr5vRoa6nCBsmbUj80Y5ZHmEh2UsdnKIVSL17K5Gv57NJhVw6wlDmwg8C2jaiJDtnlEFiKFvgjnH4YHFrh/1ChsFIG7bGmksvbzBK7GEKnzzDKAWsL2LByBuyjlZgIEFJ0xBPYcwx6yz8NElsjyJJg8vjYBVoezmIGLmU4PIH9ssv+WLfJVQxGirp8fI+420BYWYFWdGc867OTyQOTorQU97niFgS191E36hpLTspgG7LT5z2W7PQOFqlC9KxZkr0lKeHGcJm9SpX7UVcgiVS9Wow5pGqcyv6kZkNqOqjE2Vev5mLmtxBy9ill8BUqzOBI6JxGCkAqXKasaJeRpS97KTriq9TAKfDeXnIGwkjx5A1pdHIRAgkhZYZfxMZSuDD04aUWz8PRLKyY4FJ8ibLDNoePdZtSWKk4ONGNQ3gKHZvAUnwYBfGMi8b60kEvcyk66jHmKybl1y6oVPw8LNkAPNDXg1Io9TKlxCOTkmomUrJbltWc32UiZW+Uv+NaPYvjMLEdR3rulzkVa7XcnKKayeX2UsQauzLOBQ6rtbt67tmc7SK1gvufNZENnHI7RWoFn87E3ymKTRlLTTYxQCmUQimUQimU+gekJBsyuNSvhx2lHn7vXyrY0engTxovPj8+TQ62Z/L0mIITId3LN9tzmdoL4sp3K5SU1n85giAIgvx/aFgH4FrPIg5alrvQsjCIliVUtCw2o2VZHj0LGOkWKl/folhalg/TKoG+3iXptLFaKt6nSQYTZQ71LAipZ+lMnkPtiowyNCnH+hcqsLsnsksXVwAAAABJRU5ErkJggg=="


def inicializar_navegacao():
    ferramenta_query = st.query_params.get("tool", "home")
    if ferramenta_query not in {"home", "folha", "notas"}:
        ferramenta_query = "home"
    st.session_state["ferramenta_ativa"] = ferramenta_query


def render_topo(ferramenta_ativa: str):
    nav_items = [
        ("home", "Visão geral"),
        ("folha", "Extração de Folha"),
        ("notas", "Notas"),
    ]

    nav_html = "".join(
        f'<a class="navpill {"navpill-active" if slug == ferramenta_ativa else ""}" href="?tool={slug}">{label}</a>'
        for slug, label in nav_items
    )

    st.markdown(
        f"""
        <div class="topbar">
            <div class="brand">Central<span>PDF</span></div>
            <div class="topnav">
                {nav_html}
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    if ferramenta_ativa != "home":
        return

    st.markdown(
        """
        <div class="hero">
            <h1>Ferramentas internas para documentos e rotinas do RH</h1>
            <p>Uma interface única para concentrar extração de folha, notas e novos módulos futuros, com navegação simples e visual mais organizado.</p>
        </div>
        <div class="section-tabs">
            <div class="section-tab">Todas</div>
            <div class="section-tab">Folha de pagamento</div>
            <div class="section-tab">Documentos</div>
            <div class="section-tab">Notas</div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_cards():
    col1, col2 = st.columns(2)
    with col1:
        st.markdown(
            f"""
            <a class="tool-card-link" href="?tool=folha">
                <div class="tool-card">
                    <div class="tool-icon-wrap">
                        <div class="tool-icon-default">
                            <img class="tool-icon-image" src="data:image/png;base64,{EXCEL_ICON_BASE64}" alt="Excel" />
                        </div>
                    </div>
                    <div class="tool-title">Extração de Folha</div>
                    <div class="tool-copy">Converta a folha analítica em planilha Excel pronta para conferência, com os campos que você já configurou no parser.</div>
                </div>
            </a>
            """,
            unsafe_allow_html=True,
        )

    with col2:
        st.markdown(
            """
            <a class="tool-card-link" href="?tool=notas">
                <div class="tool-card">
                    <div class="tool-icon-wrap">
                        <div class="tool-icon-default">
                            <div class="tool-icon-note">📝</div>
                        </div>
                    </div>
                    <div class="tool-title">Notas</div>
                    <div class="tool-copy">Espaço reservado para o próximo módulo. Pode evoluir para emissão, leitura, classificação ou consolidação de notas.</div>
                </div>
            </a>
            """,
            unsafe_allow_html=True,
        )
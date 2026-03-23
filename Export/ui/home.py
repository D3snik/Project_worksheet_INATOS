import streamlit as st


def inicializar_navegacao():
    if "ferramenta_ativa" not in st.session_state:
        st.session_state["ferramenta_ativa"] = "folha"


def render_topo():
    st.markdown(
        """
        <div class="topbar">
            <div class="brand">Central<span>PDF</span></div>
            <div class="topnav">
                <div class="navpill">Extração de Folha</div>
                <div class="navpill">Notas</div>
                <div class="navpill">Expansão futura</div>
            </div>
        </div>
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
            """
            <div class="tool-card">
                <div class="tool-icon tool-icon-red">📄</div>
                <div class="tool-title">Extração de Folha</div>
                <div class="tool-copy">Converta a folha analítica em planilha Excel pronta para conferência, com os campos que você já configurou no parser.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
        if st.button("Abrir Extração de Folha", key="abrir_folha", use_container_width=True, type="primary"):
            st.session_state["ferramenta_ativa"] = "folha"

    with col2:
        st.markdown(
            """
            <div class="tool-card">
                <div class="tool-icon tool-icon-blue">📝</div>
                <div class="tool-title">Notas</div>
                <div class="tool-copy">Espaço reservado para o próximo módulo. Pode evoluir para emissão, leitura, classificação ou consolidação de notas.</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
        if st.button("Abrir Notas", key="abrir_notas", use_container_width=True):
            st.session_state["ferramenta_ativa"] = "notas"
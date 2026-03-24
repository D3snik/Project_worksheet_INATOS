import streamlit as st


def render_modulo_notas():
    st.markdown(
        """
        <div class="tool-hero tool-hero-compact">
            <h1>Módulo de Notas</h1>
            <p>Esse espaço já fica reservado para a próxima etapa da aplicação. Quando você decidir o fluxo de notas, a estrutura visual já está pronta para receber o novo processo.</p>
        </div>
        <div class="panel">
            <h3>Próximo módulo</h3>
            <p>A navegação já está integrada ao cabeçalho principal. Quando o fluxo de notas for definido, essa área pode receber upload, consulta e exportação sem mudar a estrutura da aplicação.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.info("Módulo de notas ainda não implementado.")
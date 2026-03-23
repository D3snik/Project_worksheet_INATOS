import streamlit as st


def render_modulo_notas():
    st.markdown(
        """
        <div class="panel">
            <h3>Módulo de Notas</h3>
            <p>Esse espaço já fica reservado para a próxima etapa da aplicação. Quando você decidir o fluxo de notas, a estrutura visual já está pronta para receber o novo processo.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
    st.info("Módulo de notas ainda não implementado.")
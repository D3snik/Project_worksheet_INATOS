import streamlit as st

from ui.folha import render_modulo_folha
from ui.home import inicializar_navegacao, render_cards, render_topo
from ui.notas import render_modulo_notas
from ui.theme import configurar_pagina, render_estilos


configurar_pagina()
render_estilos()
inicializar_navegacao()

if st.session_state["ferramenta_ativa"] == "home":
    render_topo()
    render_cards()
elif st.session_state["ferramenta_ativa"] == "folha":
    render_modulo_folha()
else:
    render_modulo_notas()
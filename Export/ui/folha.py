import streamlit as st

from services.excel_exporter import gerar_excel
from services.pdf_extractor import extrair_dados_pdf


def render_modulo_folha():
    st.markdown(
        """
        <div class="tool-upload-shell">
            <a class="tool-back-link" href="?tool=home">&#8592; Voltar para ferramentas</a>
        </div>
        <div class="tool-hero">
            <h1>Extrair folha de pagamento</h1>
            <p>Selecione o PDF da folha para converter os dados em Excel. O arquivo será processado na mesma tela e o download da planilha ficará disponível logo abaixo.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # mostrar_texto_extraido = st.toggle("Mostrar texto extraído por página", value=False)
    arquivo_pdf = st.file_uploader("Selecionar PDF", type="pdf", label_visibility="collapsed")

    st.markdown(
        """
        <div class="tool-upload-shell">
            <div class="upload-help">ou arraste e solte o PDF da folha aqui</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    if arquivo_pdf is None:
        return

    with st.spinner('Lendo o PDF e organizando as colunas... Isso pode levar alguns segundos.'):
        df_resultado = extrair_dados_pdf(
            arquivo_pdf,
            # on_page_text=(
            #     lambda indice_pagina, texto: st.text_area(
            #         f"Texto extraído da página {indice_pagina}",
            #         texto,
            #         height=260,
            #     )
            # ) if mostrar_texto_extraido else None,
            on_page_text=None,
        )

    st.markdown('<div class="result-shell">', unsafe_allow_html=True)
    st.success("Extração concluída com sucesso.")
    st.download_button(
        label="Baixar planilha Excel",
        data=gerar_excel(df_resultado),
        file_name="extracao_folha_de_pagamento.xlsx",
        mime="application/vnd.ms-excel",
        use_container_width=True,
    )
    st.write("### Pré-visualização dos Dados")
    st.dataframe(df_resultado, use_container_width=True)
    st.markdown('</div>', unsafe_allow_html=True)
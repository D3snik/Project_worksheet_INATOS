import streamlit as st

from services.excel_exporter import gerar_excel
from services.pdf_extractor import extrair_dados_pdf


def render_modulo_folha():
    st.markdown(
        """
        <div class="panel">
            <h3>Extração de Folha</h3>
            <p>Faça o upload do PDF gerado pelo Persona Sql para converter em Excel. O fluxo abaixo mantém a extração atual, agora em uma interface mais preparada para expansão.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    mostrar_texto_extraido = st.toggle("Mostrar texto extraído por página", value=False)
    arquivo_pdf = st.file_uploader("Selecione ou arraste o PDF da folha aqui", type="pdf")

    if arquivo_pdf is None:
        return

    with st.spinner('Lendo o PDF e organizando as colunas... Isso pode levar alguns segundos.'):
        df_resultado = extrair_dados_pdf(
            arquivo_pdf,
            on_page_text=(
                lambda indice_pagina, texto: st.text_area(
                    f"Texto extraído da página {indice_pagina}",
                    texto,
                    height=260,
                )
            ) if mostrar_texto_extraido else None,
        )

    st.success("Extração concluída com sucesso.")
    st.write("### Pré-visualização dos Dados")
    st.dataframe(df_resultado, use_container_width=True)

    st.download_button(
        label="Baixar planilha Excel",
        data=gerar_excel(df_resultado),
        file_name="extracao_folha_de_pagamento.xlsx",
        mime="application/vnd.ms-excel",
        use_container_width=True,
    )
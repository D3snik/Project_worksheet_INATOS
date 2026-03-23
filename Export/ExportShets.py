import streamlit as st
import pandas as pd
import io

from services.pdf_extractor import extrair_dados_pdf

# --- 1. CONFIGURAÇÃO DA INTERFACE ---
st.set_page_config(page_title="Extrator de Folha de Pagamento", page_icon="📄", layout="centered")
st.title("📄 Extrator de PDF - Folha de Pagamento")
st.write("Faça o upload do PDF da folha gerado pelo sistema Persona Sql (Nasajon) para extrair os dados para Excel.")

# --- 3. INTERFACE E AÇÕES ---
arquivo_pdf = st.file_uploader("Selecione ou arraste o PDF da folha aqui", type="pdf")

if arquivo_pdf is not None:
    with st.spinner('Lendo o PDF e organizando as colunas... Isso pode levar alguns segundos.'):
        df_resultado = extrair_dados_pdf(
            arquivo_pdf,
            on_page_text=lambda indice_pagina, texto: st.text_area(
                f"Texto extraído da página {indice_pagina}",
                texto,
                height=300,
            ),
        )
    
    st.success("Extração concluída com sucesso!")
    
    st.write("### Pré-visualização dos Dados")
    st.dataframe(df_resultado)
    
    buffer = io.BytesIO()
    with pd.ExcelWriter(buffer, engine='xlsxwriter') as writer:
        df_resultado.to_excel(writer, index=False, sheet_name='Base de Calculo')
    
    st.download_button(
        label="⬇️ Baixar Planilha Excel",
        data=buffer.getvalue(),
        file_name="extracao_folha_de_pagamento.xlsx",
        mime="application/vnd.ms-excel"
    )
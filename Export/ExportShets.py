import streamlit as st
from cargos.lista_cargos import CARGOS_POSSIVEIS
import pandas as pd
import pdfplumber
import io
import re

# --- 1. CONFIGURAÇÃO DA INTERFACE ---
st.set_page_config(page_title="Extrator de Folha de Pagamento", page_icon="📄", layout="centered")
st.title("📄 Extrator de PDF - Folha de Pagamento")
st.write("Faça o upload do PDF da folha gerado pelo sistema Persona Sql (Nasajon) para extrair os dados para Excel.")

# --- 2. LÓGICA DE EXTRAÇÃO ---
def extrair_dados_pdf(pdf_file):
    colunas = [
        "FUNCIONÁRIO", "CARGO", "SALARIO BASE", "SALARIO LIQUIDO", 
        "BASE INSS PATRONAL", "BASE INSS", "INSS DESCON", 
        "SALARIOFAMILIA", "BASE FGTS", "FGTS DESCON"
    ]
    
    dados_extraidos = []
    
    with pdfplumber.open(pdf_file) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            # DEBUG: Visualizar texto extraído do PDF
            # if texto:
            #     st.text_area("Texto extraído da página", texto, height=300)
            if not texto:
                continue
            # Divide por funcionário (matrícula - nome)
            funcionarios = re.split(r'(?=\d{6} - )', texto)
            for bloco in funcionarios:
                bloco = bloco.strip()
                if not bloco or not re.match(r'^\d{6} - ', bloco):
                    continue
                linha = {c: "" for c in colunas}
                # Matrícula, Nome, Cargo
                match_func = re.search(r'^(\d{6}) - (.+)', bloco)
                # Lista de cargos importada
                cargos_possiveis = CARGOS_POSSIVEIS
                if match_func:
                    nome_completo = match_func.group(2).strip()
                    cargo_encontrado = None
                    pos_cargo = -1
                    for cargo in cargos_possiveis:
                        idx = nome_completo.find(cargo)
                        if idx != -1:
                            if pos_cargo == -1 or idx < pos_cargo:
                                cargo_encontrado = cargo
                                pos_cargo = idx
                    if cargo_encontrado:
                        linha["CARGO"] = cargo_encontrado
                        linha["FUNCIONÁRIO"] = nome_completo[:pos_cargo].strip()
                    else:
                        linha["FUNCIONÁRIO"] = nome_completo
                        linha["CARGO"] = ""
                # Salário Base
                match_base = re.search(r'Salário Base\s*([\d\.,]+)', bloco)
                if match_base:
                    linha["SALARIO BASE"] = match_base.group(1)
                # INSS Desconto
                match_inss_desc = re.search(r'INSS\s*([\d\.,]+)', bloco)
                if match_inss_desc:
                    linha["INSS DESCON"] = match_inss_desc.group(1)
                # Salário Família
                match_familia = re.search(r'Salário Familia\s*([\d\.,]+)', bloco)
                if match_familia:
                    linha["SALARIOFAMILIA"] = match_familia.group(1)
                # Linha de totais (Salário Líquido, Base INSS, etc)
                match_totais = re.search(r'Salário Líquido\s*Base INSS\s*Base INSS Patronal\s*Base IRRF\s*Base FGTS\s*Valor FGTS\s*([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)', bloco)
                if match_totais:
                    linha["SALARIO LIQUIDO"] = match_totais.group(1)
                    linha["BASE INSS"] = match_totais.group(2)
                    linha["BASE INSS PATRONAL"] = match_totais.group(3)
                    # O campo 4 é Base IRRF (não usado)
                    linha["BASE FGTS"] = match_totais.group(5)
                    linha["FGTS DESCON"] = match_totais.group(6)
                else:
                    # Alternativa: linha de totais sem cabeçalho
                    match_totais2 = re.search(r'\n([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\n', bloco)
                    if match_totais2:
                        linha["SALARIO LIQUIDO"] = match_totais2.group(1)
                        linha["BASE INSS"] = match_totais2.group(2)
                        linha["BASE INSS PATRONAL"] = match_totais2.group(3)
                        # O campo 4 é Base IRRF (não usado)
                        linha["BASE FGTS"] = match_totais2.group(5)
                        linha["FGTS DESCON"] = match_totais2.group(6)
                dados_extraidos.append(linha)
    return pd.DataFrame(dados_extraidos, columns=colunas)

# --- 3. INTERFACE E AÇÕES ---
arquivo_pdf = st.file_uploader("Selecione ou arraste o PDF da folha aqui", type="pdf")

if arquivo_pdf is not None:
    with st.spinner('Lendo o PDF e organizando as colunas... Isso pode levar alguns segundos.'):
        df_resultado = extrair_dados_pdf(arquivo_pdf)
    
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
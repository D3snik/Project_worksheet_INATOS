import streamlit as st
from Export.cargos.list_job_titles import CARGOS_POSSIVEIS
import pandas as pd
import pdfplumber
import io
import re
from utils.tratamento_excecao import tratar_nome_cargo_excecao
from utils.extracao_campos import extrair_salario_base, extrair_inss_desc, extrair_salario_familia, extrair_totais

# --- 1. CONFIGURAÇÃO DA INTERFACE ---
st.set_page_config(page_title="Extrator de Folha de Pagamento", page_icon="📄", layout="centered")
st.title("📄 Extrator de PDF - Folha de Pagamento")
st.write("Faça o upload do PDF da folha gerado pelo sistema Persona Sql (Nasajon) para extrair os dados para Excel.")

# --- 2. LÓGICA DE EXTRAÇÃO ---
def extrair_dados_pdf(pdf_file):
    colunas = [
        "FUNCIONÁRIO", "CARGO", "ATIVIDADE", "SALARIO BASE", "SALARIO LIQUIDO", 
        "BASE INSS PATRONAL", "BASE INSS", "INSS DESCON", 
        "SALARIOFAMILIA", "BASE FGTS", "FGTS DESCON", "IMPOSTO DE RENDA", "DESC VALE TRANSPORTE", "INSS 13º", "INSS SOBRE FÉRIAS"
    ]
    
    dados_extraidos = []
    
    with pdfplumber.open(pdf_file) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            # DEBUG: Visualizar texto extraído do PDF
            if texto:
                st.text_area("Texto extraído da página", texto, height=300)
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
                    nome_corrigido, cargo_corrigido = tratar_nome_cargo_excecao(nome_completo)
                    if nome_corrigido and cargo_corrigido:
                        linha["FUNCIONÁRIO"] = nome_corrigido
                        linha["CARGO"] = cargo_corrigido
                    else:
                        cargo_encontrado = None
                        for cargo in cargos_possiveis:
                            if nome_completo.endswith(cargo):
                                cargo_encontrado = cargo
                                break
                        if cargo_encontrado:
                            linha["CARGO"] = cargo_encontrado
                            linha["FUNCIONÁRIO"] = nome_completo[:-len(cargo_encontrado)].strip()
                        else:
                            linha["FUNCIONÁRIO"] = nome_completo
                            linha["CARGO"] = ""
                # Passar nome_completo para extrair_inss_13 via closure
                linha["NOME_COMPLETO"] = nome_completo if match_func else ""
                # Atividade
                from utils.extracao_campos import extrair_atividade, extrair_imposto_renda, extrair_desc_vt, extrair_inss_13, extrair_inss_ferias

                linha["INSS SOBRE FÉRIAS"] = extrair_inss_ferias(bloco)
                linha["INSS 13º"] = extrair_inss_13(bloco)
                # Desconto de Vale Transporte
                linha["DESC VALE TRANSPORTE"] = extrair_desc_vt(bloco)
                linha["ATIVIDADE"] = extrair_atividade(bloco)
                # Salário Base
                linha["SALARIO BASE"] = extrair_salario_base(bloco)
                # INSS Desconto
                linha["INSS DESCON"] = extrair_inss_desc(bloco)
                # Salário Família
                linha["SALARIOFAMILIA"] = extrair_salario_familia(bloco)
                # Linha de totais (Salário Líquido, Base INSS, etc)
                totais = extrair_totais(bloco)
                for k, v in totais.items():
                    linha[k] = v
                # Imposto de Renda
                linha["IMPOSTO DE RENDA"] = extrair_imposto_renda(bloco)
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
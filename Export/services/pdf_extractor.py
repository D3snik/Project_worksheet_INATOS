import re

import pandas as pd
import pdfplumber

from cargos.list_job_titles import CARGOS_POSSIVEIS
from utils.extracao_campos import (
    extrair_atividade,
    extrair_desc_vt,
    extrair_imposto_renda,
    extrair_inss_13,
    extrair_inss_desc,
    extrair_inss_ferias,
    extrair_plano_odontologico,
    extrair_plano_saude,
    extrair_salario_base,
    extrair_salario_familia,
    extrair_totais,
)
from utils.tratamento_excecao import tratar_nome_cargo_excecao


COLUNAS_EXPORTACAO = [
    "FUNCIONÁRIO",
    "CARGO",
    "ATIVIDADE",
    "SALARIO BASE",
    "SALARIO LIQUIDO",
    "BASE INSS PATRONAL",
    "BASE INSS",
    "INSS DESCON",
    "SALARIOFAMILIA",
    "BASE FGTS",
    "FGTS DESCON",
    "IMPOSTO DE RENDA",
    "DESC VALE TRANSPORTE",
    "PLANO DE SAÚDE",
    "PLANO ODONTOLÓGICO",
    "INSS 13º",
    "INSS SOBRE FÉRIAS",
]


def montar_linha_colaborador(bloco):
    linha = {coluna: "" for coluna in COLUNAS_EXPORTACAO}
    match_func = re.search(r'^(\d{6}) - (.+)', bloco)
    nome_completo = ""

    if match_func:
        nome_completo = match_func.group(2).strip()
        nome_corrigido, cargo_corrigido = tratar_nome_cargo_excecao(nome_completo)

        if nome_corrigido and cargo_corrigido:
            linha["FUNCIONÁRIO"] = nome_corrigido
            linha["CARGO"] = cargo_corrigido
        else:
            cargo_encontrado = None
            for cargo in CARGOS_POSSIVEIS:
                if nome_completo.endswith(cargo):
                    cargo_encontrado = cargo
                    break

            if cargo_encontrado:
                linha["CARGO"] = cargo_encontrado
                linha["FUNCIONÁRIO"] = nome_completo[:-len(cargo_encontrado)].strip()
            else:
                linha["FUNCIONÁRIO"] = nome_completo
                linha["CARGO"] = ""

    linha["ATIVIDADE"] = extrair_atividade(bloco)
    linha["SALARIO BASE"] = extrair_salario_base(bloco)
    linha["INSS DESCON"] = extrair_inss_desc(bloco)
    linha["SALARIOFAMILIA"] = extrair_salario_familia(bloco)
    linha["IMPOSTO DE RENDA"] = extrair_imposto_renda(bloco)
    linha["DESC VALE TRANSPORTE"] = extrair_desc_vt(bloco)
    linha["PLANO DE SAÚDE"] = extrair_plano_saude(bloco)
    linha["PLANO ODONTOLÓGICO"] = extrair_plano_odontologico(bloco)
    linha["INSS 13º"] = extrair_inss_13(bloco)
    linha["INSS SOBRE FÉRIAS"] = extrair_inss_ferias(bloco)

    totais = extrair_totais(bloco)
    for chave, valor in totais.items():
        linha[chave] = valor

    return linha


def extrair_dados_pdf(pdf_file, on_page_text=None):
    dados_extraidos = []

    with pdfplumber.open(pdf_file) as pdf:
        for indice_pagina, pagina in enumerate(pdf.pages, start=1):
            texto = pagina.extract_text()
            if on_page_text and texto:
                on_page_text(indice_pagina, texto)
            if not texto:
                continue

            funcionarios = re.split(r'(?=\d{6} - )', texto)
            for bloco in funcionarios:
                bloco = bloco.strip()
                if not bloco or not re.match(r'^\d{6} - ', bloco):
                    continue
                dados_extraidos.append(montar_linha_colaborador(bloco))

    return pd.DataFrame(dados_extraidos, columns=COLUNAS_EXPORTACAO)
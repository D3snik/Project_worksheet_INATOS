
import re

def extrair_atividade(bloco):
    # Exemplos de padrões: Normal, Afastado Definitivamente 01/01/2024, Licença Maternidade, etc
    # Ajuste os padrões conforme necessário para o seu PDF
        # Extrai "Afastado Definitivamente" e a data, se houver
        match_afastado = re.search(r'Afastado Definitivamente ?(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_afastado:
            return f"Afastado Definitivamente {match_afastado.group(1)}"
        # Extrai "Licença Maternidade" e a data, se houver
        match_licenca = re.search(r'Licen[çc]a Maternidade ?(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_licenca:
            return f"Licença Maternidade {match_licenca.group(1)}"
        # Extrai "Férias" e a data, se houver
        match_ferias = re.search(r'F[ée]rias ?(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_ferias:
            return f"Férias {match_ferias.group(1)}"
        # Outros padrões
        match = re.search(r'(Normal|Licen[çc]a Maternidade|F[ée]rias|Afastado)', bloco, re.IGNORECASE)
        return match.group(0).strip() if match else "Normal"

def extrair_salario_base(bloco):
    match = re.search(r'Salário Base\s*([\d\.,]+)', bloco)
    return match.group(1) if match else ""

def extrair_inss_desc(bloco):
    match = re.search(r'INSS\s*([\d\.,]+)', bloco)
    return match.group(1) if match else ""

def extrair_salario_familia(bloco):
    match = re.search(r'Salário Familia\s*([\d\.,]+)', bloco)
    return match.group(1) if match else ""

def extrair_totais(bloco):
    # Tenta encontrar linha de totais com cabeçalho
    match = re.search(r'Salário Líquido\s*Base INSS\s*Base INSS Patronal\s*Base IRRF\s*Base FGTS\s*Valor FGTS\s*([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)', bloco)
    if match:
        return {
            "SALARIO LIQUIDO": match.group(1),
            "BASE INSS": match.group(2),
            "BASE INSS PATRONAL": match.group(3),
            # O campo 4 é Base IRRF (não usado)
            "BASE FGTS": match.group(5),
            "FGTS DESCON": match.group(6)
        }
    # Alternativa: linha de totais sem cabeçalho
    match2 = re.search(r'\n([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\n', bloco)
    if match2:
        return {
            "SALARIO LIQUIDO": match2.group(1),
            "BASE INSS": match2.group(2),
            "BASE INSS PATRONAL": match2.group(3),
            # O campo 4 é Base IRRF (não usado)
            "BASE FGTS": match2.group(5),
            "FGTS DESCON": match2.group(6)
        }
    return {}

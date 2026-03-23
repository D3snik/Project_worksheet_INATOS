import re

def extrair_inss_ferias(bloco):
    # Procura por "INSS Sobre Férias" seguido de valor
    match = re.search(r'INSS Sobre F[ée]rias\s*([\d\.,]+)', bloco, re.IGNORECASE)
    if match:
        valor = match.group(1).replace('.', '').replace(',', '.')
        try:
            valor_float = float(valor)
            if valor_float < 0:
                return "0"
            return str(match.group(1))
        except Exception:
            return match.group(1)
    return "0"

def extrair_inss_13(bloco):
    # Procura por linha que contenha apenas "INSS 13" (com ou sem º), seguido de valor
    match = re.search(r'^[^\S\r\n]*INSS 13.?\s*([\d\.,]+)', bloco, re.IGNORECASE | re.MULTILINE)
    if match:
        valor = match.group(1).replace('.', '').replace(',', '.')
        try:
            valor_float = float(valor)
            if valor_float < 0:
                return "0"
            return match.group(1)
        except Exception:
            return match.group(1)
    return "0"

def extrair_desc_vt(bloco):
    # Procura por "Desconto de Vale Transporte (valor)" seguido de valor
    match = re.search(r'Desconto de Vale Transporte \(valor\)\s*([\d\.,]+)', bloco, re.IGNORECASE)
    if match:
        valor = match.group(1).replace('.', '').replace(',', '.')
        try:
            valor_float = float(valor)
            if valor_float < 0:
                return "0"
            return str(match.group(1))
        except Exception:
            return match.group(1)
    return "0"

def extrair_imposto_renda(bloco):
    # Procura por "Imposto de Renda" seguido de valor
    match = re.search(r'Imposto de Renda\s*(-?[\d\.,]+)', bloco, re.IGNORECASE)
    if match:
        valor = match.group(1).replace('.', '').replace(',', '.')
        try:
            valor_float = float(valor)
            if valor_float < 0:
                return "0"
            return str(match.group(1))
        except Exception:
            return match.group(1)
    return "0"

def extrair_atividade(bloco):
        match_afastado = re.search(r'Afastado Definitivamente\s*em\s*(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_afastado:
            return f"Afastado Definitivamente em {match_afastado.group(1)}"
        match_licenca = re.search(r'Licen[çc]a Maternidade\s*em\s*(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_licenca:
            return f"Licença Maternidade em {match_licenca.group(1)}"
        match_ferias = re.search(r'F[ée]rias\s*em\s*(\d{2}/\d{2}/\d{4})', bloco, re.IGNORECASE)
        if match_ferias:
            return f"Férias em {match_ferias.group(1)}"
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
    if match:
        valor = match.group(1).replace('.', '').replace(',', '.')
        try:
            valor_float = float(valor)
            if valor_float < 0:
                return "0"
            return str(match.group(1))
        except Exception:
            return match.group(1)
    return "0"

def extrair_totais(bloco):
    match = re.search(r'Salário Líquido\s*Base INSS\s*Base INSS Patronal\s*Base IRRF\s*Base FGTS\s*Valor FGTS\s*([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)', bloco)
    if match:
        return {
            "SALARIO LIQUIDO": match.group(1),
            "BASE INSS": match.group(2),
            "BASE INSS PATRONAL": match.group(3),
            "BASE FGTS": match.group(5),
            "FGTS DESCON": match.group(6)
        }
    match2 = re.search(r'\n([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\n', bloco)
    if match2:
        return {
            "SALARIO LIQUIDO": match2.group(1),
            "BASE INSS": match2.group(2),
            "BASE INSS PATRONAL": match2.group(3),
            "BASE FGTS": match2.group(5),
            "FGTS DESCON": match2.group(6)
        }
    return {}

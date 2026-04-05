import re
import unicodedata


def _valor_para_float(valor):
    return float(valor.replace('.', '').replace(',', '.'))


def _normalizar_texto(texto):
    texto = unicodedata.normalize('NFKD', texto)
    texto = ''.join(caractere for caractere in texto if not unicodedata.combining(caractere))
    return texto.lower()


def _formatar_valor(valor_float):
    if valor_float <= 0:
        return '0'
    return f"{valor_float:,.2f}".replace(',', '#').replace('.', ',').replace('#', '.')


def _extrair_valor_evento(bloco, padrao):
    match = re.search(padrao, bloco, re.IGNORECASE)
    if not match:
        return 0.0
    try:
        valor_float = _valor_para_float(match.group(1))
        return max(valor_float, 0.0)
    except Exception:
        return 0.0


def _extrair_soma_valores_evento(bloco, padrao_evento):
    soma = 0.0
    for linha in bloco.split('\n'):
        if re.search(padrao_evento, linha, re.IGNORECASE):
            matches_num = re.findall(r'[\d\.,]+', linha)
            if matches_num:
                ultimo_num = matches_num[-1]
                try:
                    valor_float = _valor_para_float(ultimo_num)
                    soma += max(valor_float, 0.0)
                except Exception:
                    pass
    return soma


def _extrair_valores_apos_aliases(bloco, aliases):
    valores = []
    aliases_normalizados = sorted({_normalizar_texto(alias) for alias in aliases}, key=len, reverse=True)
    padrao_aliases = '|'.join(re.escape(alias) for alias in aliases_normalizados)

    for linha in bloco.split('\n'):
        linha_normalizada = _normalizar_texto(linha)
        for match_alias in re.finditer(padrao_aliases, linha_normalizada):
            trecho = linha_normalizada[match_alias.end():]
            match_valor = re.search(r'-?\d{1,3}(?:\.\d{3})*,\d{2}|-?\d+,\d{2}', trecho)
            if match_valor:
                try:
                    valor_float = _valor_para_float(match_valor.group(0))
                    if valor_float > 0:
                        valores.append(valor_float)
                except Exception:
                    pass

    return valores


def _somar_valores_apos_aliases(bloco, aliases):
    return sum(_extrair_valores_apos_aliases(bloco, aliases))


def _extrair_primeiro_valor_apos_aliases(bloco, aliases):
    valores = _extrair_valores_apos_aliases(bloco, aliases)
    return valores[0] if valores else 0.0


def extrair_plano_saude(bloco):
    aliases = [
        'Plano de Saude Titular',
        'Plano de Saude Dependente',
        'Plano de Saude',
        'Plano Saude Titular',
        'Plano Saude Dependente',
        'Plano Saude',
    ]
    valor_total = _somar_valores_apos_aliases(bloco, aliases)
    return _formatar_valor(valor_total)


def extrair_plano_odontologico(bloco):
    aliases = [
        'Plano Odontologico Titular',
        'Plano Odontologico Dependente',
        'Plano Odontologico',
        'Odontologico Titular',
        'Odontologico Dependente',
        'Odontologico',
        'Odontolgico',
        'Odntologico',
    ]
    valor_total = _somar_valores_apos_aliases(bloco, aliases)
    return _formatar_valor(valor_total)

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
    match = re.search(r'INSS\s*13\s*[ºo]\s*([\d\.,]+)', bloco, re.IGNORECASE)
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
    match = re.search(r'Sal[áa\xC3\xA1]rio Base\s*([\d\.,]+)', bloco, re.IGNORECASE)
    if match:
        return match.group(1)
    match_maternidade = re.search(r'Sal[áa\xC3\xA1]rio Maternidade\s*([\d\.,]+)', bloco, re.IGNORECASE)
    return match_maternidade.group(1) if match_maternidade else "0"

def extrair_salario_contratual(bloco):
    valor_contratual = _extrair_primeiro_valor_apos_aliases(bloco, ['Salario Contratual', 'Sal.Contr'])
    if valor_contratual > 0:
        return _formatar_valor(valor_contratual)

    salario_base = extrair_salario_base(bloco)
    return salario_base if salario_base and salario_base != '0' else '0'

def extrair_inss_desc(bloco):
    match = re.search(r'INSS\s*([\d\.,]+)', bloco)
    return match.group(1) if match else ""

def extrair_salario_familia(bloco):
    match = re.search(r'Sal[áa\xC3\xA1]rio Fam[ií\xC3\xAD]lia\s*([\d\.,]+)', bloco, re.IGNORECASE)
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

def extrair_econsignado(bloco):
    valor_total = 0.0

    for linha in bloco.split('\n'):
        linha_normalizada = _normalizar_texto(linha)
        match = re.search(
            r'emprestimo\s+econsignado\s+em\s+folha\s+(-?\d{1,3}(?:\.\d{3})*,\d{2}|-?\d+,\d{2})',
            linha_normalizada,
        )
        if not match:
            continue

        try:
            valor_float = _valor_para_float(match.group(1))
            if valor_float > 0:
                valor_total += valor_float
        except Exception:
            pass

    return _formatar_valor(valor_total)

def extrair_totais(bloco):
    match = re.search(r'Sal[áa\xC3\xA1]rio L[ií\xC3\xAD]quido\s*Base INSS\s*Base INSS Patronal\s*Base IRRF\s*Base FGTS\s*Valor FGTS\s*([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)\s+([\d\.,]+)', bloco, re.IGNORECASE)
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

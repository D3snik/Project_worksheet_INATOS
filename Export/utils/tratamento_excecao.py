# Função para tratar nomes/cargos bugados específicos

def tratar_nome_cargo_excecao(nome_completo):
    # Lista de exceções: (parte_bugada, nome_corrigido, cargo_corrigido)
    excecoes = [
        ("ANA CAROLINA RODRIGUES DE MATTOS PEREIRJ", "ANA CAROLINA RODRIGUES DE MATTOS PEREIRA", "JOVEM APRENDIZ (AUX DE OPERAÇÕES EM TRANSPORTE)"),
        ("MARIA FERNANDA DE OLIVEIRA VASCONCELOS BJOARVEBMOS", "MARIA FERNANDA DE OLIVEIRA VASCONCELOS", "JOVEM APRENDIZ (AUX DE OPERAÇÕES EM TRANSPORTE)"),
        ("MARIA EDUARDA CARVALHO LOUREIRO DA SILVJ", "MARIA EDUARDA CARVALHO LOUREIRO DA SILVA", "JOVEM APRENDIZ (AUX DE OPERAÇÕES EM TRANSPORTE)"),
        ("VICTORIA APARECIDA DOS REIS LOURENCO ARAJOUVJOE MD EA PSROEUNZDAIZ", "VICTORIA APARECIDA DOS REIS LOURENCO ARAUJO", "JOVEM APRENDIZ (AUX DE OPERAÇÕES EM TRANSPORTE)")
    ]
    for parte_bugada, nome_corrigido, cargo_corrigido in excecoes:
        if parte_bugada in nome_completo:
            return nome_corrigido, cargo_corrigido
    return None, None

import io

import pandas as pd


def gerar_excel(df_resultado):
    buffer = io.BytesIO()
    with pd.ExcelWriter(buffer, engine='xlsxwriter') as writer:
        df_resultado.to_excel(writer, index=False, sheet_name='Base de Calculo')
    return buffer.getvalue()
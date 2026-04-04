import io
import urllib.parse
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from services.pdf_extractor import extrair_dados_pdf
from services.excel_exporter import gerar_excel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/extract-folha")
async def extract_folha(file: UploadFile = File(...)):
    try:
        content = await file.read()
        pdf_file = io.BytesIO(content)
        
        df = extrair_dados_pdf(pdf_file)
        
        if df is None or df.empty:
            return JSONResponse({"error": "Nenhum dado extraído do PDF. Verifique se o arquivo está correto."}, status_code=400)
            
        excel_data = gerar_excel(df)
        
        filename = f"extracao_{file.filename.replace(' ', '_')}"
        if not filename.endswith(".xlsx"):
            filename += ".xlsx"
            
        encoded_filename = urllib.parse.quote(filename)

        return Response(
            content=excel_data,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded_filename}"}
        )
    except Exception as e:
        import traceback
        traceback.print_exc()

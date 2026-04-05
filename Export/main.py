import io
import os
import urllib.parse
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .auth import (
    AuthenticatedUser,
    authenticate_user,
    create_access_token,
    ensure_seed_user,
    get_current_user,
)
from .database import init_database
from .services.pdf_extractor import extrair_dados_pdf
from .services.excel_exporter import gerar_excel


def get_allowed_origins() -> list[str]:
    raw_origins = os.getenv(
        "INATOS_ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174",
    )
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_database()
    ensure_seed_user()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=150)
    password: str = Field(min_length=1, max_length=255)


class UserResponse(BaseModel):
    is_active: bool


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


def serialize_user(user: AuthenticatedUser) -> UserResponse:
    return UserResponse(
        is_active=user.is_active,
    )


@app.post("/api/auth/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    user = authenticate_user(payload.username, payload.password)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos.",
        )

    return LoginResponse(
        access_token=create_access_token(user),
    )


@app.get("/api/auth/me", response_model=UserResponse)
async def read_current_user(
    current_user: AuthenticatedUser = Depends(get_current_user),
):
    return serialize_user(current_user)

@app.post("/api/extract-folha")
async def extract_folha(
    file: UploadFile = File(...),
    _: AuthenticatedUser = Depends(get_current_user),
):
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
        return JSONResponse(
            {"error": f"Erro ao processar o arquivo: {str(e)}"},
            status_code=500,
        )

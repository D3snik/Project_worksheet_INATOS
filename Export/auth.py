import os
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from dotenv import load_dotenv

from .database import get_connection


PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")


def _get_required_env(name: str) -> str:
    value = os.getenv(name)
    if value is None or not value.strip():
        raise RuntimeError(f"Missing required environment variable: {name}")

    return value.strip()


JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("INATOS_ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
JWT_SECRET_KEY = _get_required_env("INATOS_AUTH_SECRET_KEY")
SEED_USERNAME = _get_required_env("INATOS_SEED_USERNAME")
SEED_PASSWORD = _get_required_env("INATOS_SEED_PASSWORD")
SEED_FULL_NAME = os.getenv("INATOS_SEED_FULL_NAME", SEED_USERNAME).strip() or SEED_USERNAME

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
bearer_scheme = HTTPBearer(auto_error=False)


@dataclass(slots=True)
class AuthenticatedUser:
    id: int
    username: str
    full_name: str
    is_active: bool


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    return pwd_context.verify(plain_password, password_hash)


def _row_to_user(row) -> AuthenticatedUser:
    return AuthenticatedUser(
        id=row["id"],
        username=row["username"],
        full_name=row["full_name"],
        is_active=bool(row["is_active"]),
    )


def get_user_by_username(username: str) -> AuthenticatedUser | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, username, full_name, is_active FROM users WHERE username = ?",
            (username,),
        ).fetchone()

    if row is None:
        return None

    return _row_to_user(row)


def get_user_by_id(user_id: int) -> AuthenticatedUser | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, username, full_name, is_active FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()

    if row is None:
        return None

    return _row_to_user(row)


def ensure_seed_user() -> None:
    with get_connection() as connection:
        existing_user = connection.execute(
            "SELECT id FROM users WHERE username = ?",
            (SEED_USERNAME,),
        ).fetchone()

        if existing_user is not None:
            return

        connection.execute(
            """
            INSERT INTO users (username, full_name, password_hash, is_active)
            VALUES (?, ?, ?, 1)
            """,
            (SEED_USERNAME, SEED_FULL_NAME, hash_password(SEED_PASSWORD)),
        )
        connection.commit()


def authenticate_user(username: str, password: str) -> AuthenticatedUser | None:
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT id, username, full_name, password_hash, is_active
            FROM users
            WHERE username = ?
            """,
            (username,),
        ).fetchone()

    if row is None or not verify_password(password, row["password_hash"]):
        return None

    if not bool(row["is_active"]):
        return None

    return _row_to_user(row)


def create_access_token(user: AuthenticatedUser) -> str:
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user.id),
        "iat": now,
        "exp": expires_at,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> AuthenticatedUser:
    unauthorized_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Autenticação inválida ou expirada.",
    )

    if credentials is None or credentials.scheme.lower() != "bearer":
        raise unauthorized_exception

    try:
        payload = jwt.decode(
            credentials.credentials,
            JWT_SECRET_KEY,
            algorithms=[JWT_ALGORITHM],
        )
    except jwt.PyJWTError as exc:
        raise unauthorized_exception from exc

    subject = payload.get("sub")
    if not isinstance(subject, str) or not subject.isdigit():
        raise unauthorized_exception

    user = get_user_by_id(int(subject))
    if user is None or not user.is_active:
        raise unauthorized_exception

    return user
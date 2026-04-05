import {
  buildApiUrl,
  buildAuthHeaders,
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from './api';

export interface AuthUser {
  is_active: boolean;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

async function parseError(response: Response, fallbackMessage: string) {
  try {
    const payload = await response.json();

    if (typeof payload?.detail === 'string') {
      return payload.detail;
    }

    if (typeof payload?.error === 'string') {
      return payload.error;
    }
  } catch {
    // Keep the fallback when the backend response is not JSON.
  }

  return fallbackMessage;
}

export async function login(username: string, password: string) {
  const response = await fetch(buildApiUrl('/api/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response, 'Não foi possível autenticar o usuário.'));
  }

  const payload = (await response.json()) as LoginResponse;
  setAuthToken(payload.access_token);
}

export async function getCurrentUser() {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const response = await fetch(buildApiUrl('/api/auth/me'), {
    headers: {
      ...buildAuthHeaders(),
    },
  });

  if (response.status === 401) {
    clearAuthToken();
    return null;
  }

  if (!response.ok) {
    throw new Error(await parseError(response, 'Não foi possível validar a sessão atual.'));
  }

  return (await response.json()) as AuthUser;
}

export function logout() {
  clearAuthToken();
}
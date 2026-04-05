import { buildApiUrl, buildAuthHeaders, clearAuthToken } from './api';

function getFilenameFromDisposition(header: string | null, fallback: string) {
  if (!header) {
    return fallback;
  }

  const utf8Match = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const asciiMatch = header.match(/filename="?([^";]+)"?/i);
  return asciiMatch?.[1] ?? fallback;
}

export async function extractFolha(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(buildApiUrl('/api/extract-folha'), {
    method: 'POST',
    headers: {
      ...buildAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
      throw new Error('Sua sessão expirou. Faça login novamente.');
    }

    let message = 'Não foi possível processar o arquivo.';

    try {
      const payload = await response.json();
      if (typeof payload?.error === 'string') {
        message = payload.error;
      }
    } catch {
      // Keep the fallback message when the backend does not return JSON.
    }

    throw new Error(message);
  }

  const blob = await response.blob();
  const filename = getFilenameFromDisposition(
    response.headers.get('content-disposition'),
    `${file.name.replace(/\.pdf$/i, '') || 'extracao'}.xlsx`
  );

  return { blob, filename };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
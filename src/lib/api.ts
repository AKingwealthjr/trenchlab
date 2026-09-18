export interface ApiPayload {
  success?: boolean;
  error?: string;
  message?: string;
  [key: string]: unknown;
}

/** Safely decodes our API contract, including HTML/empty proxy failures. */
export async function readApiJson(response: Response): Promise<ApiPayload> {
  const body = await response.text();
  const contentType = response.headers.get('content-type') || '';
  if (!body.trim()) {
    return { success: false, error: 'EMPTY_API_RESPONSE', message: `The server returned an empty response (HTTP ${response.status}).` };
  }
  if (!contentType.includes('application/json')) {
    const preview = body.slice(0, 200).replace(/\s+/g, ' ').trim();
    return { 
      success: false, 
      error: 'INVALID_API_RESPONSE', 
      message: `The server returned ${contentType || 'non-JSON'} (HTTP ${response.status}): ${preview || 'no body'}` 
    };
  }
  try {
    return JSON.parse(body) as ApiPayload;
  } catch {
    return { success: false, error: 'MALFORMED_API_RESPONSE', message: 'The server returned malformed JSON.' };
  }
}

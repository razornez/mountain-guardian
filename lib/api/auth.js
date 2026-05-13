import { API_ERROR_CODES } from './constants.js';

export function validateApiKey({ requiredApiKey, requestApiKey }) {
  if (!requiredApiKey) {
    return { ok: true };
  }

  if (!requestApiKey) {
    return { ok: false, code: API_ERROR_CODES.UNAUTHORIZED, message: 'Missing API key.', status: 401 };
  }

  if (requestApiKey !== requiredApiKey) {
    return { ok: false, code: API_ERROR_CODES.FORBIDDEN, message: 'Invalid API key.', status: 403 };
  }

  return { ok: true };
}

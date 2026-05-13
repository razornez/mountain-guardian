import { API_ERROR_CODES, STATUS_LIST_LIMIT } from './constants.js';

export function createStatusRouteHandler({ connect, validateStatusPayload, createStatus, listStatus, corsSuccess, corsFailure, logPerf }) {
  return async function handleRoute(request, { params }) {
    const { path = [] } = params;
    const route = `/${path.join('/')}`;
    const method = request.method;

    try {
      const database = await connect();

      if ((route === '/root' || route === '/') && method === 'GET') {
        return corsSuccess({ message: 'Hello World' });
      }

      if (route === '/status' && method === 'POST') {
        const startedAt = Date.now();
        const payload = await request.json();
        const parsedPayload = validateStatusPayload(payload);

        if (!parsedPayload.success) {
          return corsFailure(API_ERROR_CODES.INVALID_PAYLOAD, 'client_name wajib diisi dan maksimal 120 karakter.', 400);
        }

        const statusObj = await createStatus(database, parsedPayload.data.client_name);
        logPerf({ route, method, step: 'createStatusCheck', durationMs: Date.now() - startedAt });
        return corsSuccess(statusObj, 201);
      }

      if (route === '/status' && method === 'GET') {
        const startedAt = Date.now();
        const statusChecks = await listStatus(database, STATUS_LIST_LIMIT);
        logPerf({ route, method, step: 'getStatusChecks', durationMs: Date.now() - startedAt });
        return corsSuccess(statusChecks);
      }

      return corsFailure(API_ERROR_CODES.ROUTE_NOT_FOUND, `Route ${route} not found`, 404);
    } catch (error) {
      return corsFailure(API_ERROR_CODES.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : 'Internal server error', 500);
    }
  };
}

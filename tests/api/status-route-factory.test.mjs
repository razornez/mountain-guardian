import test from 'node:test';
import assert from 'node:assert/strict';
import { createStatusRouteHandler } from '../../lib/api/status-route-factory.js';

function createDeps(overrides = {}) {
  return {
    connect: async () => ({}),
    validateStatusPayload: () => ({ success: true, data: { client_name: 'alpha' } }),
    createStatus: async () => ({ id: '1', client_name: 'alpha', timestamp: new Date().toISOString() }),
    listStatus: async () => [{ id: '1', client_name: 'alpha' }],
    corsSuccess: (data, status = 200) => ({ ok: true, status, body: { success: true, data } }),
    corsFailure: (code, message, status = 400) => ({ ok: false, status, body: { success: false, code, message } }),
    logPerf: () => {},
    ...overrides,
  };
}

test('GET /root returns hello world', async () => {
  const handler = createStatusRouteHandler(createDeps());
  const result = await handler({ method: 'GET' }, { params: { path: ['root'] } });
  assert.equal(result.status, 200);
  assert.equal(result.body.data.message, 'Hello World');
});

test('POST /status invalid payload returns INVALID_PAYLOAD', async () => {
  const handler = createStatusRouteHandler(createDeps({ validateStatusPayload: () => ({ success: false }) }));
  const result = await handler({ method: 'POST', json: async () => ({}) }, { params: { path: ['status'] } });
  assert.equal(result.status, 400);
  assert.equal(result.body.code, 'INVALID_PAYLOAD');
});

test('unknown route returns ROUTE_NOT_FOUND', async () => {
  const handler = createStatusRouteHandler(createDeps());
  const result = await handler({ method: 'GET' }, { params: { path: ['unknown'] } });
  assert.equal(result.status, 404);
  assert.equal(result.body.code, 'ROUTE_NOT_FOUND');
});

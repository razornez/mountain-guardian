import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCorsHeaders } from '../../lib/api/cors.js';

test('applyCorsHeaders sets expected headers', () => {
  const response = new Response('ok');
  const updated = applyCorsHeaders(response, 'https://example.com');

  assert.equal(updated.headers.get('Access-Control-Allow-Origin'), 'https://example.com');
  assert.equal(updated.headers.get('Access-Control-Allow-Methods'), 'GET, POST, PUT, DELETE, OPTIONS');
  assert.equal(updated.headers.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization');
  assert.equal(updated.headers.get('Access-Control-Allow-Credentials'), 'true');
});

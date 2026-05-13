import test from 'node:test';
import assert from 'node:assert/strict';
import { validateApiKey } from '../../lib/api/auth.js';

test('validateApiKey allows request when api key is not required', () => {
  const result = validateApiKey({ requiredApiKey: '', requestApiKey: null });
  assert.equal(result.ok, true);
});

test('validateApiKey returns UNAUTHORIZED when key missing', () => {
  const result = validateApiKey({ requiredApiKey: 'secret', requestApiKey: null });
  assert.equal(result.ok, false);
  assert.equal(result.code, 'UNAUTHORIZED');
  assert.equal(result.status, 401);
});

test('validateApiKey returns FORBIDDEN when key invalid', () => {
  const result = validateApiKey({ requiredApiKey: 'secret', requestApiKey: 'wrong' });
  assert.equal(result.ok, false);
  assert.equal(result.code, 'FORBIDDEN');
  assert.equal(result.status, 403);
});

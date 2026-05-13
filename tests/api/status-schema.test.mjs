import test from 'node:test';
import assert from 'node:assert/strict';
import { validateStatusPayload } from '../../lib/api/status-schema.js';

test('validateStatusPayload accepts valid payload', () => {
  const result = validateStatusPayload({ client_name: 'monitor-client' });
  assert.equal(result.success, true);
});

test('validateStatusPayload rejects empty client_name', () => {
  const result = validateStatusPayload({ client_name: '  ' });
  assert.equal(result.success, false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { createStatusCheck, getStatusChecks } from '../../server/services/status.service.js';

test('createStatusCheck inserts document with generated id', async () => {
  let inserted = null;
  const database = {
    collection: () => ({
      insertOne: async (doc) => {
        inserted = doc;
      },
    }),
  };

  const result = await createStatusCheck(database, 'agent-client');
  assert.equal(result.client_name, 'agent-client');
  assert.ok(result.id);
  assert.ok(result.timestamp instanceof Date);
  assert.deepEqual(inserted, result);
});

test('getStatusChecks returns records without _id', async () => {
  const database = {
    collection: () => ({
      find: () => ({
        limit: () => ({
          toArray: async () => [
            { _id: 'mongo', id: '1', client_name: 'client-a', timestamp: new Date('2024-01-01T00:00:00Z') },
          ],
        }),
      }),
    }),
  };

  const result = await getStatusChecks(database, 1000);
  assert.equal(result.length, 1);
  assert.equal(result[0]._id, undefined);
  assert.equal(result[0].client_name, 'client-a');
});

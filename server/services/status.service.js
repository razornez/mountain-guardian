import { v4 as uuidv4 } from 'uuid';
import { insertStatusCheck, listStatusChecks } from '../repositories/status.repository.js';

export async function createStatusCheck(database, clientName) {
  const statusObj = {
    id: uuidv4(),
    client_name: clientName,
    timestamp: new Date(),
  };

  return insertStatusCheck(database, statusObj);
}

export async function getStatusChecks(database, limit = 1000) {
  return listStatusChecks(database, limit);
}

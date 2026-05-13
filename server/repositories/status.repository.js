export async function insertStatusCheck(database, statusObj) {
  await database.collection('status_checks').insertOne(statusObj);
  return statusObj;
}

export async function listStatusChecks(database, limit = 1000) {
  const statusChecks = await database.collection('status_checks').find({}).limit(limit).toArray();
  return statusChecks.map(({ _id, ...rest }) => rest);
}

import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { apiFailure, apiSuccess } from '@/lib/api/response';
import { applyCorsHeaders } from '@/lib/api/cors';
import { validateStatusPayload } from '@/lib/api/status-schema';
import { createStatusCheck, getStatusChecks } from '@/server/services/status.service';
import { API_ERROR_CODES } from '@/lib/api/constants';
import { logPerf } from '@/lib/perf/logger';
import { createStatusRouteHandler } from '@/lib/api/status-route-factory';
import { validateApiKey } from '@/lib/api/auth';

let client;
let db;

async function connectToMongo() {
  if (!client) {
    if (!process.env.MONGO_URL || !process.env.DB_NAME) throw new Error('Missing MongoDB configuration');
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}

function corsSuccess(data, status = 200) {
  return applyCorsHeaders(apiSuccess(data, status), process.env.CORS_ORIGINS || '*');
}

function corsFailure(code, message, status = 400) {
  return applyCorsHeaders(apiFailure(code, message, status), process.env.CORS_ORIGINS || '*');
}

function enforceApiKey(request) {
  const authResult = validateApiKey({
    requiredApiKey: process.env.INTERNAL_API_KEY,
    requestApiKey: request.headers.get('x-api-key'),
  });

  if (authResult.ok) return null;
  return corsFailure(authResult.code, authResult.message, authResult.status);
}

export async function OPTIONS() {
  return applyCorsHeaders(new NextResponse(null, { status: 200 }), process.env.CORS_ORIGINS || '*');
}

export function createApiHandler(deps = {}) {
  const statusHandler = createStatusRouteHandler({
    connect: deps.connect || connectToMongo,
    validateStatusPayload: deps.validateStatusPayload || validateStatusPayload,
    createStatus: deps.createStatus || createStatusCheck,
    listStatus: deps.listStatus || getStatusChecks,
    corsSuccess,
    corsFailure,
    logPerf,
  });

  return async (request, context) => {
    const authError = enforceApiKey(request);
    if (authError) return authError;
    return statusHandler(request, context);
  };
}

const handleRoute = createApiHandler();

export const GET = handleRoute;
export const POST = handleRoute;
export const PUT = handleRoute;
export const DELETE = handleRoute;
export const PATCH = handleRoute;

import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { apiFailure, apiSuccess } from '@/lib/api/response';

let client;
let db;

const statusPayloadSchema = z.object({
  client_name: z.string().trim().min(1).max(120),
});

async function connectToMongo() {
  if (!client) {
    if (!process.env.MONGO_URL || !process.env.DB_NAME) {
      throw new Error('Missing MongoDB configuration');
    }

    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }

  return db;
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

function corsSuccess(data, status = 200) {
  return handleCORS(apiSuccess(data, status));
}

function corsFailure(code, message, status = 400) {
  return handleCORS(apiFailure(code, message, status));
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }));
}

async function handleRoute(request, { params }) {
  const { path = [] } = params;
  const route = `/${path.join('/')}`;
  const method = request.method;

  try {
    const database = await connectToMongo();

    if ((route === '/root' || route === '/') && method === 'GET') {
      return corsSuccess({ message: 'Hello World' });
    }

    if (route === '/status' && method === 'POST') {
      const payload = await request.json();
      const parsedPayload = statusPayloadSchema.safeParse(payload);

      if (!parsedPayload.success) {
        return corsFailure('INVALID_PAYLOAD', 'client_name wajib diisi dan maksimal 120 karakter.', 400);
      }

      const statusObj = {
        id: uuidv4(),
        client_name: parsedPayload.data.client_name,
        timestamp: new Date(),
      };

      await database.collection('status_checks').insertOne(statusObj);
      return corsSuccess(statusObj, 201);
    }

    if (route === '/status' && method === 'GET') {
      const statusChecks = await database.collection('status_checks').find({}).limit(1000).toArray();
      const cleanedStatusChecks = statusChecks.map(({ _id, ...rest }) => rest);
      return corsSuccess(cleanedStatusChecks);
    }

    return corsFailure('ROUTE_NOT_FOUND', `Route ${route} not found`, 404);
  } catch (error) {
    console.error('API Error:', error instanceof Error ? error.message : 'Unknown error');
    return corsFailure('INTERNAL_SERVER_ERROR', 'Internal server error', 500);
  }
}

export const GET = handleRoute;
export const POST = handleRoute;
export const PUT = handleRoute;
export const DELETE = handleRoute;
export const PATCH = handleRoute;

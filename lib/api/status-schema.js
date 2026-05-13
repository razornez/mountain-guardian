import { z } from 'zod';

export const statusPayloadSchema = z.object({
  client_name: z.string().trim().min(1).max(120),
});

export function validateStatusPayload(payload) {
  return statusPayloadSchema.safeParse(payload);
}

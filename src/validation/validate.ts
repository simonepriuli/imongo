/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function validateSafe(schema: z.ZodType, object: object) {
  if (schema) {
    return schema.parse(object);
  }
}

export function validateUnsafe(schema: z.ZodType, object: object) {
  if (schema) {
    return schema.safeParse(object);
  }
}

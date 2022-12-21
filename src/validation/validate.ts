/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from 'zod';
export function validateUnsafe(schema: z.ZodType, object: object) {
  if (schema) {
    return schema.parse(object);
  }
}

export function validateSafe(schema: z.ZodType, object: object) {
  if (schema) {
    const result = schema.safeParse(object);
    return result;
  }
}

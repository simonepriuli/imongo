import { z } from 'zod';

/* eslint-disable @typescript-eslint/ban-types */
export const safeValidationError = (schema: z.ZodType) => {
  const errorSchema = ''; //infer the zod schema into a type and pass it to the new error
  throw new Error(
    `Unable to safe validate object with schema ${JSON.stringify(schema)}`
  );
};

export const unsafeValodationError = (schema: z.ZodType) => {
  return `Unable to safe validate object with schema ${JSON.stringify(schema)}`;
};

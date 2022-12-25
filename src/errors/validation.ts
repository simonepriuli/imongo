/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Schema, TypeOf, z } from 'zod';

/* eslint-disable @typescript-eslint/ban-types */
export const safeValidationError = (schema: z.ZodType) => {
  //const errorSchema = schema._getType;
  throw new Error(
    `Unable to safe validate object with schema ${JSON.stringify(schema)}`
  );
};

export const unsafeValodationError = (schema: z.ZodType) => {
  throw new Error(
    `Unable to unsafe validate object with schema ${JSON.stringify(schema)}`
  );
};

export const noSchemaError = (collection: string) => {
  throw new Error(`Unable to find schema in collection: ${collection}`);
};

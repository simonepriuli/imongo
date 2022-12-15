/* eslint-disable prettier/prettier */
import * as mongoDB from 'mongodb';
import { z } from 'zod';

export class CollectionClass {
  public collection: mongoDB.Collection<mongoDB.Document>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  public schema?: any;
  constructor(
    collection: mongoDB.Collection<mongoDB.Document>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    schema?: any
  ) {
    this.collection = collection;
    this.schema = schema;
  }
}

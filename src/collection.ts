/* eslint-disable prettier/prettier */
import * as mongoDB from 'mongodb';

export class CollectionClass {
  public collection: mongoDB.Collection<mongoDB.Document>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  public schema?: object;
  constructor(
    collection: mongoDB.Collection<mongoDB.Document>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    schema?: object
  ) {
    this.collection = collection;
    this.schema = schema;
  }
}

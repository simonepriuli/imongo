/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import * as mongoDB from 'mongodb';
import { z } from 'zod';
import { validation } from '../errors';
import { CollectionClass } from '../types/collection';
import { validateSafe, validateUnsafe } from '../validation/validate';

export class imongo {
  private client!: mongoDB.MongoClient;
  private db!: mongoDB.Db;
  private collections: Map<string, CollectionClass> = new Map([]);

  private lastcalledcollection = '';

  /**
   * Set the connection params for the MongoCluster and the database.
   * @param {string} url - The MongoDB cluster connection url, the database name is not required.
   * @param {string} db - The MongoDB database name.
   */
  public init(url: string, db: string) {
    this.client = new mongoDB.MongoClient(url);
    this.db = this.client.db(db);
    return this;
  }

  /**
   * Connect to the MongoDB Cluster and database.
   * This method is asynchronous.
   */
  public async connect() {
    await this.client.connect();
    console.log('Connection with MongoDB sucssessful');
  }

  /**
   * Set the collection you want to use in the imongo instance.
   * @param {string | Array<string>} Collection_name. The collection name or an array of collections.
   */
  public useCollection(collection: string | Array<string>) {
    if (typeof collection == 'string') {
      const _collection: mongoDB.Collection = this.db?.collection(collection);
      const newCollection = new CollectionClass(_collection);
      this.collections?.set(collection, newCollection);
      this.lastcalledcollection = collection;
      return this;
    } else {
      collection.forEach((thisCollection: string) => {
        const _collection: mongoDB.Collection =
          this.db?.collection(thisCollection);
        const newCollection = new CollectionClass(_collection);
        this.collections?.set(thisCollection, newCollection);
        this.lastcalledcollection = thisCollection;
      });
    }
  }

  /**
   * Get a MongoDB.Db object to call MongoDriver database's methods.
   * @return {mongoDB.Db} MongoDB.Db.
   */
  public database(): mongoDB.Db {
    return this.db;
  }

  /**
   * Get a MongoDB collection to work with MongoDriver collection's methods.
   * @param {string} collectionName It works only if you pass as param a collection that you set before with the useCollection() method.
   * @return {mongoDB.Db} MongoDB.Db.
   */
  public collection(collectionName: string) {
    const _collection = this.collections?.get(collectionName)?.collection;
    this.lastcalledcollection = collectionName;
    return _collection;
  }

  /**
   * Set the schema of a collection with Zod.
   * @param {z.ZodType} schema Pass your schema as a Zod object.
   * @param {string} collection OPTIONAL, the name of the collection you want your schema to aply to. Not necessary if chained to useCollection().
   */
  public setSchema(schema: z.ZodType, collection?: string) {
    if (!collection) {
      collection = this.lastcalledcollection;
    }
    const oldCollection = this.collections.get(collection);
    const newCollection = new CollectionClass(
      oldCollection!.collection,
      schema
    );
    this.collections.delete(collection);
    this.collections.set(collection, newCollection);
  }

  /**
   * Safely validate your object with a collection's schema.
   * @param {object} object the object you want to validate.
   * @param {string} collection OPTIONAL, the name of the collection you want your schema to aply to. Not necessary if chained to collection().
   * @returns {object} returns an object identical to the one passed in the parameters if the schemas match. throws an error if not.
   */
  public useSafeValidation(object: object, collection?: string) {
    if (!collection) {
      collection = this.lastcalledcollection;
    }
    console.log(collection);
    const validationResult = validateSafe(
      this.collections.get(collection)?.schema,
      object
    );
    if (validationResult?.success) {
      return validationResult.data;
    } else {
      validation.safeValidationError(this.collections.get(collection)?.schema);
    }
  }

  /**
   * Unsafely validate your object with a collection's schema.
   * @param {object} object the object you want to validate.
   * @param {string} collection OPTIONAL, the name of the collection you want your schema to aply to. Not necessary if chained to collection().
   * @returns {object} returns an object identical to the one passed in the parameters if the schemas match. returns the error if not.
   */
  public useUnsafeValidation(object: object, collection?: string) {
    if (!collection) {
      collection = this.lastcalledcollection;
    }
    console.log(collection);
    return validateUnsafe(this.collections.get(collection)?.schema, object);
  }
}

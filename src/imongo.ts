/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import * as mongoDB from 'mongodb';
import { CollectionClass } from './collection';

export class imongo {
  private client!: mongoDB.MongoClient;
  private db!: mongoDB.Db;
  private collections: Map<string, CollectionClass> = new Map([]);

  /**
   * Set the connection params for the MongoCluster and the database.
   * @param {string} Cluster_url - The MongoDB cluster connection url, the database name is not required.
   * @param {string} Db_name - The MongoDB database name.
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
  public useCollection(collection: string | Array<string>): void {
    if (typeof collection == 'string') {
      const _collection: mongoDB.Collection = this.db?.collection(collection);
      const newCollection = new CollectionClass(_collection);
      this.collections?.set(collection, newCollection);
    } else {
      collection.forEach((thisCollection: string) => {
        const _collection: mongoDB.Collection =
          this.db?.collection(thisCollection);
        const newCollection = new CollectionClass(_collection);
        this.collections?.set(thisCollection, newCollection);
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
   * @param {string} Collection_name It works only if you pass as param a collection that you set before with the useCollection() method.
   * @return {mongoDB.Db} MongoDB.Db.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public collection(collection: string) {
    const _collection = this.collections?.get(collection)?.collection;
    return _collection;
  }

  public setSchema() {
    //
  }
}

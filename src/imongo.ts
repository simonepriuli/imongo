/* eslint-disable prettier/prettier */
import * as mongoDB from 'mongodb';

export class imongo {
  private db!: mongoDB.Db;
  private dbs: Map<string, mongoDB.Db> = new Map([]);
  private collections: Map<string, mongoDB.Collection<mongoDB.Document>> =
    new Map([]);

  /**
   * Set the connection to the database.
   * @param {string} Conn_url - The MongoDB cluster connection url, don't the database name in the string.
   * @param {string} Db_name - The MongoDB database name.
   */
  public async connect(url: string, db: string) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
    await client.connect();
    console.log('Connection with MongoDB sucssessful');
    this.db = client.db(db);
  }

  /**
   * Set the collection you want to use in the imongo instance.
   * @param {string} Collection_name.
   */
  public useCollection(collection: string | Array<string>): void {
    if (typeof collection == 'string') {
      const _collection: mongoDB.Collection = this.db?.collection(collection);
      this.collections?.set(collection, _collection);
    } else {
      collection.forEach((collection: string) => {
        const _collection: mongoDB.Collection = this.db?.collection(collection);
        this.collections?.set(collection, _collection);
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
    const _collection = this.collections?.get(collection);
    return _collection;
  }
}

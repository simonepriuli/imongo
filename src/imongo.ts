import * as mongoDB from 'mongodb';

export class imongo {
  private db!: mongoDB.Db;
  private dbs: Map<string, mongoDB.Db> = new Map([]);
  private collections: Map<string, mongoDB.Collection<mongoDB.Document>> =
    new Map([]);

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async connect(url: string, db: string) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
    await client.connect();
    console.log('Connection with MongoDB sucssessful');
    this.db = client.db(db);
  }

  public useCollection(collection: string): void {
    const usersCollection: mongoDB.Collection = this.db?.collection(collection);
    this.collections?.set(collection, usersCollection);
  }

  public database(): mongoDB.Db {
    return this.db;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public collection(collection: string) {
    const _collection = this.collections?.get(collection);
    return _collection;
  }
}

import * as mongoDB from 'mongodb';

export class imongo {
  private db!: mongoDB.Db;
  private collections: Map<string, mongoDB.Collection<mongoDB.Document>> =
    new Map([]);

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async connect(url: string, db: string) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
    await client.connect();
    this.db = client.db(db);
    return this.db;
  }

  public useCollection(collection: string): void {
    const usersCollection: mongoDB.Collection = this.db?.collection(collection);
    this.collections?.set(collection, usersCollection);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public collection(collection: string) {
    const _collection = this.collections?.get(collection);
    return _collection;
  }
}

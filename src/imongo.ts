import * as mongoDB from 'mongodb';

export class imongo {
  private db!: mongoDB.Db;
  //private _collection: mongoDB.Collection<mongoDB.Document> | undefined;
  //private _collection: mongoDB.Collection<mongoDB.Document> | undefined;
  private collections: Map<string, mongoDB.Collection<mongoDB.Document>> =
    new Map([]);

  public async connect(url: string, db: string) {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);
    await client.connect();
    this.db = client.db(db);
    return this.db;
  }

  public useCollection(collection: string) {
    const usersCollection: mongoDB.Collection = this.db?.collection(collection);
    this.collections?.set(collection, usersCollection);
  }

  public collection(collection: string) {
    const _collection = this.collections?.get(collection);
    return _collection;
  }
}

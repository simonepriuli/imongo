# IMongo

IMongo is a utility package that simplifies the always frustrating process of connecting to MongoDB in TypeScript.

## Authors

- [@simonepriuli](https://www.github.com/simonepriuli)

## Installation

Install IMongo with npm

```bash
  npm install imongo
```

Import the package

```javascript
import { db } from 'imongo';
```

Init the connection settings and then connect to the database

```javascript
await db.init('url', 'database name').connect();
```

Call the database method to get a db object if you want to use mongoDB.Db methods

```javascript
const database = db.database();
```

Set the collections you want to use with the useCollection method

```javascript
db.useCollection('users');
db.useCollection(['users', 'posts']);
```

Now you can use the mongodb driver methods

```javascript
const user = await db.collection('users')?.findOne({ email: 'admin@admin.it' });
```

### Schema validation for collections with Zod

Import z from imongo (provided by Zod)

```javascript
import { z } from 'imongo';
```

Set the schema of a collection

```javascript
db.useCollection('users').setSchema(z.object({name: z.string()});
```

Now you can safely insert documents in the collection with the useSafeValidation method

```javascript
await db
  .collection('users')
  .insertOne(db.useSafeValidation({ name: 'Simone' }));
```

# IMongo

IMongo is a utility package that simplifies the always frustrating process of connecting to MongoDB in TypeScript.

## Authors

- [@simonepriuli](https://www.github.com/simonepriuli)

## Installation

MONGODB DRIVER IS REQUIRED FOR THIS PACKAGE TO WORK CORRECTLY.

Install IMongo with npm

```bash
  npm install imongo
```

Import the package

```javascript
import { imongo } from './imongo';
```

Create the IMongo instance

```javascript
const db = new imongo();
```

Connect to the database using the connect method

```javascript
db.connect('url', 'database name');
```

Set the collections you want to use with the useCollection method

```javascript
db.useCollection('users');
```

Now you can use the mongodb driver methods

```javascript
const user = await db.collection('users')?.findOne({ email: 'admin@admin.it' });
```

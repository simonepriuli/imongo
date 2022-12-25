export const collectionDoesNotExist = (collection: string) => {
  //const errorSchema = schema._getType;
  throw new Error(
    `Collection: ${collection} does not exist in instance of imongo`
  );
};

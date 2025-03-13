import { MongoDBToken } from './mongodb.constants';

export const getCollectionToken = (collName: string): string =>
  `${MongoDBToken.collection}_${collName}`;

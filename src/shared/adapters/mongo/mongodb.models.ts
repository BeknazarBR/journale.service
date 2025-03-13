import { MongoClientOptions } from 'mongodb';

export interface IMongoDBOpts extends MongoClientOptions {
  dsn: string;
  dbName: string;
}

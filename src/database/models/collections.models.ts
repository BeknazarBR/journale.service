import { ObjectId } from 'mongodb';

export enum MongoCollections {
  USERS = 'users',
  ORGANIZATIONS = 'organizations',
  SERVICES = 'services',
  REGISTRATIONS = 'registrations',
  SPECIALISTS = 'specialists',
  SPECIALISTS_SERVICES = 'specialists_services',
}

export interface IEntityDefaultFields {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

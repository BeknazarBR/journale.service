import { ObjectId } from 'mongodb';

export interface IServiceFilter {
  _id?: ObjectId;
  title?: string;
  organization_id?: ObjectId;
}

import { ObjectId } from 'mongodb';

export interface IServiceFilter {
  _id: ObjectId;
  name: string;
}

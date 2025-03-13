import { ObjectId } from 'mongodb';

export interface IFindOneUserFilter {
  _id: ObjectId;
  email: string;
}

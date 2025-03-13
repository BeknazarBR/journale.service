import { ObjectId } from 'mongodb';

export interface IRegistrationFilter {
  _id: ObjectId;
  name: string;
}

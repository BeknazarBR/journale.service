import { ObjectId } from 'mongodb';

export interface ISpecialistFilter {
  _id: ObjectId;
  name: string;
}

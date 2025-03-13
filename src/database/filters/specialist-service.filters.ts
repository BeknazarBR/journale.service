import { ObjectId } from 'mongodb';

export interface ISpecialistServiceFilter {
  _id: ObjectId;
  name: string;
}

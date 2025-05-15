import { ObjectId } from 'mongodb';

export interface ISpecialistFilter {
  _id?: ObjectId;
  organization_id?: ObjectId;
  name?: string;
}

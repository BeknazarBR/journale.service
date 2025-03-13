import { ObjectId } from 'mongodb';

export interface IFindOrgFilter {
  _id: ObjectId;
  name: string;
}

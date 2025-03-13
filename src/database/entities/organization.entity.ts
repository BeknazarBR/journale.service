import { ObjectId } from 'mongodb';
import { IEntityDefaultFields } from '../models/collections.models';

export interface IOrganizationEntity extends IEntityDefaultFields {
  name: string;
  description: string;
  location: string;
  owner: ObjectId;
}

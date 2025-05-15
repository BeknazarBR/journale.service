import { ObjectId } from 'mongodb';
import { IEntityDefaultFields } from '../models/collections.models';

export interface IServiceEntity extends IEntityDefaultFields {
  organization_id: ObjectId;
  title: string;
  price: string;
  description: string;
}

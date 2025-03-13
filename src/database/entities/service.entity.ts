import { ObjectId } from 'mongodb';
import { IEntityDefaultFields } from '../models/collections.models';

export interface IServiceEntity extends IEntityDefaultFields {
  org_id: ObjectId;
  title: string;
  price: string;
  description: string;
}

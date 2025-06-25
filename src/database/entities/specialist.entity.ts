import { IEntityDefaultFields } from '../models/collections.models';
import { ObjectId } from 'mongodb';

export interface ISpecialistEntity extends IEntityDefaultFields {
  fio: string;
  rating: number;
  photo?: string;
  organization_id: ObjectId;
}

import { IEntityDefaultFields } from '../models/collections.models';
import { ObjectId } from 'mongodb';

export interface ISpecialistServiceEntity extends IEntityDefaultFields {
  specialist_id: ObjectId;
  service_id: ObjectId;
  duration: number;
}

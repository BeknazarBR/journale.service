import { ObjectId } from 'mongodb';
import { IEntityDefaultFields } from '../models/collections.models';

export interface IRegistrationEntity extends IEntityDefaultFields {
  user_id: ObjectId;
  specialist_service_id: ObjectId;
  time: Date;
  note: string;
}

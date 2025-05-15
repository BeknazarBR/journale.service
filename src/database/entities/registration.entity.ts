import { ObjectId } from 'mongodb';
import { IEntityDefaultFields } from '../models/collections.models';
import { IServiceEntity } from './service.entity';
import { ISpecialistEntity } from './specialist.entity';

export interface IRegistrationEntity extends IEntityDefaultFields {
  user_id: ObjectId;
  specialist_service_id: ObjectId;
  service: IServiceEntity;
  specialist: ISpecialistEntity;
  duration: number;
  time: Date;
  note: string;
}

import { IEntityDefaultFields } from '../models/collections.models';

export interface ISpecialistServiceEntity extends IEntityDefaultFields {
  specialist_id: string;
  service_id: string;
  duration: number;
}

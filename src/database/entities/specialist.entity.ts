import { IEntityDefaultFields } from '../models/collections.models';

export interface ISpecialistEntity extends IEntityDefaultFields {
  fio: string;
  rating: number;
  photo: string;
}

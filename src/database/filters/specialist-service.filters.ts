import { Filter } from 'mongodb';
import { ISpecialistServiceEntity } from '../entities/specialist_service.entity';

export type ISpecialistServiceFilter = Filter<ISpecialistServiceEntity>;

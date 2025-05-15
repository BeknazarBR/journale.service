import { Filter } from 'mongodb';
import { IServiceEntity } from '../entities/service.entity';

export type IServiceFilter = Filter<IServiceEntity>;

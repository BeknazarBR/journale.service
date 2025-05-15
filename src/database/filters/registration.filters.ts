import { Filter } from 'mongodb';
import { IRegistrationEntity } from '../entities/registration.entity';

export type IRegistrationFilter = Filter<IRegistrationEntity>;

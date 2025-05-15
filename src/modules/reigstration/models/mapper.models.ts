import {
  ICreateRegistrationRequest,
  IUpdateRegistrationRequest,
} from './request.models';
import { ObjectId } from 'mongodb';
import { IRegistrationEntity } from '../../../database/entities/registration.entity';
import { IServiceEntity } from '../../../database/entities/service.entity';
import { ISpecialistEntity } from '../../../database/entities/specialist.entity';
import { ISpecialistServiceEntity } from '../../../database/entities/specialist_service.entity';

export interface ICreateRegistrationData {
  payload: ICreateRegistrationRequest;
  service: IServiceEntity;
  specialist: ISpecialistEntity;
  ss: ISpecialistServiceEntity;
  userId: ObjectId;
}

export interface IUpdateRegistrationData {
  payload: IUpdateRegistrationRequest;
  existed: IRegistrationEntity;
}

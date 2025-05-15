import {
  ICreateRegistrationRequest,
  IUpdateRegistrationRequest,
} from './request.models';
import { ObjectId } from 'mongodb';
import { IRegistrationEntity } from '../../../database/entities/registration.entity';

export interface ICreateRegistrationData {
  payload: ICreateRegistrationRequest;
  userId: ObjectId;
}

export interface IUpdateRegistrationData {
  payload: IUpdateRegistrationRequest;
  existed: IRegistrationEntity;
}

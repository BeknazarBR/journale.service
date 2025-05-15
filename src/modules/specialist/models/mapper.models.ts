import {
  ICreateSpecialistRequest,
  IUpdateSpecialistRequest,
} from './request.models';
import { ObjectId } from 'mongodb';
import { ISpecialistEntity } from '../../../database/entities/specialist.entity';

export interface ICreateSpecialistData {
  payload: ICreateSpecialistRequest;
  userId: ObjectId;
}

export interface IUpdateSpecialistData {
  payload: IUpdateSpecialistRequest;
  existed: ISpecialistEntity;
}

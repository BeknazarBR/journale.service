import { ICreateServiceRequest, IUpdateServiceRequest } from './request.models';
import { ObjectId } from 'mongodb';
import { IServiceEntity } from '../../../database/entities/service.entity';

export interface ICreateServiceData {
  payload: ICreateServiceRequest;
  userId: ObjectId;
}

export interface IUpdateServiceData {
  payload: IUpdateServiceRequest;
  existed: IServiceEntity;
}

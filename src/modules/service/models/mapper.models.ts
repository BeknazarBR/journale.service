import { ICreateServiceRequest, IUpdateServiceRequest } from './request.models';
import { ObjectId } from 'mongodb';
import { IServiceEntity } from '../../../database/entities/service.entity';
import { ISpecialistServiceEntity } from '../../../database/entities/specialist_service.entity';

export interface ICreateServiceData {
  payload: ICreateServiceRequest;
  userId: ObjectId;
}

export interface IUpdateServiceData {
  payload: IUpdateServiceRequest;
  existed: IServiceEntity;
}

export interface ISSResponseData {
  ss: ISpecialistServiceEntity;
  service: IServiceEntity;
}

export interface ISSListResponseData {
  ss: ISpecialistServiceEntity[];
  services: IServiceEntity[];
}

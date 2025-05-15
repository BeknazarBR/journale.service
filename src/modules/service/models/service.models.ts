import { ICreateServiceRequest, IUpdateServiceRequest } from './request.models';
import { ObjectId } from 'mongodb';

export interface ICreateServiceProps {
  payload: ICreateServiceRequest;
  userId: ObjectId;
}

export interface IUpdateServiceProps {
  id: ObjectId;
  payload: IUpdateServiceRequest;
  userId: ObjectId;
}

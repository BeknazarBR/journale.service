import {
  ICreateRegistrationRequest,
  IFindPaginatedRequest,
  IUpdateRegistrationRequest,
} from './request.models';
import { ObjectId } from 'mongodb';

export interface ICreateRegistrationProps {
  payload: ICreateRegistrationRequest;
  userId: ObjectId;
}

export interface IUpdateRegistrationProps {
  id: ObjectId;
  payload: IUpdateRegistrationRequest;
  userId: ObjectId;
}

export interface IFindRegistrationsProps {
  request: IFindPaginatedRequest;
  userId: ObjectId;
}

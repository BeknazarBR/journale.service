import {
  IAssignServiceRequest,
  ICreateSpecialistRequest,
  IUpdateSpecialistRequest,
} from './request.models';
import { ObjectId } from 'mongodb';

export interface ICreateSpecialistProps {
  payload: ICreateSpecialistRequest;
  userId: ObjectId;
}

export interface IUpdateSpecialistProps {
  id: ObjectId;
  payload: IUpdateSpecialistRequest;
  userId: ObjectId;
}

export interface IAssignServiceProps {
  payload: IAssignServiceRequest;
  userId: ObjectId;
}

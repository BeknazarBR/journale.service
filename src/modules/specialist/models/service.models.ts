import {
  ICreateSpecialistRequest,
  IUpdateSpecialistRequest,
} from './request.models';
import { ObjectId } from 'mongodb';

export interface ICreateOrgProps {
  payload: ICreateSpecialistRequest;
  userId: ObjectId;
}

export interface IUpdateOrgProps {
  id: ObjectId;
  payload: IUpdateSpecialistRequest;
  userId: ObjectId;
}

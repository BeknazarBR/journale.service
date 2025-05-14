import { ICreateOrgRequest, IUpdateOrgRequest } from './request.models';
import { ObjectId } from 'mongodb';

export interface ICreateOrgProps {
  payload: ICreateOrgRequest;
  userId: ObjectId;
}

export interface IUpdateOrgProps {
  id: ObjectId;
  payload: IUpdateOrgRequest;
  userId: ObjectId;
}

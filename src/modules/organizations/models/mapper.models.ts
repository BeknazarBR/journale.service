import { ICreateOrgRequest, IUpdateOrgRequest } from './request.models';
import { IOrganizationEntity } from '../../../database/entities/organization.entity';
import { ObjectId } from 'mongodb';

export interface ICreateOrgData {
  payload: ICreateOrgRequest;
  userId: ObjectId;
}

export interface IUpdateOrgData {
  payload: IUpdateOrgRequest;
  existed: IOrganizationEntity;
}

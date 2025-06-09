import { IPaginationOptions } from '../../../shared/pagination/pagination.models';
import { ObjectId } from 'mongodb';

export interface ICreateRegistrationRequest {
  specialist_service_id: ObjectId;
  note: string;
  time: Date;
}
export interface IUpdateRegistrationRequest {
  specialist_service_id?: ObjectId;
  note?: string;
  time?: Date;
}
export interface IFindPaginatedRequest extends IPaginationOptions {
  title: string;
  org_id?: ObjectId;
}

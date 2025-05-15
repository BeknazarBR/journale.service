import { IPaginationOptions } from '../../../shared/pagination/pagination.models';
import { ObjectId } from 'mongodb';

export interface ICreateSpecialistRequest {
  fio: string;
  photo: string;
  organization_id: ObjectId;
}
export interface IUpdateSpecialistRequest {
  fio?: string;
  photo?: string;
}
export interface IFindPaginatedRequest extends IPaginationOptions {
  organization_id: ObjectId;
}

import { IPaginationOptions } from '../../../shared/pagination/pagination.models';
import { ObjectId } from 'mongodb';

export interface ICreateServiceRequest {
  title: string;
  price: string;
  description: string;
  organization_id: ObjectId;
}
export interface IUpdateServiceRequest {
  title?: string;
  price?: string;
  description?: string;
}
export interface IFindPaginatedRequest extends IPaginationOptions {
  organization_id: ObjectId;
}
export interface IFindBySpecialistRequest extends IPaginationOptions {
  specialist_id: ObjectId;
}

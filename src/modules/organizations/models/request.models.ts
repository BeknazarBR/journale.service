import { IPaginationOptions } from '../../../shared/pagination/pagination.models';

export interface ICreateOrgRequest {
  name: string;
  description: string;
  location: string;
}
export interface IUpdateOrgRequest {
  name?: string;
  description?: string;
  location?: string;
}
export interface IFindPaginatedRequest extends IPaginationOptions {
  name: string;
}

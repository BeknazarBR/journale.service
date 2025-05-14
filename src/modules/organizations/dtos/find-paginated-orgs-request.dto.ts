import { IFindPaginatedRequest } from '../models/request.models';
import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsDto } from '../../../shared/pagination/pagination.request';

export class FindPaginatedOrgsRequestDto
  extends PaginationOptionsDto
  implements IFindPaginatedRequest
{
  @IsOptional()
  @IsString()
  name: string;
}

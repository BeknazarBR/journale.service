import { IFindPaginatedRequest } from '../models/request.models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationOptionsDto } from '../../../shared/pagination/pagination.request';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';
import { ObjectId } from 'mongodb';

export class FindPaginatedRegistrationsRequestDto
  extends PaginationOptionsDto
  implements IFindPaginatedRequest
{
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @Transform(ObjectIdTransform)
  org_id?: ObjectId;
}

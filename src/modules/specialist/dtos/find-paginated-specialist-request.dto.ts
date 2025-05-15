import { IFindPaginatedRequest } from '../models/request.models';
import { IsOptional } from 'class-validator';
import { PaginationOptionsDto } from '../../../shared/pagination/pagination.request';
import { ObjectId } from 'mongodb';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';
import { Transform } from 'class-transformer';

export class FindPaginatedSpecialistRequestDto
  extends PaginationOptionsDto
  implements IFindPaginatedRequest
{
  @IsOptional()
  @Transform(ObjectIdTransform)
  organization_id: ObjectId;
}

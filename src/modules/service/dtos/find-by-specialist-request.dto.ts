import { IFindBySpecialistRequest } from '../models/request.models';
import { IsOptional } from 'class-validator';
import { PaginationOptionsDto } from '../../../shared/pagination/pagination.request';
import { ObjectId } from 'mongodb';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';
import { Transform } from 'class-transformer';

export class FindBySpecialistRequestDto
  extends PaginationOptionsDto
  implements IFindBySpecialistRequest
{
  @IsOptional()
  @Transform(ObjectIdTransform)
  specialist_id: ObjectId;
}

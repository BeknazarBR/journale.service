import { ICreateSpecialistRequest } from '../models/request.models';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';

export class CreateSpecialistRequestDto implements ICreateSpecialistRequest {
  @IsNotEmpty()
  @IsString()
  fio: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty()
  @Transform(ObjectIdTransform)
  organization_id: ObjectId;
}

import { IsDate, IsOptional, IsString } from 'class-validator';
import { IUpdateRegistrationRequest } from '../models/request.models';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';
import { ObjectId } from 'mongodb';
import { DateTransform } from '../../../shared/transforms/date.transform';

export class UpdateRegistrationRequestDto
  implements IUpdateRegistrationRequest
{
  @IsOptional()
  @Transform(ObjectIdTransform)
  specialist_service_id?: ObjectId;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @Transform(DateTransform)
  @IsDate()
  time?: Date;
}

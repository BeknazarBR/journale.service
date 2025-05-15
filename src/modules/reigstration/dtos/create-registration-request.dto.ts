import { ICreateRegistrationRequest } from '../models/request.models';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';
import { DateTransform } from '../../../shared/transforms/date.transform';

export class CreateRegistrationRequestDto
  implements ICreateRegistrationRequest
{
  @IsNotEmpty()
  @Transform(ObjectIdTransform)
  specialist_service_id: ObjectId;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @Transform(DateTransform)
  @IsDate()
  time: Date;
}

import { ICreateServiceRequest } from '../models/request.models';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';

export class CreateServiceRequestDto implements ICreateServiceRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Transform(ObjectIdTransform)
  organization_id: ObjectId;
}

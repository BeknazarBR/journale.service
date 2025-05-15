import { IAssignServiceRequest } from '../models/request.models';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer';
import { ObjectIdTransform } from '../../../shared/transforms/object-id.transform';

export class AssignServiceRequestDto implements IAssignServiceRequest {
  @IsNotEmpty()
  @Transform(ObjectIdTransform)
  specialist_id: ObjectId;

  @IsNotEmpty()
  @Transform(ObjectIdTransform)
  service_id: ObjectId;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}

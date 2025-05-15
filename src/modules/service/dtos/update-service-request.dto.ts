import { IsOptional, IsString } from 'class-validator';
import { IUpdateServiceRequest } from '../models/request.models';

export class UpdateServiceRequestDto implements IUpdateServiceRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  price?: string;
}

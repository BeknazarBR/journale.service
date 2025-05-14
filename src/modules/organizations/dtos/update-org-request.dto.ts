import { IsOptional, IsString } from 'class-validator';
import { IUpdateOrgRequest } from '../models/request.models';

export class UpdateOrgRequestDto implements IUpdateOrgRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;
}

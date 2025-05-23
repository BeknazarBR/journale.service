import { ICreateOrgRequest } from '../models/request.models';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgRequestDto implements ICreateOrgRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}

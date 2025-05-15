import { IsOptional, IsString } from 'class-validator';
import { IUpdateSpecialistRequest } from '../models/request.models';

export class UpdateSpecialistRequestDto implements IUpdateSpecialistRequest {
  @IsOptional()
  @IsString()
  fio?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

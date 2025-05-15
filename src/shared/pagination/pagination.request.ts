import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IPaginationOptions } from './pagination.models';
import { Transform } from 'class-transformer';

export class PaginationOptionsDto implements IPaginationOptions {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform((value) => Number(value.value))
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform((value) => Number(value.value))
  limit: number;
}

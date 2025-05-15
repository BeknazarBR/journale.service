import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ISignUpRequest } from '../models/request.models';

export class SignUpRequestDto implements ISignUpRequest {
  @IsString()
  @IsNotEmpty()
  public fio: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

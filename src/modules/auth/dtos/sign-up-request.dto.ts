import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ISignUpRequest } from '../models/request.models';

export class SignUpRequestDto implements ISignUpRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

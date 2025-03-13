import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ISignInRequest } from '../models/request.models';

export class SignInRequestDto implements ISignInRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

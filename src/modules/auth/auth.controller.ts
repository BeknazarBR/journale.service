import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dtos/sign-up-request.dto';
import { ISignInResponse, ISignUpResponse } from './models/response.models';
import { SignInRequestDto } from './dtos/sign-in-request.dto';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ObjectId } from 'mongodb';
import { IUserEntity } from '../../database/entities/user.entity';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  public async signUp(
    @Body() request: SignUpRequestDto,
  ): Promise<ISignUpResponse> {
    return this.authService.signUp(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  public async signIn(
    @Body() request: SignInRequestDto,
  ): Promise<ISignInResponse> {
    return this.authService.signIn(request);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('me')
  public async getMe(@ExtractUserId() userId: ObjectId): Promise<IUserEntity> {
    return this.authService.me(userId);
  }
}

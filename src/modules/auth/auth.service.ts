import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './models/service.models';
import { ISignInRequest, ISignUpRequest } from './models/request.models';
import { ISignInResponse } from './models/response.models';
import { UserMapper } from './mappers/user.mapper';
import { IUserEntity } from '../../database/entities/user.entity';
import { ObjectId } from 'mongodb';
import { HashUtils } from '../../shared/utils/hash.utils';

@Injectable()
export class AuthService {
  private readonly usersRepository: UserRepository;
  private readonly jwtService: JwtService;

  constructor(usersRepository: UserRepository, jwtService: JwtService) {
    this.usersRepository = usersRepository;
    this.jwtService = jwtService;
  }

  private generateAccessToken(payload: ITokenPayload): string {
    return this.jwtService.sign(payload);
  }

  public async signUp(request: ISignUpRequest): Promise<ISignInResponse> {
    const existedUser = await this.usersRepository.findByEmail(request.email);
    if (existedUser) {
      throw new ForbiddenException('User already exists');
    }

    const password = await HashUtils.hash(request.password);
    const newUser = UserMapper.create({
      ...request,
      password,
    });
    await this.usersRepository.create(newUser);

    const accessToken = this.generateAccessToken({
      sub: newUser._id.toString(),
      email: newUser.email,
    });
    return {
      access_token: accessToken,
    };
  }

  public async signIn(request: ISignInRequest): Promise<ISignInResponse> {
    const user = await this.usersRepository.findByEmail(request.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await HashUtils.compare({
      value: request.password,
      hash: user.password,
    });

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken({
      sub: user._id.toString(),
      email: user.email,
    });

    return {
      access_token: accessToken,
    };
  }

  public async me(id: ObjectId): Promise<IUserEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return user;
  }
}

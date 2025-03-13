import { Injectable } from '@nestjs/common';
import {
  JwtModuleOptions,
  JwtOptionsFactory,
} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  public readonly expiresIn: string;
  public readonly secret: string;
  constructor(configService: ConfigService) {
    this.expiresIn = configService.getOrThrow<string>('JWT_EXPIRE_IN');
    this.secret = configService.getOrThrow<string>('JWT_SECRET');
  }

  public createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      global: true,
      secret: this.secret,
      signOptions: { expiresIn: this.expiresIn },
    };
  }
}

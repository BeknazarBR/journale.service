import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

@Injectable()
export class AppConfig {
  public readonly host: string;
  public readonly name: string;
  public readonly port: number;

  constructor(configuratorService: ConfigService) {
    this.name =
      configuratorService.get<string>('APP_NAME') ?? 'journale.service';
    this.host = process.platform === 'win32' ? 'localhost' : '127.0.0.1';
    this.port = configuratorService.get<number>('APP_PORT') ?? 8080;
  }

  public get now(): DateTime {
    return DateTime.now();
  }
}

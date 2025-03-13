import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as ConfigurationModule,
  ConfigService,
} from '@nestjs/config';
import { MongoDBConfig } from './mongodb.config';
import { AppConfig } from './app.config';
import { JwtConfig } from './jwt.config';

@Global()
@Module({
  imports: [ConfigurationModule.forRoot()], // Используем forRoot() для инициализации
  providers: [ConfigService, AppConfig, MongoDBConfig, JwtConfig], // Добавляем ConfigService
  exports: [ConfigService, MongoDBConfig, AppConfig, JwtConfig], // Экспортируем ConfigService
})
export class ConfigModule {}

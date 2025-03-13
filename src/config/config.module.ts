import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';
import { MongoDBConfig } from './mongodb.config';
import { AppConfig } from './app.config';

@Global()
@Module({
  imports: [ConfigurationModule.forRoot()],
  providers: [AppConfig, MongoDBConfig],
  exports: [MongoDBConfig, AppConfig],
})
export class ConfigModule {}

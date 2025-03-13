import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMongoDBConfigFactory, IMongoDBOpts } from '../shared/adapters/mongo';

@Injectable()
export class MongoDBConfig implements IMongoDBConfigFactory {
  private readonly dbName: string;
  private readonly dsn: string;

  constructor(configuratorService: ConfigService) {
    this.dbName = configuratorService.getOrThrow<string>('MONGO_DB_NAME');
    this.dsn = configuratorService.getOrThrow<string>('MONGO_DSN');
  }

  public createMongoDBConfig(): IMongoDBOpts {
    return {
      directConnection: true,
      dbName: this.dbName,
      dsn: this.dsn,
    };
  }
}

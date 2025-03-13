import { Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectMongoDb } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';

@Injectable()
export class InitialRepository {
  private readonly mongo: Db;
  private readonly logger: Logger;

  constructor(@InjectMongoDb() mongo: Db) {
    this.mongo = mongo;
    this.logger = new Logger(InitialRepository.name);
  }

  public async createCollections(): Promise<void> {
    const collections = await this.mongo.listCollections().toArray();
    const collectionsMap = new Set<string>();

    for (const collection of collections) {
      collectionsMap.add(collection.name);
    }

    for (const collection of Object.values(MongoCollections)) {
      const isExists = collectionsMap.has(collection);
      if (!isExists) {
        this.logger.verbose(
          `Collection "${collection}" do not exist, creating...`,
        );
        await this.mongo.createCollection(collection);
        this.logger.verbose(`Created collection "${collection}"`);
      }
    }
  }
}

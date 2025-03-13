import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { IServiceEntity } from '../entities/service.entity';
import { IServiceFilter } from '../filters/service.filters';

@Injectable()
export class ServiceRepository {
  private readonly servicesCollection: Collection<IServiceEntity>;

  constructor(
    @InjectCollection(MongoCollections.ORGANIZATIONS)
    servicesCollection: Collection<IServiceEntity>,
  ) {
    this.servicesCollection = servicesCollection;
  }

  public async create(service: IServiceEntity): Promise<void> {
    await this.servicesCollection.insertOne(service);
  }

  public async findOne(filter: IServiceFilter): Promise<IServiceEntity | null> {
    const service = await this.servicesCollection.findOne(filter);

    return service;
  }

  public async findById(id: ObjectId): Promise<IServiceEntity | null> {
    const service = await this.servicesCollection.findOne({
      _id: id,
    });

    return service;
  }

  public async findMany(): Promise<IServiceEntity[]> {
    const services = await this.servicesCollection.find({}).toArray();

    return services;
  }

  public async count(): Promise<number> {
    const count = await this.servicesCollection.countDocuments();

    return count;
  }

  public async update(service: IServiceEntity): Promise<void> {
    await this.servicesCollection.updateOne(
      {
        _id: service._id,
      },
      {
        $set: service,
      },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { ISpecialistServiceEntity } from '../entities/specialist_service.entity';
import { ISpecialistServiceFilter } from '../filters/specialist-service.filters';

@Injectable()
export class SpecialistServiceRepository {
  private readonly specialistServicesCollection: Collection<ISpecialistServiceEntity>;

  constructor(
    @InjectCollection(MongoCollections.ORGANIZATIONS)
    specialistServicesCollection: Collection<ISpecialistServiceEntity>,
  ) {
    this.specialistServicesCollection = specialistServicesCollection;
  }

  public async create(
    specialistService: ISpecialistServiceEntity,
  ): Promise<void> {
    await this.specialistServicesCollection.insertOne(specialistService);
  }

  public async findOne(
    filter: ISpecialistServiceFilter,
  ): Promise<ISpecialistServiceEntity | null> {
    const specialistService =
      await this.specialistServicesCollection.findOne(filter);

    return specialistService;
  }

  public async findById(
    id: ObjectId,
  ): Promise<ISpecialistServiceEntity | null> {
    const specialistService = await this.specialistServicesCollection.findOne({
      _id: id,
    });

    return specialistService;
  }

  public async findMany(): Promise<ISpecialistServiceEntity[]> {
    const specialistServices = await this.specialistServicesCollection
      .find({})
      .toArray();

    return specialistServices;
  }

  public async count(): Promise<number> {
    const count = await this.specialistServicesCollection.countDocuments();

    return count;
  }

  public async update(
    specialistService: ISpecialistServiceEntity,
  ): Promise<void> {
    await this.specialistServicesCollection.updateOne(
      {
        _id: specialistService._id,
      },
      {
        $set: specialistService,
      },
    );
  }
}

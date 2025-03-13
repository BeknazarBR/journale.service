import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { ISpecialistEntity } from '../entities/specialist.entity';
import { ISpecialistFilter } from '../filters/specialist.filters';

@Injectable()
export class SpecialistRepository {
  private readonly specialistsCollection: Collection<ISpecialistEntity>;

  constructor(
    @InjectCollection(MongoCollections.ORGANIZATIONS)
    specialistsCollection: Collection<ISpecialistEntity>,
  ) {
    this.specialistsCollection = specialistsCollection;
  }

  public async create(specialist: ISpecialistEntity): Promise<void> {
    await this.specialistsCollection.insertOne(specialist);
  }

  public async findOne(
    filter: ISpecialistFilter,
  ): Promise<ISpecialistEntity | null> {
    const specialist = await this.specialistsCollection.findOne(filter);

    return specialist;
  }

  public async findById(id: ObjectId): Promise<ISpecialistEntity | null> {
    const specialist = await this.specialistsCollection.findOne({
      _id: id,
    });

    return specialist;
  }

  public async findMany(): Promise<ISpecialistEntity[]> {
    const specialists = await this.specialistsCollection.find({}).toArray();

    return specialists;
  }

  public async count(): Promise<number> {
    const count = await this.specialistsCollection.countDocuments();

    return count;
  }

  public async update(specialist: ISpecialistEntity): Promise<void> {
    await this.specialistsCollection.updateOne(
      {
        _id: specialist._id,
      },
      {
        $set: specialist,
      },
    );
  }
}

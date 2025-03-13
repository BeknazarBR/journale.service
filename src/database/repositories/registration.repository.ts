import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { IRegistrationEntity } from '../entities/registration.entity';
import { IRegistrationFilter } from '../filters/registration.filters';

@Injectable()
export class RegistrationRepository {
  private readonly registrationsCollection: Collection<IRegistrationEntity>;

  constructor(
    @InjectCollection(MongoCollections.ORGANIZATIONS)
    registrationsCollection: Collection<IRegistrationEntity>,
  ) {
    this.registrationsCollection = registrationsCollection;
  }

  public async create(registration: IRegistrationEntity): Promise<void> {
    await this.registrationsCollection.insertOne(registration);
  }

  public async findOne(
    filter: IRegistrationFilter,
  ): Promise<IRegistrationEntity | null> {
    const registration = await this.registrationsCollection.findOne(filter);

    return registration;
  }

  public async findById(id: ObjectId): Promise<IRegistrationEntity | null> {
    const registration = await this.registrationsCollection.findOne({
      _id: id,
    });

    return registration;
  }

  public async findMany(): Promise<IRegistrationEntity[]> {
    const registrations = await this.registrationsCollection.find({}).toArray();

    return registrations;
  }

  public async count(): Promise<number> {
    const count = await this.registrationsCollection.countDocuments();

    return count;
  }

  public async update(registration: IRegistrationEntity): Promise<void> {
    await this.registrationsCollection.updateOne(
      {
        _id: registration._id,
      },
      {
        $set: registration,
      },
    );
  }
}

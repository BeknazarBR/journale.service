import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { IUserEntity } from '../entities/user.entity';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { IFindOneUserFilter } from '../filters/user.filters';

@Injectable()
export class UserRepository {
  private readonly usersCollection: Collection<IUserEntity>;

  constructor(
    @InjectCollection(MongoCollections.USERS)
    usersCollection: Collection<IUserEntity>,
  ) {
    this.usersCollection = usersCollection;
  }

  public async create(user: IUserEntity): Promise<void> {
    await this.usersCollection.insertOne(user);
  }

  public async findOne(
    filter: IFindOneUserFilter,
  ): Promise<IUserEntity | null> {
    const user = await this.usersCollection.findOne(filter);

    return user;
  }

  public async findById(id: ObjectId): Promise<IUserEntity | null> {
    const user = await this.usersCollection.findOne({
      _id: id,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await this.usersCollection.findOne({
      email,
    });

    return user;
  }

  public async findMany(): Promise<IUserEntity[]> {
    const users = await this.usersCollection.find({}).toArray();

    return users;
  }

  public async count(): Promise<number> {
    const count = await this.usersCollection.countDocuments();

    return count;
  }

  public async update(user: IUserEntity): Promise<void> {
    await this.usersCollection.updateOne(
      {
        _id: user._id,
      },
      {
        $set: user,
      },
    );
  }
}

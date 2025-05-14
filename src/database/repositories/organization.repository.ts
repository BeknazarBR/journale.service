import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { InjectCollection } from '../../shared/adapters/mongo';
import { MongoCollections } from '../models/collections.models';
import { IOrganizationEntity } from '../entities/organization.entity';
import { IFindOrgFilter } from '../filters/organization.filters';
import { IPaginationProps } from '../../shared/pagination/pagination.models';

@Injectable()
export class OrganizationRepository {
  private readonly organizationsCollection: Collection<IOrganizationEntity>;

  constructor(
    @InjectCollection(MongoCollections.ORGANIZATIONS)
    organizationsCollection: Collection<IOrganizationEntity>,
  ) {
    this.organizationsCollection = organizationsCollection;
  }

  public async create(organization: IOrganizationEntity): Promise<void> {
    await this.organizationsCollection.insertOne(organization);
  }

  public async findOne(
    filter: IFindOrgFilter,
  ): Promise<IOrganizationEntity | null> {
    const organization = await this.organizationsCollection.findOne(filter);

    return organization;
  }

  public async findById(id: ObjectId): Promise<IOrganizationEntity | null> {
    const organization = await this.organizationsCollection.findOne({
      _id: id,
    });

    return organization;
  }

  public async findMany(
    props: IPaginationProps<IFindOrgFilter>,
  ): Promise<IOrganizationEntity[]> {
    console.log(props.filter);
    const organizations = await this.organizationsCollection
      .find(props.filter ?? {})
      .skip((props.pages.page - 1) * props.pages.limit)
      .limit(props.pages.limit)
      .toArray();

    return organizations;
  }

  public async count(filter?: IFindOrgFilter): Promise<number> {
    const count = await this.organizationsCollection.countDocuments(filter);

    return count;
  }

  public async update(organization: IOrganizationEntity): Promise<void> {
    await this.organizationsCollection.updateOne(
      {
        _id: organization._id,
      },
      {
        $set: organization,
      },
    );
  }
}

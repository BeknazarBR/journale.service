import { ICreateOrgData, IUpdateOrgData } from '../models/mapper.models';
import { IOrganizationEntity } from '../../../database/entities/organization.entity';
import { ObjectId } from 'mongodb';
import { IOrgResponse } from '../models/response.models';

export class OrgMapper {
  public static create(props: ICreateOrgData): IOrganizationEntity {
    const now = new Date();
    return {
      _id: new ObjectId(),
      owner: props.userId,
      name: props.payload.name,
      description: props.payload.description,
      location: props.payload.location,
      created_at: now,
      updated_at: now,
    };
  }

  public static update(props: IUpdateOrgData): IOrganizationEntity {
    return {
      ...props.existed,
      ...props.payload,
      updated_at: new Date(),
    };
  }

  public static response(org: IOrganizationEntity, userId?: ObjectId): IOrgResponse {
    return {
      _id: org._id.toString(),
      isOwner: userId ? userId?.equals(org.owner) : false,
      name: org.name,
      description: org.description,
      location: org.location,
      created_at: org.created_at.toISOString(),
      updated_at: org.updated_at.toISOString(),
    };
  }

  public static listResponse(orgs: IOrganizationEntity[], userId?: ObjectId): IOrgResponse[] {
    return orgs.map((org) => OrgMapper.response(org, userId));
  }
}

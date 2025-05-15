import {
  ICreateSpecialistData,
  IUpdateSpecialistData,
} from '../models/mapper.models';
import { ObjectId } from 'mongodb';
import { ISpecialistResponse } from '../models/response.models';
import { ISpecialistEntity } from '../../../database/entities/specialist.entity';

export class SpecialistMapper {
  public static create(props: ICreateSpecialistData): ISpecialistEntity {
    const now = new Date();
    return {
      _id: new ObjectId(),
      rating: 5,
      fio: props.payload.fio,
      photo: props.payload.photo,
      organization_id: props.payload.organization_id,
      created_at: now,
      updated_at: now,
    };
  }

  public static update(props: IUpdateSpecialistData): ISpecialistEntity {
    return {
      ...props.existed,
      ...props.payload,
      updated_at: new Date(),
    };
  }

  public static response(specialist: ISpecialistEntity): ISpecialistResponse {
    return {
      _id: specialist._id.toString(),
      fio: specialist.fio,
      photo: specialist.photo,
      organization_id: specialist.organization_id.toString(),
      created_at: specialist.created_at.toISOString(),
      updated_at: specialist.updated_at.toISOString(),
    };
  }

  public static listResponse(
    specialists: ISpecialistEntity[],
  ): ISpecialistResponse[] {
    return specialists.map((org) => SpecialistMapper.response(org));
  }
}

import {
  ICreateServiceData,
  IUpdateServiceData,
} from '../models/mapper.models';
import { ObjectId } from 'mongodb';
import { IServiceResponse } from '../models/response.models';
import { IServiceEntity } from '../../../database/entities/service.entity';

export class ServiceMapper {
  public static create(props: ICreateServiceData): IServiceEntity {
    const now = new Date();
    return {
      _id: new ObjectId(),
      title: props.payload.title,
      price: props.payload.price,
      description: props.payload.description,
      organization_id: props.payload.organization_id,
      created_at: now,
      updated_at: now,
    };
  }

  public static update(props: IUpdateServiceData): IServiceEntity {
    return {
      ...props.existed,
      ...props.payload,
      updated_at: new Date(),
    };
  }

  public static response(service: IServiceEntity): IServiceResponse {
    return {
      _id: service._id.toString(),
      title: service.title,
      price: service.price,
      description: service.description,
      organization_id: service.organization_id.toString(),
      created_at: service.created_at.toISOString(),
      updated_at: service.updated_at.toISOString(),
    };
  }

  public static listResponse(services: IServiceEntity[]): IServiceResponse[] {
    return services.map((org) => ServiceMapper.response(org));
  }
}

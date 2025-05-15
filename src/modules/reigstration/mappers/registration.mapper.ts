import {
  ICreateRegistrationData,
  IUpdateRegistrationData,
} from '../models/mapper.models';
import { ObjectId } from 'mongodb';
import { IRegistrationResponse } from '../models/response.models';
import { IRegistrationEntity } from '../../../database/entities/registration.entity';

export class RegistrationMapper {
  public static create(props: ICreateRegistrationData): IRegistrationEntity {
    const now = new Date();
    return {
      _id: new ObjectId(),
      user_id: props.userId,
      specialist_service_id: props.payload.specialist_service_id,
      note: props.payload.note,
      time: props.payload.time,
      created_at: now,
      updated_at: now,
    };
  }

  public static update(props: IUpdateRegistrationData): IRegistrationEntity {
    return {
      ...props.existed,
      ...props.payload,
      updated_at: new Date(),
    };
  }

  public static response(
    registration: IRegistrationEntity,
  ): IRegistrationResponse {
    return {
      _id: registration._id.toString(),
      user_id: registration.user_id.toString(),
      specialist_service_id: registration.specialist_service_id.toString(),
      note: registration.note,
      time: registration.time.toISOString(),
      created_at: registration.created_at.toISOString(),
      updated_at: registration.updated_at.toISOString(),
    };
  }

  public static listResponse(
    registrations: IRegistrationEntity[],
  ): IRegistrationResponse[] {
    return registrations.map((registration) =>
      RegistrationMapper.response(registration),
    );
  }
}

import {
  ICreateRegistrationData,
  IUpdateRegistrationData,
} from '../models/mapper.models';
import { ObjectId } from 'mongodb';
import { IRegistrationResponse } from '../models/response.models';
import { IRegistrationEntity } from '../../../database/entities/registration.entity';
import { ServiceMapper } from '../../service/mappers/service.mapper';
import { SpecialistMapper } from '../../specialist/mappers/specialist.mapper';

export class RegistrationMapper {
  public static create(props: ICreateRegistrationData): IRegistrationEntity {
    const now = new Date();
    return {
      _id: new ObjectId(),
      user_id: props.userId,
      user: props.user,
      specialist_service_id: props.payload.specialist_service_id,
      service: props.service,
      specialist: props.specialist,
      duration: props.ss.duration,
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
      user: registration.user,
      specialist_service_id: registration.specialist_service_id.toString(),
      note: registration.note,
      duration: registration.duration,
      service: ServiceMapper.response(registration.service),
      specialist: SpecialistMapper.response(registration.specialist),
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

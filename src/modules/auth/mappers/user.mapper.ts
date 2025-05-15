import { ISignUpRequest } from '../models/request.models';
import { IUserEntity, Roles } from '../../../database/entities/user.entity';
import { ObjectId } from 'mongodb';

export class UserMapper {
  public static create(request: ISignUpRequest): IUserEntity {
    return {
      _id: new ObjectId(),
      fio: request.fio,
      email: request.email,
      role: Roles.USER,
      password: request.password,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

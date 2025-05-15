import { IEntityDefaultFields } from '../models/collections.models';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUserEntity extends IEntityDefaultFields {
  fio: string;
  email: string;
  password: string;
  role: Roles;
}

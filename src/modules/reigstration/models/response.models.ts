import { IUserEntity } from '../../../database/entities/user.entity';

export interface IRegistrationResponse {
  _id: string;
  user_id: string;
  specialist_service_id: string;
  user: IUserEntity;
  service: IServiceResponse;
  specialist: ISpecialistResponse;
  duration: number;
  time: string;
  note: string;
  created_at: string;
  updated_at: string;
}
export interface IServiceResponse {
  _id: string;
  title: string;
  price: string;
  description: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface ISpecialistResponse {
  _id: string;
  fio: string;
  photo: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

import { ITokenPayload } from '../src/modules/auth/models/service.models';

declare module 'express' {
  export interface Request {
    jwt_payload: ITokenPayload;
  }
}

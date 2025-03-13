import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ObjectId } from 'mongodb';

export const ExtractUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ObjectId => {
    const request: Request = ctx.switchToHttp().getRequest<Request>();
    if (!request?.jwt_payload?.sub) {
      throw new UnauthorizedException('Не валидный токен');
    }

    return new ObjectId(request.jwt_payload.sub);
  },
);

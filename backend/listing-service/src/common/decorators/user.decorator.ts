import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PayloadAuthDto } from 'src/auth/dto/payload-auth.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PayloadAuthDto => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const user =
      request.user && 'id_usuario' in request.user
        ? request.user
        : { id_usuario: -1 };

    return user as PayloadAuthDto;
  },
);

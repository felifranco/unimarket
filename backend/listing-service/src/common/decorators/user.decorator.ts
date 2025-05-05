import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { PayloadAuthDto } from 'src/auth/dto/payload-auth.dto';

declare module 'fastify' {
  interface FastifyRequest {
    user?: PayloadAuthDto;
  }
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PayloadAuthDto => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    const user: PayloadAuthDto = request.user
      ? request.user
      : { id_usuario: -1 };

    return user;
  },
);

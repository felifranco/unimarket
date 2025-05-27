import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.

    // Verificar si el endpoint es público
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true; // Permitir acceso sin autenticación

    // Llamar a la estrategia 'jwt' para validar el token
    return super.canActivate(context);
  }

  handleRequest(err: Error | null, user: any, info: any): any {
    // You can throw an exception based on either "info" or "err" arguments

    if (info instanceof Error) {
      throw new UnauthorizedException(info.message);
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

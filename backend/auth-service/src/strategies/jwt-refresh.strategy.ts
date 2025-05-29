// jwt-refresh.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { PayloadAuthDto } from '../auth/dto/payload-auth.dto';
import { RefreshTokenAuthDto } from 'src/auth/dto/refresh-token-auth.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: 'kuDrl&r0sug7zAy0pi70',
      passReqToCallback: true,
    });
  }

  validate(
    req: Request & { body: { refreshToken: string } },
    payloadAuthDto: PayloadAuthDto,
  ): RefreshTokenAuthDto {
    return {
      id_usuario: payloadAuthDto.id_usuario,
      refreshToken: req.body.refreshToken,
    };
  }
}

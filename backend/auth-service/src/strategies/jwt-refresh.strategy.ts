// jwt-refresh.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { PayloadAuthDto } from '../auth/dto/payload-auth.dto';
import { RefreshTokenAuthDto } from 'src/auth/dto/refresh-token-auth.dto';
import { defaultValues } from 'src/constants/app.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get<string>(
        'jwt.secret',
        defaultValues.JWT_SECRET,
      ),
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

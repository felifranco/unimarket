import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadAuthDto } from 'src/auth/dto/payload-auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lee el token desde el header
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: 'kuDrl&r0sug7zAy0pi70',
    });
  }

  validate(payloadAuthDto: PayloadAuthDto) {
    return payloadAuthDto;
  }
}

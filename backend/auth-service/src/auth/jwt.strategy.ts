import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { jwtConstants } from 'src/constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lee el token desde el header
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payloadAuthDto: PayloadAuthDto) {
    return {
      id_usuario: payloadAuthDto.id_usuario,
      correo: payloadAuthDto.correo,
    };
  }
}

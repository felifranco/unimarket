import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { defaultValues } from 'src/constants/auth.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lee el token desde el header
      ignoreExpiration: false, // Rechaza tokens expirados
      secretOrKey: configService.get<string>(
        'jwt.secret',
        defaultValues.JWT_SECRET,
      ),
    });
  }

  validate(payloadAuthDto: PayloadAuthDto) {
    return {
      id_usuario: payloadAuthDto.id_usuario,
      correo: payloadAuthDto.correo,
    };
  }
}

import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthStatus, defaultValues } from 'src/constants/app.constants';
import { hashPassword, comparePassword } from 'src/utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    // Crear un nuevo usuario con los datos proporcionados
    const hashedPassword = await hashPassword(registerAuthDto.password); // Hashear la contraseña

    const newAuth = this.authRepo.create({
      nombre_completo: registerAuthDto.nombre_completo,
      correo: registerAuthDto.correo,
      username: registerAuthDto.username,
      password_hash: hashedPassword,
      estado: AuthStatus.ACTIVO, // Estado por defecto
    });
    await this.authRepo.save(newAuth); // Guardar el usuario en la base de datos
    return;
  }

  async generateTokens(user: Auth) {
    const payloadAuthDto: PayloadAuthDto = {
      id_usuario: user.id_usuario,
    };

    // Generar accessToken con tiempo de expiración corto
    const accessToken = this.jwtService.sign(payloadAuthDto);
    // Generar refreshToken con tiempo de expiración más largo
    const refreshToken = this.jwtService.sign(payloadAuthDto, {
      expiresIn: this.configService.get<string>(
        'jwtRefresh.expiresIn',
        defaultValues.JWT_REFRESH_EXPIRATION_TIME,
      ),
    });

    // Guardar el refreshToken en la base de datos
    this.authRepo.merge(user, { refreshToken });

    await this.authRepo.save(user);

    return { accessToken, refreshToken };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { correo, password } = loginAuthDto;
    const user = await this.authRepo.findOneBy({ correo });
    if (user && (await comparePassword(password, user.password_hash))) {
      return this.generateTokens(user);
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async refreshTokens(
    refreshTokenAuthDto: RefreshTokenAuthDto,
    body: RefreshTokenAuthDto,
  ) {
    const { id_usuario } = refreshTokenAuthDto;
    const { refreshToken } = body;
    const user = await this.authRepo.findOneBy({
      id_usuario,
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error('Token inválido');
    }

    return this.generateTokens(user);
  }

  async me(id_usuario: number) {
    // Buscar y devolver los datos del usuario autenticado por su ID
    return this.authRepo.findOneBy({ id_usuario }).then((user) => {
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      return {
        id_usuario: user.id_usuario,
        nombre_completo: user.nombre_completo,
        correo: user.correo,
        username: user.username,
      };
    });
  }
}

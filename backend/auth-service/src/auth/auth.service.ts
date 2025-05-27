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
import { v4 as uuidv4 } from 'uuid';

// Explicitly type uuidv4 to avoid 'any' or 'error' type issues
const uuidv4Typed = uuidv4 as () => string;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    // Validar que el correo y el username no existan
    const existingEmail = await this.authRepo.findOneBy({
      correo: registerAuthDto.correo,
    });
    if (existingEmail) {
      throw new Error('El correo electrónico ya está registrado');
    }
    const existingUsername = await this.authRepo.findOneBy({
      username: registerAuthDto.username,
    });
    if (existingUsername) {
      throw new Error('El nombre de usuario ya está registrado');
    }
    // Crear un nuevo usuario con los datos proporcionados
    const hashedPassword = await hashPassword(registerAuthDto.password); // Hashear la contraseña

    const newAuth = this.authRepo.create({
      uuid: uuidv4Typed(),
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
      uuid: user.uuid,
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
    const user = await this.authRepo.findOneBy({
      correo,
      estado: AuthStatus.ACTIVO,
    });
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
        uuid: user.uuid,
        nombre_completo: user.nombre_completo,
        imagen_perfil: user.imagen_perfil,
        correo: user.correo,
        username: user.username,
      };
    });
  }
}

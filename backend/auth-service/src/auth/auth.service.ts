import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
//import { PayloadAuthDto } from './dto/payload-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { AuthStatus, defaultValues } from 'src/constants/app.constants';
import { /* hashPassword, */ comparePassword } from 'src/utils/hash.util';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    //private jwtService: JwtService,
  ) {}

  //async register(registerAuthDto: RegisterAuthDto) {
  //  console.log('auth.service.ts - register()');
  //  // Crear un nuevo usuario con los datos proporcionados
  //  const hashedPassword = await hashPassword(registerAuthDto.password); // Hashear la contraseña
  //
  //  const newAuth = this.authRepo.create({
  //    nombre_completo: registerAuthDto.nombre_completo,
  //    correo: registerAuthDto.correo,
  //    username: registerAuthDto.username,
  //    password_hash: hashedPassword,
  //    estado: AuthStatus.ACTIVO, // Estado por defecto
  //  });
  //  await this.authRepo.save(newAuth); // Guardar el usuario en la base de datos
  //  return;
  //}

  register(registerAuthDto: RegisterAuthDto): Promise<any> {
    // Implementa la lógica de registro aquí
    console.log('registerAuthDto - service: ', registerAuthDto);
    return { message: 'Usuario registrado exitosamente' };
  }
  /*
  async generateTokens(user: Auth) {
    const payloadAuthDto: PayloadAuthDto = {
      id_usuario: user.id_usuario,
      uuid: user.uuid,
    };

    // Generar accessToken con tiempo de expiración corto
    const accessToken = this.jwtService.sign(payloadAuthDto, {
      expiresIn: '100m',
    });
    // Generar refreshToken con tiempo de expiración más largo
    const refreshToken = this.jwtService.sign(payloadAuthDto, {
      expiresIn: '2d',
    });

    // Guardar el refreshToken en la base de datos
    this.authRepo.merge(user, { refreshToken });

    await this.authRepo.save(user);

    return { accessToken, refreshToken };
  }*/

  generateTokens(user: Auth) {
    return user;
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

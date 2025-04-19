import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthStatus } from 'src/constants/auth.constants';
import { hashPassword, comparePassword } from 'src/utils/hash.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
    private jwtService: JwtService,
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
    return this.authRepo.save(newAuth); // Guardar el usuario en la base de datos
  }

  async validateUser(
    loginAuthDto: LoginAuthDto,
  ): Promise<PayloadAuthDto | null> {
    const { correo, password } = loginAuthDto;
    const user = await this.authRepo.findOneBy({ correo });
    if (user && (await comparePassword(password, user.password_hash))) {
      const result: PayloadAuthDto = {
        id_usuario: user.id_usuario,
        correo: user.correo,
      };
      return result;
    }
    return null;
  }

  async login(payloadAuthDto: PayloadAuthDto) {
    return {
      access_token: await this.jwtService.signAsync(payloadAuthDto),
    };
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

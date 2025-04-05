import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthStatus } from 'src/constants/auth.constants';
import { hashPassword, comparePassword } from 'src/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
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

  async login(loginAuthDto: LoginAuthDto) {
    const { correo, password } = loginAuthDto;

    // Buscar al usuario por correo
    return this.authRepo.findOneBy({ correo }).then((user) => {
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Verificar la contraseña
      return comparePassword(password, user.password_hash).then((isMatch) => {
        if (!isMatch) {
          throw new UnauthorizedException('Credenciales inválidas');
        }

        // Aquí puedes generar un token JWT o devolver los datos del usuario
        return {
          message: 'Inicio de sesión exitoso',
          user: {
            id_usuario: user.id_usuario,
            nombre_completo: user.nombre_completo,
            correo: user.correo,
          },
        };
      });
    });
  }

  logout(logoutAuthDto: LogoutAuthDto) {
    // Aquí puedes implementar lógica adicional, como invalidar un token JWT
    console.log('Logout:', logoutAuthDto);
    return { message: 'Sesión cerrada exitosamente' };
  }

  async me(id: number) {
    // Buscar y devolver los datos del usuario autenticado por su ID
    return this.authRepo.findOneBy({ id_usuario: id }).then((user) => {
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

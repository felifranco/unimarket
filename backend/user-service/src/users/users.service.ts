import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userStatus } from 'src/constants/app.constants';
import { hashPassword } from 'src/utils/hash.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(createUserDto.password); // Hashear la contraseña

    const newUser = this.userRepo.create({
      nombre_completo: createUserDto.nombre_completo,
      correo: createUserDto.correo,
      username: createUserDto.username,
      password_hash: hashedPassword,
      estado: userStatus.ACTIVO, // Estado por defecto
    });
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find({
      where: { estado: userStatus.ACTIVO },
      select: [
        'id_usuario',
        'uuid',
        'nombre_completo',
        'correo',
        'imagen_portada',
        'imagen_perfil',
        'ubicacion',
        'telefono',
        'estrellas',
        'calificacion',
      ],
    });
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id_usuario: id, estado: userStatus.ACTIVO },
      select: [
        'id_usuario',
        'uuid',
        'nombre_completo',
        'correo',
        'imagen_portada',
        'imagen_perfil',
        'acerca_de',
        'ubicacion',
        'telefono',
        'estrellas',
        'calificacion',
      ],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id_usuario: id, estado: userStatus.ACTIVO });
    if (!user) {
      return null;
    }
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id_usuario: id, estado: userStatus.ACTIVO });
    if (!user) {
      return null;
    }
    return this.userRepo.remove(user);
  }
}

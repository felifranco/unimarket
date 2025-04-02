import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    const newAuth = this.authRepo.create(createAuthDto);
    return this.authRepo.save(newAuth);
  }

  findAll() {
    return this.authRepo.find();
  }

  findOne(id: number) {
    return this.authRepo.findOneBy({ id_usuario: id });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const auth = await this.authRepo.findOneBy({ id_usuario: id });
    if (!auth) {
      return null;
    }
    this.authRepo.merge(auth, updateAuthDto);
    return this.authRepo.save(auth);
  }

  async remove(id: number) {
    const auth = await this.authRepo.findOneBy({ id_usuario: id });
    if (!auth) {
      return null;
    }
    return this.authRepo.remove(auth);
  }
}

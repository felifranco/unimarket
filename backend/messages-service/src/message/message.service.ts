import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepo.create(createMessageDto);
    return this.messageRepo.save(message);
  }

  findAll() {
    return this.messageRepo.find();
  }

  async findOne(id: number) {
    const message = await this.messageRepo.findOneBy({ id_mensaje: id });
    if (!message) {
      throw new NotFoundException(`Mensaje #${id} no encontrado`);
    }
    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepo.findOneBy({ id_mensaje: id });
    if (!message) {
      throw new NotFoundException(`Mensaje #${id} no encontrado`);
    }
    this.messageRepo.merge(message, updateMessageDto);
    return this.messageRepo.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepo.findOneBy({ id_mensaje: id });
    if (!message) {
      throw new NotFoundException(`Mensaje #${id} no encontrado`);
    }
    return this.messageRepo.remove(message);
  }
}

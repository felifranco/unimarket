import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Conversation } from '../conversation/entities/conversation.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async create(uuid: string, createMessageDto: CreateMessageDto) {
    // Verificar que el uuid sea remitente o destinatario de la conversación
    const conversation = await this.messageRepo.manager.findOne(Conversation, {
      where: [
        { id_conversacion: createMessageDto.id_conversacion, remitente: uuid },
        {
          id_conversacion: createMessageDto.id_conversacion,
          destinatario: uuid,
        },
      ],
    });
    if (!conversation) {
      throw new NotFoundException(
        'No tienes permiso para agregar mensajes a esta conversación',
      );
    }
    // Solo permitir crear mensajes si el uuid es remitente o destinatario
    const message = this.messageRepo.create({
      ...createMessageDto,
      remitente: uuid,
    });
    return this.messageRepo.save(message);
  }

  async findOne(uuid: string, id: number) {
    // Solo permitir ver el mensaje si el uuid es el remitente
    const message = await this.messageRepo.findOneBy({
      id_mensaje: id,
      remitente: uuid,
    });
    if (!message) {
      throw new NotFoundException(
        `Mensaje #${id} no encontrado o no tienes acceso`,
      );
    }
    return message;
  }

  async update(uuid: string, id: number, updateMessageDto: UpdateMessageDto) {
    delete updateMessageDto.id_conversacion; // No permitir cambiar la conversación
    // Solo permitir actualizar si el uuid es el remitente
    const message = await this.messageRepo.findOneBy({
      id_mensaje: id,
      remitente: uuid,
    });
    if (!message) {
      throw new NotFoundException(
        `Mensaje #${id} no encontrado o no tienes acceso`,
      );
    }
    this.messageRepo.merge(message, updateMessageDto);
    return this.messageRepo.save(message);
  }

  async remove(uuid: string, id: number) {
    // Solo permitir eliminar si el uuid es el remitente
    const message = await this.messageRepo.findOneBy({
      id_mensaje: id,
      remitente: uuid,
    });
    if (!message) {
      throw new NotFoundException(
        `Mensaje #${id} no encontrado o no tienes acceso`,
      );
    }
    return this.messageRepo.remove(message);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
  ) {}

  async create(uuid: string, createConversationDto: CreateConversationDto) {
    const existingConversation = await this.conversationRepo.findOne({
      where: [
        { remitente: uuid, destinatario: createConversationDto.destinatario },
        {
          remitente: createConversationDto.destinatario,
          destinatario: uuid,
        },
      ],
    });
    if (existingConversation) {
      // Si ya existe una conversación entre los usuarios, devolver la existente
      // Si la conversación ya estaba eliminada por el remitente, restaurarla
      if (
        existingConversation.remitente_borrado &&
        existingConversation.remitente === uuid
      ) {
        existingConversation.remitente_borrado = false;
      } else if (
        existingConversation.destinatario_borrado &&
        existingConversation.destinatario === uuid
      ) {
        existingConversation.destinatario_borrado = false;
      }
      return this.conversationRepo.save(existingConversation);
    } else {
      const conversation = this.conversationRepo.create(createConversationDto);
      return this.conversationRepo.save({ ...conversation, remitente: uuid });
    }
  }

  async findMine(uuid: string) {
    // Buscar todas las conversaciones donde el usuario es remitente o destinatario y no ha borrado la conversación como remitente
    const conversations = await this.conversationRepo.find({
      where: [
        { remitente: uuid, remitente_borrado: false },
        { destinatario: uuid, destinatario_borrado: false },
      ],
      order: {
        mensajes: {
          fecha_envio: 'ASC', // Ordena los mensajes de cada conversación de forma ascendente
        },
        fecha_creacion: 'DESC', // Orden de las conversaciones
      },
      relations: ['mensajes'],
    });
    return conversations;
  }

  async findOne(uuid: string, id: number) {
    // Buscar la conversación solo si el usuario es remitente o destinatario
    const conversation = await this.conversationRepo.findOne({
      where: [
        { id_conversacion: id, remitente: uuid },
        { id_conversacion: id, destinatario: uuid },
      ],
      relations: ['mensajes'],
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversación #${id} no encontrada o no tienes acceso`,
      );
    }
    return conversation;
  }

  async update(
    uuid: string,
    id: number,
    updateConversationDto: UpdateConversationDto,
  ) {
    // Solo permitir actualizar si el usuario es remitente o destinatario
    const conversation = await this.conversationRepo.findOne({
      where: [
        { id_conversacion: id, remitente: uuid, remitente_borrado: false },
        {
          id_conversacion: id,
          destinatario: uuid,
          destinatario_borrado: false,
        },
      ],
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversación #${id} no encontrada o no tienes acceso`,
      );
    }
    this.conversationRepo.merge(conversation, updateConversationDto);
    return this.conversationRepo.save(conversation);
  }

  async remove(uuid: string, id: number) {
    // Solo permitir eliminar si el usuario es remitente o destinatario
    const conversation = await this.conversationRepo.findOne({
      where: [
        { id_conversacion: id, remitente: uuid, remitente_borrado: false },
        {
          id_conversacion: id,
          destinatario: uuid,
          destinatario_borrado: false,
        },
      ],
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversación #${id} no encontrada o no tienes acceso`,
      );
    }
    if (conversation.remitente === uuid) {
      conversation.remitente_borrado = true;
    } else {
      conversation.destinatario_borrado = true;
    }
    return this.conversationRepo.save(conversation);
  }
}

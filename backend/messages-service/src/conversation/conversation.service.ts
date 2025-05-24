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

  async create(createConversationDto: CreateConversationDto) {
    const conversation = this.conversationRepo.create(createConversationDto);
    return this.conversationRepo.save(conversation);
  }

  findAll() {
    return this.conversationRepo.find();
  }

  async findMine(uuid: string) {
    // Buscar todas las conversaciones donde el usuario es remitente o destinatario
    const conversations = await this.conversationRepo.find({
      where: [{ remitente: uuid }, { destinatario: uuid }],
      order: { fecha_creacion: 'DESC' },
      relations: ['mensajes'], // Relación con mensajes (debe estar definida en la entidad)
    });
    return conversations;
  }

  async findOne(id: number) {
    const conversation = await this.conversationRepo.findOneBy({
      id_conversacion: id,
    });
    if (!conversation) {
      throw new NotFoundException(`Conversación #${id} no encontrada`);
    }
    return conversation;
  }

  async update(id: number, updateConversationDto: UpdateConversationDto) {
    const conversation = await this.conversationRepo.findOneBy({
      id_conversacion: id,
    });
    if (!conversation) {
      throw new NotFoundException(`Conversación #${id} no encontrada`);
    }
    this.conversationRepo.merge(conversation, updateConversationDto);
    return this.conversationRepo.save(conversation);
  }

  async remove(id: number) {
    const conversation = await this.conversationRepo.findOneBy({
      id_conversacion: id,
    });
    if (!conversation) {
      throw new NotFoundException(`Conversación #${id} no encontrada`);
    }
    return this.conversationRepo.remove(conversation);
  }
}

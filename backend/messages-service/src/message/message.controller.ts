import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CommonResponses } from 'src/common/decorators/api-responses.decorator';

@ApiBearerAuth()
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo mensaje',
    description: 'Crea un mensaje en una conversación.',
  })
  @ApiBody({
    type: CreateMessageDto,
    description: 'Datos necesarios para crear un mensaje',
  })
  @CommonResponses()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los mensajes',
    description: 'Devuelve una lista de todos los mensajes.',
  })
  @CommonResponses()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un mensaje por ID',
    description: 'Devuelve la información de un mensaje específico.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del mensaje a consultar',
  })
  @CommonResponses()
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un mensaje',
    description: 'Actualiza la información de un mensaje existente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del mensaje a actualizar',
  })
  @ApiBody({
    type: UpdateMessageDto,
    description: 'Datos para actualizar el mensaje',
  })
  @CommonResponses()
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un mensaje',
    description: 'Elimina un mensaje del sistema.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del mensaje a eliminar',
  })
  @CommonResponses()
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}

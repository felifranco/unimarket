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
import { User } from 'src/common/decorators/user.decorator';
import { PayloadAuthDto } from 'src/auth/dto/payload-auth.dto';

@ApiBearerAuth()
@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo mensaje',
    description:
      'Crea un mensaje en una conversación si el usuario autenticado es remitente o destinatario.',
  })
  @ApiBody({
    type: CreateMessageDto,
    description: 'Datos necesarios para crear un mensaje',
  })
  @CommonResponses()
  create(
    @User() user: PayloadAuthDto,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.create(user.uuid, createMessageDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un mensaje por ID',
    description:
      'Devuelve la información de un mensaje específico si el usuario autenticado es el remitente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del mensaje a consultar',
  })
  @CommonResponses()
  findOne(@User() user: PayloadAuthDto, @Param('id') id: string) {
    return this.messageService.findOne(user.uuid, +id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un mensaje',
    description:
      'Actualiza la información de un mensaje existente si el usuario autenticado es el remitente.',
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
  update(
    @User() user: PayloadAuthDto,
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(user.uuid, +id, updateMessageDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un mensaje',
    description:
      'Elimina un mensaje del sistema si el usuario autenticado es el remitente.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del mensaje a eliminar',
  })
  @CommonResponses()
  remove(@User() user: PayloadAuthDto, @Param('id') id: string) {
    return this.messageService.remove(user.uuid, +id);
  }
}

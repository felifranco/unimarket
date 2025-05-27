import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
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
@ApiTags('conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva conversación o devuelve una existente',
    description:
      'Crea una conversación entre el usuario autenticado y otro usuario. Si ya existe una conversación entre ellos, devuelve la existente.',
  })
  @ApiBody({
    type: CreateConversationDto,
    description: 'Datos necesarios para crear una conversación',
  })
  @CommonResponses()
  create(
    @User() user: PayloadAuthDto,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationService.create(user.uuid, createConversationDto);
  }

  @Get('mine')
  @ApiOperation({
    summary: 'Obtener mis conversaciones',
    description: 'Devuelve la información de mis conversaciones.',
  })
  @CommonResponses()
  findMine(@User() user: PayloadAuthDto) {
    return this.conversationService.findMine(user.uuid);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una conversación por ID',
    description:
      'Devuelve la información de una conversación específica del usuario autenticado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la conversación a consultar',
  })
  @CommonResponses()
  findOne(@User() user: PayloadAuthDto, @Param('id') id: string) {
    return this.conversationService.findOne(user.uuid, +id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una conversación',
    description:
      'Actualiza la información de una conversación existente del usuario autenticado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la conversación a actualizar',
  })
  @ApiBody({
    type: UpdateConversationDto,
    description: 'Datos para actualizar la conversación',
  })
  @CommonResponses()
  update(
    @User() user: PayloadAuthDto,
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(
      user.uuid,
      +id,
      updateConversationDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una conversación',
    description:
      'Elimina una conversación del sistema del usuario autenticado.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la conversación a eliminar',
  })
  @CommonResponses()
  remove(@User() user: PayloadAuthDto, @Param('id') id: string) {
    return this.conversationService.remove(user.uuid, +id);
  }
}

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

@ApiBearerAuth()
@ApiTags('conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva conversación',
    description: 'Crea una conversación entre dos usuarios.',
  })
  @ApiBody({
    type: CreateConversationDto,
    description: 'Datos necesarios para crear una conversación',
  })
  @CommonResponses()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las conversaciones',
    description: 'Devuelve una lista de todas las conversaciones.',
  })
  @CommonResponses()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una conversación por ID',
    description: 'Devuelve la información de una conversación específica.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la conversación a consultar',
  })
  @CommonResponses()
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una conversación',
    description: 'Actualiza la información de una conversación existente.',
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
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una conversación',
    description: 'Elimina una conversación del sistema.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la conversación a eliminar',
  })
  @CommonResponses()
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }
}

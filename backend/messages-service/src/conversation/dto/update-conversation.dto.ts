import { PartialType } from '@nestjs/swagger';
import { CreateConversationDto } from './create-conversation.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
  @ApiProperty({
    description: 'ID del usuario remitente',
    example: 'uuid',
    required: false,
  })
  remitente?: string;

  @ApiProperty({
    description: 'ID del usuario destinatario',
    example: 'uuid',
    required: false,
  })
  destinatario?: string;

  @ApiProperty({
    description: 'Indica si el remitente ha borrado la conversación',
    example: false,
    default: false,
    required: false,
  })
  remitente_borrado?: boolean;

  @ApiProperty({
    description: 'Indica si el destinatario ha borrado la conversación',
    example: false,
    default: false,
    required: false,
  })
  destinatario_borrado?: boolean;
}

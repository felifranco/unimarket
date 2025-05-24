import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({ description: 'ID del usuario remitente', example: 'uuid' })
  remitente: string;

  @ApiProperty({ description: 'ID del usuario destinatario', example: 'uuid' })
  destinatario: string;

  @ApiProperty({
    description: 'Indica si el remitente ha borrado la conversación',
    example: false,
    default: false,
  })
  remitente_borrado: boolean;

  @ApiProperty({
    description: 'Indica si el destinatario ha borrado la conversación',
    example: false,
    default: false,
  })
  destinatario_borrado: boolean;
}

import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({
    description: 'Tipo de mensaje',
    example: 'texto',
    required: false,
  })
  tipo?: string;

  @ApiProperty({
    description: 'Contenido del mensaje',
    example: 'Hola',
    required: false,
  })
  mensaje?: string;

  @ApiProperty({
    description: 'URL del adjunto',
    example: 'https://...',
    required: false,
  })
  adjunto_url?: string;

  @ApiProperty({
    description: 'Nombre del adjunto',
    example: 'archivo.pdf',
    required: false,
  })
  adjunto_nombre?: string;

  @ApiProperty({
    description: 'Tipo MIME del adjunto',
    example: 'application/pdf',
    required: false,
  })
  adjunto_tipo?: string;

  @ApiProperty({
    description: 'Tamaño del adjunto en bytes',
    example: 102400,
    required: false,
  })
  adjunto_tamano?: number;

  @ApiProperty({
    description: 'Indica si el mensaje fue leído',
    example: false,
    default: false,
    required: false,
  })
  leido?: boolean;
}

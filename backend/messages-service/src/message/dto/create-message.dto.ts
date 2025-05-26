import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'ID de la conversación', example: 1 })
  id_conversacion: number;

  @ApiProperty({
    description: 'Tipo de mensaje (texto, imagen, etc.)',
    example: 'texto',
  })
  tipo: string;

  @ApiProperty({
    description: 'Contenido del mensaje',
    example: 'Hola, ¿cómo estás?',
  })
  mensaje: string;

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
}

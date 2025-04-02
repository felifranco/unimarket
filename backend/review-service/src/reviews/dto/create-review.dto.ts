import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_publicacion: number;

  @ApiProperty()
  puntuacion: number;

  @ApiProperty()
  comentario: string;

  @ApiProperty()
  fecha_creacion: Date;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  id_publicacion: number;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  contenido: string;

  @ApiProperty()
  estrellas: number;

  @ApiProperty()
  estado: string;
}

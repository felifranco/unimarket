import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
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

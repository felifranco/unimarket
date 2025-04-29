import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  contenido: string;

  @ApiProperty()
  estrellas: number;

  @ApiProperty()
  estado: string;
}

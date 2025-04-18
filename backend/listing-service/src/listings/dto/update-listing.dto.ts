import { PartialType } from '@nestjs/swagger';
import { CreateListingDto } from './create-listing.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  ubicacion: string;

  @ApiProperty()
  estado: string;
}

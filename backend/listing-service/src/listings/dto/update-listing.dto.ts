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
  ubicacion: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  estrellas: number;

  @ApiProperty()
  calificacion: number;

  @ApiProperty()
  vendidos: number;

  @ApiProperty()
  existencias: number;

  @ApiProperty()
  simbolo_moneda: string;

  @ApiProperty()
  precio_anterior: number;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  insignia: string;

  @ApiProperty()
  imagenes: string;

  @ApiProperty()
  imagen_portada: string;
}

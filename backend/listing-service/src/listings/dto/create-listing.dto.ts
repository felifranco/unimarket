import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty()
  id_usuario: number;

  @ApiProperty()
  tipo_publicacion: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descripcion_general: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  categorias: string;

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
  descripcion_producto: string;

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

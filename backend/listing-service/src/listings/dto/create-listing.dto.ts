import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty()
  id_usuario: number;

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
}

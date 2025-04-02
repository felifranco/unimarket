import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nombre_completo: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password_hash: string;

  @ApiProperty()
  rol: string;

  @ApiProperty()
  fecha_creacion: Date;
}

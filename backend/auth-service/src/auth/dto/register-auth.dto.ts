import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty()
  nombre_completo: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

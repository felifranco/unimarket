import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty()
  correo: string;

  @ApiProperty()
  password: string;
}

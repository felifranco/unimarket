import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
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
}

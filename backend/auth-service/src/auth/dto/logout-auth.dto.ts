import { ApiProperty } from '@nestjs/swagger';

export class LogoutAuthDto {
  @ApiProperty()
  correo: string;
}

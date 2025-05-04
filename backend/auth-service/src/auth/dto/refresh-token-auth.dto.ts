import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenAuthDto {
  id_usuario: number;

  @ApiProperty()
  refreshToken: string;
}

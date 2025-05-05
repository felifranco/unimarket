import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token-auth.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { CommonResponses } from 'src/common/decorators/api-responses.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @CommonResponses()
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @CommonResponses()
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @CommonResponses()
  refreshTokens(
    @Request() req: { user: RefreshTokenAuthDto },
    @Body() body: RefreshTokenAuthDto,
  ) {
    // El "body" se utiliza para que aparezca en Swagger,
    // no es necesario agregarlo porque la información ya viene en el "req"
    const refreshTokenAuthDto: RefreshTokenAuthDto = req.user;
    return this.authService.refreshTokens(refreshTokenAuthDto, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @CommonResponses()
  findMe(@Request() req: { user: PayloadAuthDto }) {
    const { id_usuario } = req.user;
    return this.authService.me(id_usuario);
  }
}

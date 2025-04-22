import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PayloadAuthDto } from './dto/payload-auth.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    const user: PayloadAuthDto | null =
      await this.authService.validateUser(loginAuthDto);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findMe(@Request() req: { user: PayloadAuthDto }) {
    const { id_usuario } = req.user;
    return this.authService.me(id_usuario);
  }
}

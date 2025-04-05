import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LogoutAuthDto } from './dto/logout-auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

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
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('logout')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  logout(@Body() logoutAuthDto: LogoutAuthDto) {
    return this.authService.logout(logoutAuthDto);
  }

  @Get('me/:id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findMe(@Param('id') id: number) {
    return this.authService.me(id);
  }
}

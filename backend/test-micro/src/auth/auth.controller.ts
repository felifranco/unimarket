import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthService:', this.authService);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    console.log('create');
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    console.log('findAll');
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('findOne');
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    console.log('update');
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('remove');
    return this.authService.remove(+id);
  }
}

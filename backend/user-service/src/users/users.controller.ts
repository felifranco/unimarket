import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CommonResponses } from 'src/common/decorators/api-responses.decorator';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo usuario',
    description: 'Crea un usuario en el sistema con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos necesarios para crear un usuario',
  })
  @CommonResponses()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Devuelve una lista de todos los usuarios registrados.',
  })
  @CommonResponses()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por ID',
    description:
      'Devuelve la información de un usuario específico según su ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario a consultar',
  })
  @CommonResponses()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description:
      'Actualiza la información de un usuario existente según su ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario a actualizar',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos para actualizar el usuario',
  })
  @CommonResponses()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario del sistema según su ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario a eliminar',
  })
  @CommonResponses()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

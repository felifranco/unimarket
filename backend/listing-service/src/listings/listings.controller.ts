import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PayloadAuthDto } from 'src/auth/dto/payload-auth.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CommonResponses } from 'src/common/decorators/api-responses.decorator';

@ApiBearerAuth()
@ApiTags('listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva publicación asociada al usuario autenticado',
    description:
      'Este endpoint permite a un usuario autenticado crear una nueva publicación. El usuario debe proporcionar un token de acceso válido en el encabezado Authorization.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una publicación',
    type: CreateListingDto,
  })
  @CommonResponses()
  create(
    @User() user: PayloadAuthDto,
    @Body() createListingDto: CreateListingDto,
  ) {
    return this.listingsService.create(user.id_usuario, createListingDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Obtener todas las publicaciones',
    description: 'Este endpoint devuelve una lista de todas las publicaciones.',
  })
  @CommonResponses()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get('mine')
  @ApiOperation({
    summary: 'Obtener todas las publicaciones asociadas al usuario autenticado',
    description:
      'Este endpoint devuelve una lista de todas las publicaciones asociadas al usuario. El usuario debe proporcionar un token de acceso válido en el encabezado Authorization.',
  })
  @CommonResponses()
  findAllMine(@User() user: PayloadAuthDto) {
    return this.listingsService.findAllMine(user.id_usuario);
  }

  @Public()
  @Get('user/:id')
  @ApiOperation({
    summary: 'Obtener todas las publicaciones de un usuario',
    description:
      'Este endpoint devuelve un listado con todas las publicaciones asociadas a un usuario específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario',
    type: String,
  })
  @CommonResponses()
  findAllByUser(@Param('id') id: string) {
    return this.listingsService.findAllByUser(+id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una publicación por ID',
    description:
      'Este endpoint devuelve los detalles de una publicación específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación',
    type: String,
  })
  @CommonResponses()
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modificar una publicación por ID',
    description:
      'Este endpoint actualiza parcialmente los detalles de una publicación.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación',
    type: String,
  })
  @ApiBody({
    description: 'Datos que se pueden enviar para modificar una publicación',
    type: UpdateListingDto,
  })
  @CommonResponses()
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una publicación por ID',
    description: 'Este endpoint elimina una publicación.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación',
    type: String,
  })
  @CommonResponses()
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo comentario con valoración a una publicación',
    description:
      'Este endpoint permite a un usuario autenticado crear un nuevo comentario con valoración a una publicación. El usuario debe proporcionar un token de acceso válido en el encabezado Authorization.',
  })
  @ApiBody({
    description: 'Datos necesarios para crear una publicación',
    type: CreateReviewDto,
  })
  @CommonResponses()
  create(
    @User() user: PayloadAuthDto,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(user.id_usuario, createReviewDto);
  }

  @Public()
  @Get('listing/:id')
  @ApiOperation({
    summary: 'Obtener el listado de comentarios de una publicación por ID',
    description:
      'Este endpoint devuelve un listado de comentarios asociados a una publicación específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la publicación',
    type: String,
  })
  @CommonResponses()
  findAllByListing(@Param('id') id: string) {
    return this.reviewsService.findAllByListing(+id);
  }

  @Patch('like/:id')
  @ApiOperation({
    summary: 'Dar Me Gusta (Like) a un comentario',
    description:
      'Este endpoint aumenta el contador de Likes de un comentario específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del comentario',
    type: String,
  })
  @CommonResponses()
  likeReview(@Param('id') id: string) {
    return this.reviewsService.likeReview(+id);
  }

  @Patch('unlike/:id')
  @ApiOperation({
    summary: 'Retirar Me Gusta (Like) a un comentario',
    description:
      'Este endpoint disminuye el contador de Likes de un comentario específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del comentario',
    type: String,
  })
  @CommonResponses()
  unlikeReview(@Param('id') id: string) {
    return this.reviewsService.unlikeReview(+id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un comentario por ID',
    description:
      'Este endpoint devuelve los detalles de un comentario específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del comentario',
    type: String,
  })
  @CommonResponses()
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Modificar algunos detalles de un comentario por ID',
    description:
      'Este endpoint actualiza parcialmente los detalles  un comentario específico.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del comentario',
    type: String,
  })
  @ApiBody({
    description: 'Datos que se pueden actualizar del comentario',
    type: UpdateReviewDto,
  })
  @CommonResponses()
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un comentario por ID',
    description: 'Este endpoint elimina un comentario.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del comentario',
    type: String,
  })
  @CommonResponses()
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}

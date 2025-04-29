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
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get('listing/:id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAllByListing(@Param('id') id: string) {
    return this.reviewsService.findAllByListing(+id);
  }

  @Patch('like/:id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  likeReview(@Param('id') id: string) {
    return this.reviewsService.likeReview(+id);
  }

  @Patch('unlike/:id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  unlikeReview(@Param('id') id: string) {
    return this.reviewsService.unlikeReview(+id);
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}

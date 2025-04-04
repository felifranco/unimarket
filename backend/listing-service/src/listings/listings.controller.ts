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
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('listings')
@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'Operación exitosa.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}

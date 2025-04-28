import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingStatus } from 'src/constants/app.constants';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
  ) {}

  create(createListingDto: CreateListingDto) {
    const newListing = this.listingRepo.create({
      ...createListingDto,
      estado: ListingStatus.ACTIVA, // Estado por defecto
    });
    return this.listingRepo.save(newListing);
  }

  findAll() {
    return this.listingRepo.find();
  }

  findAllByUser(id_usuario: number) {
    return this.listingRepo.find({
      where: { id_usuario },
      //relations: ['usuario'],
    });
  }

  findOne(id: number) {
    return this.listingRepo.findOneBy({ id_publicacion: id });
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    const listing = await this.listingRepo.findOneBy({ id_publicacion: id });
    if (!listing) {
      return null;
    }
    this.listingRepo.merge(listing, updateListingDto);
    return this.listingRepo.save(listing);
  }

  async remove(id: number) {
    const listing = await this.listingRepo.findOneBy({ id_publicacion: id });
    if (!listing) {
      return null;
    }
    return this.listingRepo.remove(listing);
  }
}

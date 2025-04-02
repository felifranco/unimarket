import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
  ) {}

  create(createListingDto: CreateListingDto) {
    const newListing = this.listingRepo.create(createListingDto);
    return this.listingRepo.save(newListing);
  }

  findAll() {
    return this.listingRepo.find();
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

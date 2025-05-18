import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListingStatus } from 'src/constants/app.constants';
import { v4 as uuidv4 } from 'uuid';

// Explicitly type uuidv4 to avoid 'any' or 'error' type issues
const uuidv4Typed = uuidv4 as () => string;

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepo: Repository<Listing>,
  ) {}

  create(id_usuario: number, createListingDto: CreateListingDto) {
    const newListing = this.listingRepo.create({
      publicacion_uuid: uuidv4Typed(),
      id_usuario,
      ...createListingDto,
      estado: ListingStatus.ACTIVA, // Estado por defecto
    });
    return this.listingRepo.save(newListing);
  }

  findAll() {
    return this.listingRepo.find({
      select: [
        'id_publicacion',
        'tipo_publicacion',
        'titulo',
        'estrellas',
        'calificacion',
        'vendidos',
        'existencias',
        'simbolo_moneda',
        'precio_anterior',
        'precio',
        'insignia',
        'imagen_portada',
        'fecha_creacion',
      ],
    });
  }

  findAllByUser(id_usuario: number) {
    return this.listingRepo.find({
      where: { id_usuario },
      select: [
        'id_publicacion',
        'tipo_publicacion',
        'titulo',
        'estrellas',
        'calificacion',
        'vendidos',
        'existencias',
        'simbolo_moneda',
        'precio_anterior',
        'precio',
        'imagen_portada',
        'fecha_creacion',
      ],
      //relations: ['usuario'],
    });
  }

  findAllMine(id_usuario: number) {
    return this.listingRepo.find({
      where: { id_usuario },
      select: [
        'id_publicacion',
        'publicacion_uuid',
        'tipo_publicacion',
        'titulo',
        'estrellas',
        'calificacion',
        'vendidos',
        'existencias',
        'simbolo_moneda',
        'precio_anterior',
        'precio',
        'imagen_portada',
        'fecha_creacion',
      ],
      //relations: ['usuario'],
    });
  }

  findOne(id_publicacion: number) {
    return this.listingRepo.findOneBy({ id_publicacion });
  }

  async update(id_publicacion: number, updateListingDto: UpdateListingDto) {
    const listing = await this.listingRepo.findOneBy({ id_publicacion });
    if (!listing) {
      return null;
    }
    this.listingRepo.merge(listing, updateListingDto);
    return this.listingRepo.save(listing);
  }

  async remove(id_publicacion: number) {
    const listing = await this.listingRepo.findOneBy({ id_publicacion });
    if (!listing) {
      return null;
    }
    return this.listingRepo.remove(listing);
  }
}

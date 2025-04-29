import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const newReview = this.reviewRepo.create(createReviewDto);
    return this.reviewRepo.save(newReview);
  }

  findAllByListing(id_publicacion: number) {
    return this.reviewRepo.find({ where: { id_publicacion } });
  }

  async likeReview(id_comentario: number) {
    const review = await this.reviewRepo.findOneBy({
      id_comentario,
    });
    if (!review) {
      return null;
    }
    this.reviewRepo.merge(review, { likes: review.likes + 1 });
    return this.reviewRepo.save(review);
  }

  async unlikeReview(id_comentario: number) {
    const review = await this.reviewRepo.findOneBy({
      id_comentario,
    });
    if (!review) {
      return null;
    }
    this.reviewRepo.merge(review, { likes: review.likes - 1 });
    return this.reviewRepo.save(review);
  }

  findOne(id: number) {
    return this.reviewRepo.findOneBy({ id_comentario: id });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepo.findOneBy({ id_comentario: id });
    if (!review) {
      return null;
    }
    this.reviewRepo.merge(review, updateReviewDto);
    return this.reviewRepo.save(review);
  }

  async remove(id: number) {
    const review = await this.reviewRepo.findOneBy({ id_comentario: id });
    if (!review) {
      return null;
    }
    return this.reviewRepo.remove(review);
  }
}

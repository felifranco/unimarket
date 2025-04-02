import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('valoracion')
export class Review {
  @PrimaryGeneratedColumn()
  id_valoracion: number;

  @Column()
  id_usuario: number;

  @Column()
  id_publicacion: number;

  @Column()
  puntuacion: number;

  @Column()
  comentario: string;

  @Column()
  fecha_creacion: Date;
}

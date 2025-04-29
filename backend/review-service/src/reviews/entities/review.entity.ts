import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comentario')
export class Review {
  @PrimaryGeneratedColumn()
  id_comentario: number;

  @Column()
  id_usuario: number;

  @Column()
  id_publicacion: number;

  @Column({ nullable: true })
  id_comentario_respuesta: number;

  @Column()
  titulo: string;

  @Column()
  contenido: string;

  @Column({ nullable: true })
  estrellas: number;

  @Column({ nullable: true })
  likes: number;

  @Column({ nullable: true })
  estado: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;
}

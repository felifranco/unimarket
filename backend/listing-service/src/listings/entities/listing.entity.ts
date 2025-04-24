import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('publicacion')
export class Listing {
  @PrimaryGeneratedColumn()
  id_publicacion: number;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  tipo: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  ubicacion: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  estrellas: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  calificacion: number;

  @Column({ nullable: true })
  vendidos: number;

  @Column({ nullable: true })
  existencias: number;

  @Column({ nullable: true })
  simbolo_moneda: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_anterior: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio: number;

  @Column({ nullable: true })
  insignia: string;

  @Column({ nullable: true })
  imagenes: string;

  @Column({ nullable: true })
  imagen_portada: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;

  //@Column()
  //categoria: string;
}

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

  @Column({ type: 'varchar', length: 36, unique: true })
  publicacion_uuid: string;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  tipo_publicacion: string;

  @Column()
  titulo: string;

  @Column()
  descripcion_general: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  categorias: string;

  @Column({ nullable: true })
  ubicacion: string;

  @Column({ nullable: true })
  estado: string;

  @Column({ default: 0 })
  estrellas: number;

  @Column({ default: 0 })
  calificacion: number;

  @Column({ nullable: true, default: 0 })
  vendidos: number;

  @Column({ nullable: true })
  existencias: number;

  @Column({ nullable: true })
  descripcion_producto: string;

  @Column({ nullable: true })
  simbolo_moneda: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
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
}

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

  @Column()
  tipo: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio: number;

  @Column()
  ubicacion: string;

  @Column({ nullable: true })
  estado: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;

  //@Column()
  //categoria: string;
}

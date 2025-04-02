import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  precio: number;

  @Column()
  ubicacion: string;

  @Column()
  fecha_creacion: Date;

  //@Column()
  //estado: string;
  //
  //@Column()
  //categoria: string;
}

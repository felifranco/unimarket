import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  uuid: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_portada: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_perfil: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  acerca_de: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  ubicacion: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ default: 0 })
  estrellas: number;

  @Column({ default: 0 })
  calificacion: number;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  rol: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  estado: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
    type: 'varchar',
    length: 500,
  })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Auth {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_completo: string;

  @Column()
  correo: string;

  @Column()
  username: string;

  @Column()
  password_hash: string;

  @Column()
  rol: string;

  @Column()
  fecha_creacion: Date;
}

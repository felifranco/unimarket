import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario')
export class Auth {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  rol: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  estado: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  refreshToken: string;

  @Column({ default: 0 })
  estrellas: number;

  @Column({ default: 0 })
  calificacion: number;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;
}

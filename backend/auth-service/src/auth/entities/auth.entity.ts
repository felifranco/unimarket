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

  @Column({ type: 'varchar', length: 255 })
  nombre_completo: string;

  @Column({ type: 'varchar', unique: true })
  correo: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password_hash: string;

  @Column({ type: 'varchar', nullable: true })
  rol: string;

  @Column({ type: 'varchar', nullable: true })
  estado: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_modificacion: Date;
}

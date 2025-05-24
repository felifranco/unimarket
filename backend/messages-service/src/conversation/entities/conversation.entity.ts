import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('conversacion')
export class Conversation {
  @PrimaryGeneratedColumn({ name: 'id_conversacion' })
  id_conversacion: number;

  @Column({ type: 'varchar', nullable: false })
  remitente: string;

  @Column({ type: 'varchar', nullable: false })
  destinatario: string;

  @Column({ type: 'boolean', default: false })
  remitente_borrado: boolean;

  @Column({ type: 'boolean', default: false })
  destinatario_borrado: boolean;

  @Column({ type: 'varchar', nullable: true })
  imagen_perfil_remitente: string;

  @Column({ type: 'varchar', nullable: true })
  imagen_perfil_destinatario: string;

  @Column({ type: 'varchar', nullable: true })
  nombre_remitente: string;

  @Column({ type: 'varchar', nullable: true })
  nombre_destinatario: string;

  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';

@Entity('mensaje')
export class Message {
  @PrimaryGeneratedColumn({ name: 'id_mensaje' })
  id_mensaje: number;

  @Column({ name: 'id_conversacion', type: 'int' })
  id_conversacion: number;

  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_conversacion' })
  conversacion: Conversation;

  @Column({ type: 'varchar', nullable: false })
  remitente: string;

  @Column({ type: 'varchar', nullable: false })
  tipo: string;

  @Column({ type: 'text', nullable: false })
  mensaje: string;

  @Column({ type: 'varchar', nullable: true })
  adjunto_url: string;

  @Column({ type: 'varchar', nullable: true })
  adjunto_nombre: string;

  @Column({ type: 'varchar', nullable: true })
  adjunto_tipo: string;

  @Column({ type: 'int', nullable: true })
  adjunto_tamano: number;

  @Column({ type: 'boolean', default: false })
  leido_remitente: boolean;

  @Column({ type: 'boolean', default: false })
  leido_destinatario: boolean;

  @CreateDateColumn({
    name: 'fecha_envio',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_envio: Date;

  @UpdateDateColumn({
    name: 'fecha_modificacion',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_modificacion: Date;
}

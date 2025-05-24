export interface chatMessage {
  id_mensaje?: number;
  id_conversacion?: number;
  imagen_perfil?: string | null;
  nombre_completo?: string;
  remitente: string;
  destinatario: string;
  tipo: string;
  mensaje: string;
  adjunto_url?: string;
  adjunto_nombre?: string;
  adjunto_tipo?: string;
  adjunto_tamano?: number;
  fecha_envio?: string;
  leido?: boolean;
}

export interface chatUser {
  id_conversacion?: number;
  uuid: string;
  imagen_perfil: string;
  nombre_completo: string;
  ultimo_mensaje: string;
  timestamp: string;
  no_leidos: number;
  en_linea: boolean;
}

export interface Conversation {
  id_conversacion: number;
  remitente: string;
  destinatario: string;
  remitente_borrado: boolean;
  destinatario_borrado: boolean;
  imagen_perfil_remitente?: string;
  imagen_perfil_destinatario?: string;
  nombre_remitente?: string;
  nombre_destinatario?: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  mensajes: Message[];
}

export interface Message {
  id_mensaje: number;
  id_conversacion: number;
  remitente: string;
  tipo: string;
  mensaje: string;
  adjunto_url?: string;
  adjunto_nombre?: string;
  adjunto_tipo?: string;
  adjunto_tamano?: number;
  fecha_envio: string;
  leido: boolean;
  conversacion?: Conversation;
}

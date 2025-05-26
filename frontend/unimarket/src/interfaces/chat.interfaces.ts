export interface socketMessage {
  id_conversacion?: number;
  imagen_perfil_remitente: string | null;
  imagen_perfil_destinatario?: string | null;
  nombre_remitente: string | null;
  nombre_destinatario?: string | null;
  remitente: string;
  destinatario: string;
  tipo: string;
  mensaje: string;
  adjunto_url?: string;
  adjunto_nombre?: string;
  adjunto_tipo?: string;
  adjunto_tamano?: number;
}

export interface Conversacion {
  id_conversacion?: number;
  remitente: string;
  destinatario: string;
  remitente_borrado?: boolean;
  destinatario_borrado?: boolean;
  imagen_perfil_remitente?: string | null;
  imagen_perfil_destinatario?: string | null;
  nombre_remitente?: string | null;
  nombre_destinatario?: string | null;
  fecha_creacion?: string;
  fecha_modificacion?: string;
  mensajes?: Mensaje[];
  ultimo_mensaje?: string;
  no_leidos?: number;
  en_linea?: boolean;
}

export interface conversacionBase {
  destinatario: string;
  imagen_perfil_destinatario?: string;
  nombre_destinatario: string;
}

export interface Mensaje {
  id_mensaje?: number;
  id_conversacion: number;
  remitente: string;
  tipo: string;
  mensaje: string;
  adjunto_url?: string;
  adjunto_nombre?: string;
  adjunto_tipo?: string;
  adjunto_tamano?: number;
  fecha_envio?: string;
  leido_remitente?: boolean;
  leido_destinatario?: boolean;
  conversacion?: Conversacion;
}

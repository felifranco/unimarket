export interface sendMessageType {
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

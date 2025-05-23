export interface conversacion {
  remitente: string;
  destinatario: string;
}

export interface mensaje {
  id_conversacion: number;
  remitente: string;
  tipo: string;
  mensaje: string;
  adjunto_url?: string;
  adjunto_nombre?: string;
  adjunto_tipo?: string;
  adjunto_tamano?: number;
}

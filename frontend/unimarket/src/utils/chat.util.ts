import { socketMessage } from "../interfaces/chat.interfaces";

export const sendSocketMessage = ({
  id_conversacion,
  imagen_perfil_remitente,
  imagen_perfil_destinatario,
  nombre_remitente,
  nombre_destinatario,
  remitente,
  destinatario,
  tipo,
  mensaje,
  adjunto_url,
  adjunto_nombre,
  adjunto_tipo,
  adjunto_tamano,
}: socketMessage): string => {
  return JSON.stringify({
    action: "sendMessage",
    id_conversacion,
    imagen_perfil_remitente,
    imagen_perfil_destinatario,
    nombre_remitente,
    nombre_destinatario,
    remitente,
    destinatario,
    tipo,
    mensaje,
    adjunto_url,
    adjunto_nombre,
    adjunto_tipo,
    adjunto_tamano,
  });
};

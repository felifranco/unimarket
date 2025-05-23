import { chatMessage } from "../interfaces/chat.interfaces";

export const sendChatMessage = ({
  id_conversacion,
  imagen_perfil,
  nombre_completo,
  remitente,
  destinatario,
  tipo,
  mensaje,
  adjunto_url,
  adjunto_nombre,
  adjunto_tipo,
  adjunto_tamano,
}: chatMessage): string => {
  return JSON.stringify({
    action: "sendMessage",
    id_conversacion,
    imagen_perfil,
    nombre_completo,
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

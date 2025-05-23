import {APIGatewayProxyEvent} from 'aws-lambda';
import {getConnection} from '../services/connection.service';
import {sendMessageType} from '../types/send-message.type';
import {
  insertConversacion,
  insertarMensaje,
} from '../services/postgres.service';

export async function handleSendMessage(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;

  const body = event.body ? JSON.parse(event.body) : {};

  // Extraer los campos del cuerpo de la solicitud
  let id_conversacion = body.id_conversacion;
  const {
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
  } = body;

  if (!destinatario || !remitente) {
    //console.log('destinatario o remitente no existe');
    return {statusCode: 400, body: 'Missing required fields.'};
  }

  const destinatarioConnectionId = await getConnection(destinatario);
  const remitenteConnectionId = await getConnection(remitente);

  if (!id_conversacion) {
    //console.log('id_conversacion no existe');
    id_conversacion = await insertConversacion({
      remitente,
      destinatario,
    });
  }

  if (connectionId !== remitenteConnectionId) {
    //console.log('No tienes permiso para enviar mensajes');
    return {statusCode: 403, body: 'You are not allowed to send messages.'};
  }

  const newMessage: sendMessageType = {
    id_conversacion,
    imagen_perfil: imagen_perfil ? imagen_perfil : null,
    nombre_completo: nombre_completo ? nombre_completo : 'unknown',
    remitente,
    destinatario,
    tipo,
    mensaje,
    adjunto_url,
    adjunto_nombre,
    adjunto_tipo,
    adjunto_tamano,
  };

  insertarMensaje({
    id_conversacion,
    remitente,
    tipo,
    mensaje,
    adjunto_url,
    adjunto_nombre,
    adjunto_tipo,
    adjunto_tamano,
  });

  if (!destinatarioConnectionId) {
    return {statusCode: 404, body: 'User not connected.'};
  }

  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const endpoint = `https://${domain}/${stage}`;

  const {ApiGatewayManagementApi} = await import(
    '@aws-sdk/client-apigatewaymanagementapi'
  );
  const apiGw = new ApiGatewayManagementApi({endpoint});
  await apiGw.postToConnection({
    ConnectionId: destinatarioConnectionId,
    Data: Buffer.from(JSON.stringify(newMessage)),
  });

  return {statusCode: 200, body: 'Message sent.'};
}

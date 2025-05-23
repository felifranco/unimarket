import {WebSocketServer} from 'ws';
import {insertarMensaje, insertConversacion} from './services/postgres.service';
import {sendMessageType} from './types/send-message.type';
import {get} from 'http';

// Variables para servidor WebSocket local
const wss = new WebSocketServer({port: 4001});
const connections = new Map<string, any>(); // userId -> ws

const getConnection = (userId: string) => {
  const connection = connections.get(userId);
  if (!connection) {
    throw new Error(`No connection found for userId: ${userId}`);
  }
  return connection;
};

// Funciones para manejar eventos de WebSocket
const handleConnect = (ws: any, req: any) => {
  // Extrae userId del query param
  const url = new URL(req.url!, `ws://${req.headers.host}`);
  const userId = url.searchParams.get('userId') || `anon-${Math.random()}`;

  connections.set(userId, ws);

  console.log(`Nueva conexión establecida para ${userId}`);
  return userId;
};

const handleDisconnect = (userId: string) => {
  console.log(`Conexión cerrada para ${userId}`);
  connections.delete(userId);
};

const handleSendMessage = async (ws: any, data: any, userId: string) => {
  try {
    const connectionId = getConnection(userId);

    const body = JSON.parse(data.toString());
    //console.log(`Mensaje recibido de ${userId}:`, body);

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
      console.log('destinatario o remitente no existe');
      return {statusCode: 400, body: 'Missing required fields.'};
    }

    const destinatarioConnectionId = await getConnection(destinatario);
    const remitenteConnectionId = await getConnection(remitente);

    if (!id_conversacion) {
      console.log('id_conversacion no existe');
      id_conversacion = await insertConversacion({
        remitente,
        destinatario,
      });
    }

    if (connectionId !== remitenteConnectionId) {
      console.log('No tienes permiso para enviar mensajes');
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
      console.log('El destinatario no está conectado');
      return {statusCode: 404, body: 'User not connected.'};
    }

    //const domain = event.requestContext.domainName;
    //const stage = event.requestContext.stage;
    //const endpoint = `https://${domain}/${stage}`;

    // Envía el mensaje al destinatario si está conectado
    const destWs = connections.get(destinatario);
    if (destWs) {
      destWs.send(JSON.stringify(newMessage));
    }
  } catch (err) {
    /* ws.send(
        JSON.stringify({
          error: 'Error procesando mensaje',
          details: err.message,
        }),
      ); */
  }
  return;
};

const handler = (ws: any, data: any, userId: string) => {
  const body = JSON.parse(data.toString());
  console.log('Evento recibido:', body.action);

  // Lógica para manejar eventos de WebSocket
  switch (body.action) {
    case 'sendMessage':
      handleSendMessage(ws, data, userId);
      break;

    default:
      console.log('Acción no reconocida:', body.action);
      break;
  }
};

// Crea un servidor WebSocket local
wss.on('connection', (ws, req) => {
  const userId = handleConnect(ws, req);

  ws.on('message', async data => {
    handler(ws, data, userId);
  });

  ws.on('close', () => {
    handleDisconnect(userId);
  });
});

console.log('Servidor WebSocket local escuchando en ws://localhost:4001');

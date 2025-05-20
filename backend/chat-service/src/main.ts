import {APIGatewayProxyEvent, Context, APIGatewayProxyResult} from 'aws-lambda';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

const REGION = process.env.AWS_REGION || 'us-east-1';
const TABLE = process.env.DYNAMODB_TABLE || 'chat-connections';

const ddb = new DynamoDBClient({
  region: REGION,
  endpoint: 'http://localhost:8000',
});
const docClient = DynamoDBDocumentClient.from(ddb);

// Utilidad para cold start
let initialized = false;

async function saveConnection(userId: string, connectionId: string) {
  await docClient.send(
    new PutCommand({TableName: TABLE, Item: {userId, connectionId}}),
  );
}

async function deleteConnection(userId: string) {
  await docClient.send(new DeleteCommand({TableName: TABLE, Key: {userId}}));
}

async function getConnection(userId: string) {
  const res = await docClient.send(
    new GetCommand({TableName: TABLE, Key: {userId}}),
  );
  return res.Item?.connectionId;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!initialized) {
    // Aquí podrías hacer inicializaciones pesadas si necesitas
    initialized = true;
  }

  const routeKey = event.requestContext.routeKey;
  const connectionId = event.requestContext.connectionId;

  if (routeKey === '$connect') {
    // Puedes extraer el userId de queryStringParameters o de un JWT
    const userId = event.queryStringParameters?.userId || 'anonymous';
    await saveConnection(userId, connectionId!);
    return {statusCode: 200, body: 'Connected.'};
  }

  if (routeKey === '$disconnect') {
    // Igual que arriba, deberías mapear connectionId a userId
    // Aquí solo como ejemplo:
    const userId = event.queryStringParameters?.userId || 'anonymous';
    await deleteConnection(userId);
    return {statusCode: 200, body: 'Disconnected.'};
  }

  if (routeKey === 'sendMessage') {
    // El body debe tener: { to: userId, message: string }
    const body = event.body ? JSON.parse(event.body) : {};
    const toUserId = body.to;
    const message = body.message;
    const toConnectionId = await getConnection(toUserId);
    if (!toConnectionId) {
      return {statusCode: 404, body: 'User not connected.'};
    }
    // Enviar mensaje usando AWS API Gateway Management API
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const endpoint = `https://${domain}/${stage}`;
    const {ApiGatewayManagementApi} = await import(
      '@aws-sdk/client-apigatewaymanagementapi'
    );
    const apiGw = new ApiGatewayManagementApi({endpoint});
    await apiGw.postToConnection({
      ConnectionId: toConnectionId,
      Data: Buffer.from(JSON.stringify({from: connectionId, message})),
    });
    return {statusCode: 200, body: 'Message sent.'};
  }

  return {statusCode: 400, body: 'Unknown route'};
};

// Ejecución local/contenedor
if (require.main === module) {
  // Aquí podrías levantar un servidor local para pruebas manuales
  // Por simplicidad, solo logueamos
  console.log('Chat Lambda WebSocket handler ready (local mode)');
}

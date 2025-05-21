import {APIGatewayProxyEvent} from 'aws-lambda';
import {deleteConnection} from '../services/connection.service';

export async function handleDisconnect(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;
  const userId = event.queryStringParameters?.userId || 'anonymous';

  await deleteConnection(userId);

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Disconnected', connectionId}),
  };
}

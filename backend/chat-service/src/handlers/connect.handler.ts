import {APIGatewayProxyEvent} from 'aws-lambda';
import {saveConnection} from '../services/connection.service';

export async function handleConnect(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;
  const userId = event.queryStringParameters?.userId || 'anonymous';

  await saveConnection(userId, connectionId!);

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Connected', connectionId}),
  };
}

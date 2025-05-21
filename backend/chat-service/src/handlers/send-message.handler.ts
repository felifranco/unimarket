import {APIGatewayProxyEvent} from 'aws-lambda';
import {getConnection} from '../services/connection.service';

export async function handleSendMessage(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;

  const body = event.body ? JSON.parse(event.body) : {};
  const toUserId = body.to;
  const message = body.message;
  const toConnectionId = await getConnection(toUserId);

  if (!toConnectionId) {
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
    ConnectionId: toConnectionId,
    Data: Buffer.from(JSON.stringify({from: connectionId, message})),
  });

  return {statusCode: 200, body: 'Message sent.'};
}

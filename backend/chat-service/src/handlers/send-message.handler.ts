import {APIGatewayProxyEvent} from 'aws-lambda';
import {getConnection} from '../services/connection.service';
import {sendMessageType} from '../types/send-message.type';

export async function handleSendMessage(event: APIGatewayProxyEvent) {
  const connectionId = event.requestContext.connectionId;

  const body = event.body ? JSON.parse(event.body) : {};
  const profile_picture = body.profile_picture;
  const name = body.name;
  const toUserId = body.to;
  const fromUserId = body.from;
  const message = body.message;
  const toConnectionId = await getConnection(toUserId);
  const fromConnectionId = await getConnection(fromUserId);

  if (connectionId !== fromConnectionId) {
    return {statusCode: 403, body: 'You are not allowed to send messages.'};
  }
  if (!toUserId || !fromUserId || !message) {
    return {statusCode: 400, body: 'Missing required fields.'};
  }

  if (!toConnectionId) {
    return {statusCode: 404, body: 'User not connected.'};
  }

  const newMessage: sendMessageType = {
    profile_picture: profile_picture ? profile_picture : '',
    name: name ? name : 'User',
    from: fromUserId,
    message: message,
  };

  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const endpoint = `https://${domain}/${stage}`;

  const {ApiGatewayManagementApi} = await import(
    '@aws-sdk/client-apigatewaymanagementapi'
  );
  const apiGw = new ApiGatewayManagementApi({endpoint});
  await apiGw.postToConnection({
    ConnectionId: toConnectionId,
    Data: Buffer.from(JSON.stringify(newMessage)),
  });

  return {statusCode: 200, body: 'Message sent.'};
}

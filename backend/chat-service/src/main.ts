import {APIGatewayProxyEvent, Context, APIGatewayProxyResult} from 'aws-lambda';
import {handleConnect} from './handlers/connect.handler';
import {handleDisconnect} from './handlers/disconnect.handler';
import {handleSendMessage} from './handlers/send-message.handler';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  switch (event.requestContext.routeKey) {
    case '$connect':
      return handleConnect(event);
    case '$disconnect':
      return handleDisconnect(event);
    case 'sendMessage':
      return handleSendMessage(event);
    default:
      return {statusCode: 400, body: 'Unknown route'};
  }
};

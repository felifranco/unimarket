import { Context, Callback, Handler, APIGatewayProxyEvent } from 'aws-lambda';
import serverlessFastify from '@fastify/aws-lambda';
import { bootstrap } from 'src/main';

let cachedHandler: Handler;

async function initFastify() {
  const fastifyApp = await bootstrap();
  return serverlessFastify(fastifyApp.instance);
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  cachedHandler = cachedHandler ?? (await initFastify());
  return cachedHandler(event, context, callback);
};

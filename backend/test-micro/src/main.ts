import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';

let lambdaProxy: Server;

export async function bootstrap() {
  console.log('main.ts - bootstrap(init)');
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Inicializar la aplicación
  await app.init();

  console.log('main.ts - bootstrap(end)');

  //return server;
  return serverlessExpress.createServer(server, null, []);
}

// Instrucción para ejecutar local o como módulo
//if (require.main === module) {
//  bootstrap()
//    .then((server) => {
//      const port = process.env.PORT || 3000;
//      server.listen(port, () => {
//        console.log(`Application is running on: http://localhost:${port}`);
//      });
//    })
//    .catch((error) => {
//      console.error('Error during application bootstrap:', error);
//    });
//}

bootstrap()
  .then((server) => {
    lambdaProxy = server;
  })
  .catch((error) => {
    console.error('Error during application bootstrap:', error);
  });

function waitForServer(event: any, context: any) {
  setImmediate(() => {
    if (!lambdaProxy) {
      return waitForServer(event, context);
    } else {
      return serverlessExpress.proxy(lambdaProxy, event, context);
    }
  });
}

export const handler = (event: APIGatewayEvent, context: Context) => {
  if (lambdaProxy) {
    return serverlessExpress.proxy(lambdaProxy, event, context as any);
  } else {
    return waitForServer(event, context);
  }
};

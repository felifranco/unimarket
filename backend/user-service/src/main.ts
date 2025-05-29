import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';

let lambdaProxy: Server;

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  //const config = new DocumentBuilder()
  //  .setTitle('User Service (Gestión de Usuarios)')
  //  .setDescription('Información de usuario, roles y reputación')
  //  .setVersion('1.0')
  //  //.addTag('tag')
  //  .addBearerAuth()
  //  .build();
  //
  //const document = SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('api', app, document);

  //app.enableCors({
  //  origin: '*',
  //  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //});

  // Inicializar la aplicación
  await app.init();

  return serverlessExpress.createServer(server, null, []);
}

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

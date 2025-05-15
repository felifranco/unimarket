import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';
import configurations from './config/configurations';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

let lambdaProxy: Server;

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  //const config = new DocumentBuilder()
  //  .setTitle('Auth Service (Autenticación y Seguridad)')
  //  .setDescription('Registro, autenticación y autorización de usuarios')
  //  .setVersion('1.0')
  //  //.addTag('tag')
  //  .addBearerAuth()
  //  .build();
  //
  //const document = SwaggerModule.createDocument(app, config);
  //SwaggerModule.setup('api', app, document);

  // Aplicar interceptor y filtro globales
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  //app.enableCors({
  //  origin: '*',
  //  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //});

  // Configuración utilizada por AWS Lambda
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

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import configurations from './config/configurations';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

export interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

export async function bootstrap(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    { logger: !process.env.AWS_EXECUTION_ENV ? new Logger() : console },
  );

  const config = new DocumentBuilder()
    .setTitle('Listings Service (Gestión de Publicaciones)')
    .setDescription('Creación y gestión de publicaciones')
    .setVersion('1.0')
    //.addTag('tag')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Aplicar interceptor y filtro globales
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Configuración utilizada por AWS Lambda
  await app.init();

  return { app, instance };
}

// Instrucción para ejecutar local o como módulo
if (require.main === module) {
  bootstrap()
    .then(async (obj) => {
      try {
        await obj.app.listen(configurations().appPort);
      } catch (error) {
        console.error('Error while starting the server:', error);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error during application bootstrap:', error);
    });
}

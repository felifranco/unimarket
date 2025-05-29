import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import * as serverlessExpress from 'aws-serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

let lambdaProxy: Server;

export async function bootstrap(): Promise<NestApp> {
  console.log('main.ts - bootstrap(init)');
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    { logger: !process.env.AWS_EXECUTION_ENV ? new Logger() : console },
  );

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Habilitar Swagger solo si ENABLE_SWAGGER=true
  if (process.env.ENABLE_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Auth Service (Autenticación y Seguridad)')
      .setDescription('Registro, autenticación y autorización de usuarios')
      .setVersion('1.0')
      //.addTag('tag')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // Aplicar interceptor y filtro globales
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: 'https://felifranco.github.io',
    credentials: true, // Permite cookies/autenticación si es necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.init();

  console.log('main.ts - bootstrap(end)');

  return { app, instance };
}

// Instrucción para ejecutar local o como módulo
if (require.main === module) {
  bootstrap()
    .then(async (obj) => {
      try {
        console.log('main.ts - require.main== module');
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

getBootstrapPromise()
  .then(({ app, server }) => {
    lambdaProxy = server;
  })
  .catch((error) => {
    console.error('Error during application bootstrap:', error);
  });

// Permitir ejecución local sin doble inicialización
if (require.main === module) {
  (async () => {
    const port = process.env.APP_PORT || 3001;
    const { app } = await getBootstrapPromise();
    await app.listen(port, () => {
      console.log(`Auth Service running locally on http://localhost:${port}`);
    });
  })();
}

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

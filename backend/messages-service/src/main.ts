import { Server } from 'http';
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

let bootstrapPromise: Promise<{ app: any; server: Server }> | null = null;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Habilitar Swagger solo si ENABLE_SWAGGER=true
  if (process.env.ENABLE_SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Messages Service (Gestión de Mensajes)')
      .setDescription('API para el servicio de mensajes')
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

  return { app, server: serverlessExpress.createServer(server, null, []) };
}

// Inicializar solo una vez y reutilizar
function getBootstrapPromise() {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap();
  }
  return bootstrapPromise;
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
      console.log(
        `Messages Service running locally on http://localhost:${port}`,
      );
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

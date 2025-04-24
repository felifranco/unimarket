import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configurations from './config/configurations';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Listings Service (Gestión de Publicaciones)')
    .setDescription(' Creación y gestión de publicaciones')
    .setVersion('1.0')
    //.addTag('tag')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  // Aplicar interceptor y filtro globales
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(configurations().appPort);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});

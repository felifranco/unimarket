import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configurations from './config/configurations';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Admin Service (Panel de Administración y Moderación)')
    .setDescription(
      'Permite a los administradores gestionar usuarios, publicaciones y reportes',
    )
    .setVersion('1.0')
    //.addTag('tag')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(configurations().appPort);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});

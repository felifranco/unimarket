import Fastify from 'fastify';
import {uploadRoutes} from './routes/upload.route';

async function bootstrap() {
  const app = Fastify();

  app.register(uploadRoutes);

  try {
    await app.listen({port: 3000, host: '0.0.0.0'});
    console.log('🚀 Server ready at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();

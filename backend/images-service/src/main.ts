import Fastify from 'fastify';
import {uploadRoutes} from './routes/upload.route';

async function bootstrap() {
  const app = Fastify();

  app.register(uploadRoutes);

  try {
    const APP_PORT = parseInt(process.env.APP_PORT ?? '3000', 10);
    await app.listen({port: APP_PORT, host: '0.0.0.0'});
    console.log(`🚀 Server ready at http://localhost:${APP_PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();

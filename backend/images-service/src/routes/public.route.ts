import {FastifyInstance} from 'fastify';

export const publicRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    return 'Hello World';
  });
  app.get('/health', async (request, reply) => {
    return 'OK';
  });
};

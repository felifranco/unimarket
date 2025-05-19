import {FastifyInstance} from 'fastify';

export const publicRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    return {message: 'Hello World'};
  });
  app.get('/health', async (request, reply) => {
    return {message: 'OK'};
  });
};

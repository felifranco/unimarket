import {FastifyRequest, FastifyReply} from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';

// Plugin para registrar JWT en Fastify
export default fp(async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'defaultSecret',
  });

  // Decorador para proteger rutas
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        throw err;
      }
    },
  );
});

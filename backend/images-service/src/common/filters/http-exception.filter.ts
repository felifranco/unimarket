import {FastifyError, FastifyReply, FastifyRequest} from 'fastify';
import {ApiResponse} from '../interfaces/api-response.interface';

/**
 * Filtro global para capturar excepciones y formatearlas con ApiResponse.
 */
export function httpExceptionFilter(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const response: ApiResponse = {
    statusCode,
    message,
    error: error.name || 'Error',
  };
  reply.status(statusCode).send(response);
}

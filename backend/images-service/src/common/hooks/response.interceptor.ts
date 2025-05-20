import {FastifyReply, FastifyRequest, HookHandlerDoneFunction} from 'fastify';
import {ApiResponse} from '../interfaces/api-response.interface';

/**
 * Interceptor que transforma todas las respuestas exitosas al formato ApiResponse.
 */
export async function responseInterceptor(
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any,
  //done: HookHandlerDoneFunction,
) {
  let parsedPayload = payload;
  if (typeof payload === 'string') {
    try {
      parsedPayload = JSON.parse(payload);
    } catch (e) {
      // If payload is not JSON, keep as is
      parsedPayload = payload;
    }
  }

  // If payload is already an ApiResponse or an error, return as is
  if (
    parsedPayload &&
    parsedPayload.statusCode &&
    parsedPayload.message &&
    Object.prototype.hasOwnProperty.call(parsedPayload, 'data') // ApiResponse
  ) {
    return JSON.stringify(parsedPayload);
  }

  // If payload is an error (Fastify error object)
  if (
    parsedPayload &&
    parsedPayload.statusCode &&
    parsedPayload.error &&
    parsedPayload.message
  ) {
    return JSON.stringify(parsedPayload);
  }

  const response: ApiResponse = {
    statusCode: reply.statusCode,
    message: 'Operación exitosa',
    data: parsedPayload ? parsedPayload : undefined,
  };
  
  return JSON.stringify(response);
}

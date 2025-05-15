import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { /*Request,*/ Response } from 'express';
//import { FastifyReply } from 'fastify';
import { ApiResponse } from '../interfaces/api-response.interface';

/**
 * Filtro global para capturar todas las excepciones HTTP y formatearlas
 * con la estructura de respuesta estándar ApiResponse.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    // Express.js
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();

    // Fastify
    //const response = ctx.getResponse<FastifyReply>();

    let statusCode: number;
    let message: string;
    let error: string;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      statusCode = exception.getStatus();
      message =
        typeof exceptionResponse === 'object' && 'message' in exceptionResponse
          ? (exceptionResponse as { message: string }).message
          : exception.message;
      error =
        typeof exceptionResponse === 'object' && 'error' in exceptionResponse
          ? (exceptionResponse as { error: string }).error
          : exception.name;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error =
        typeof exception === 'object' &&
        exception !== null &&
        'message' in exception
          ? (exception as { message: string }).message
          : 'Unexpected error';
    }

    const responseBody: ApiResponse = {
      statusCode,
      message,
      error,
    };

    response.status(statusCode).json(responseBody);
    //response.status(statusCode).send(responseBody);
  }
}

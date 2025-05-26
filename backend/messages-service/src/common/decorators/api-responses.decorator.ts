import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponses } from 'src/constants/api-responses.constants';

export function CommonResponses() {
  return applyDecorators(
    ApiResponse(ApiResponses.SUCCESS),
    ApiResponse(ApiResponses.BAD_REQUEST),
    ApiResponse(ApiResponses.UNAUTHORIZED),
    ApiResponse(ApiResponses.FORBIDDEN),
    ApiResponse(ApiResponses.INTERNAL_SERVER_ERROR),
  );
}

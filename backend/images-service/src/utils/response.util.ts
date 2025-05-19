import {ApiResponse} from '../common/interfaces/api-response.interface';
import {ApiResponses} from '../constants/api-responses.constants';

export const {SUCCESS, BAD_REQUEST} = ApiResponses;

export function apiResponse<T>(
  data: T,
  message = 'Success',
  statusCode = SUCCESS.status,
): ApiResponse<T> {
  return {
    statusCode,
    message,
    error: statusCode >= BAD_REQUEST.status ? message : undefined,
    data,
  };
}

export function apiResponse<T>(data: T, message = 'Success', statusCode = 200) {
  return {
    statusCode,
    message,
    error: statusCode >= 400 ? true : null,
    data,
  };
}

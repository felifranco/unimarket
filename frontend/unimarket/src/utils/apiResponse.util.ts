/**
 * Estructura base de respuesta API para uso entre microservicios y frontend.
 */
export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  error?: string;
  data?: T;
}

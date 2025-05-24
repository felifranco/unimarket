/**
 * Estructura base de respuesta API para uso entre microservicios y frontend.
 */
export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  error?: string;
}

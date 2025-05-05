export const ApiResponses = {
  SUCCESS: {
    status: 200,
    description: 'Operación exitosa.',
  },
  CREATED: {
    status: 201,
    description: 'Recurso creado exitosamente.',
  },
  NO_CONTENT: {
    status: 204,
    description: 'No hay contenido.',
  },
  BAD_REQUEST: {
    status: 400,
    description: 'Solicitud incorrecta.',
  },
  UNAUTHORIZED: {
    status: 401,
    description: 'No autorizado.',
  },
  FORBIDDEN: {
    status: 403,
    description: 'Prohibido.',
  },
  NOT_FOUND: {
    status: 404,
    description: 'Recurso no encontrado.',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    description: 'Error interno del servidor.',
  },
};

export function getHttpErrorMessage(statusCode: number): {
  title: string;
  description: string;
} {
  const errorMessages: {
    [key: number]: { title: string; description: string };
  } = {
    400: {
      title: "Bad Request",
      description:
        "La solicitud no pudo ser procesada debido a un error del cliente.",
    },
    401: {
      title: "Unauthorized",
      description:
        "Credenciales inválidas. Por favor, verifica tu información de inicio de sesión.",
    },
    403: {
      title: "Forbidden",
      description: "No tienes permiso para acceder a este recurso.",
    },
    404: {
      title: "Not Found",
      description: "El recurso solicitado no fue encontrado.",
    },
    500: {
      title: "Internal Server Error",
      description: "Ocurrió un error inesperado en el servidor.",
    },
    502: {
      title: "Bad Gateway",
      description:
        "El servidor recibió una respuesta inválida de otro servidor.",
    },
    503: {
      title: "Service Unavailable",
      description:
        "El servicio no está disponible en este momento. Inténtalo más tarde.",
    },
    504: {
      title: "Gateway Timeout",
      description: "El servidor no respondió a tiempo. Inténtalo nuevamente.",
    },
  };

  return (
    errorMessages[statusCode] || {
      title: "Unknown Error",
      description: "Ocurrió un error desconocido.",
    }
  );
}

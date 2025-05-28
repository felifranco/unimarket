import {FastifyInstance, FastifyRequest, FastifyReply} from 'fastify';
import multipart from '@fastify/multipart';
import {
  uploadImageToS3,
  removeImageFromS3,
  renameS3Folder,
} from '../services/upload.service';
import {apiResponse} from '../utils/response.util';
import {ApiResponses} from '../constants/api-responses.constants';
import {getPath} from '../utils/app.util';
import jwtPlugin from '../config/jwt.plugin';

// Extend FastifyInstance to include authenticate
declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: any, reply: any): Promise<void>;
  }
}

const {SUCCESS, BAD_REQUEST} = ApiResponses;

const ROUTE_PREFIX = process.env.API_PREFIX || 'images';

/**
 * Maneja la carga de archivos y los sube a S3.
 * @param directories Array de strings que representan los directorios en S3.
 * @param request Objeto de solicitud de Fastify.
 * @param reply Objeto de respuesta de Fastify.
 */
const handleFileUpload = async ({
  directories,
  request,
  reply,
}: {
  directories: Array<string>;
  request: FastifyRequest;
  reply: FastifyReply;
}) => {
  const data = await request.file();
  if (!data) {
    reply
      .code(BAD_REQUEST.status)
      .send(
        apiResponse(null, 'No se subió ningún archivo', BAD_REQUEST.status),
      );
    return;
  }

  const path = getPath(data, directories);

  const result = await uploadImageToS3({
    file: data,
    path: `${path}`,
  });

  return reply
    .code(SUCCESS.status)
    .send(apiResponse(result, 'Archivo subido exitosamente', SUCCESS.status));
};

export async function uploadRoutes(app: FastifyInstance) {
  app.register(multipart, {
    limits: {fileSize: 10 * 1024 * 1024}, // 10 MB
  });

  app.register(jwtPlugin);

  // Ruta pública: raíz del API
  //app.get('/', async (request, reply) => {
  //  return {message: 'Hello World'};
  //});

  // De aquí en adelante, todas las rutas requieren autenticación
  // Middleware de autenticación JWT para todas las rutas protegidas
  // Espera a que los plugins estén listos antes de registrar el hook
  app.addHook('onRequest', async (request, reply) => {
    // Permite la ruta pública sin autenticación
    await app.authenticate(request, reply);
  });

  // Subir imagen de perfil o portada
  app.post(`/${ROUTE_PREFIX}/upload/profile`, async function (request, reply) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'profile'],
      request,
      reply,
    });
  });

  // Subir imagen de una publicación existente
  app.post(`/${ROUTE_PREFIX}/upload/listings`, async function (request, reply) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'listings', 'publicacion_uuid'],
      request,
      reply,
    });
  });

  // Subir imagen de una nueva publicación
  app.post(
    `/${ROUTE_PREFIX}/upload/listings/new`,
    async function (request, reply) {
      return handleFileUpload({
        directories: ['users', 'uuid', 'listings', 'new'],
        request,
        reply,
      });
    },
  );

  // Trasladar imagenes a de una nueva publicación a una recién creada
  // Se usa para mover las imagenes de la carpeta new a la carpeta de la publicación
  app.put(
    `/${ROUTE_PREFIX}/move/listings/new`,
    async function (request, reply) {
      const {uuid} = request.query as {uuid?: string};
      const {listingUuid} = request.query as {listingUuid?: string};

      if (!uuid) {
        return reply
          .code(BAD_REQUEST.status)
          .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
      }

      if (!listingUuid) {
        return reply
          .code(BAD_REQUEST.status)
          .send(
            apiResponse(
              null,
              'Listing UUID no proporcionado',
              BAD_REQUEST.status,
            ),
          );
      }

      const oldPath = `users/${uuid}/listings/new`;
      const newPath = `users/${uuid}/listings/${listingUuid}`;

      await renameS3Folder({oldPath, newPath});

      return reply
        .code(SUCCESS.status)
        .send(
          apiResponse(null, 'Imagenes movidas exitosamente', SUCCESS.status),
        );
    },
  );

  // Eliminar imagen de perfil o portada
  app.delete(`/${ROUTE_PREFIX}/profile/:uuid`, async function (request, reply) {
    const {uuid} = request.params as {uuid: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
    }

    if (!filename) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(
            null,
            'Nombre de archivo no proporcionado',
            BAD_REQUEST.status,
          ),
        );
    }

    const path = `users/${uuid}/profile/${filename}`;
    await removeImageFromS3({path});

    return reply
      .code(SUCCESS.status)
      .send(
        apiResponse(
          null,
          'Imagen de perfil eliminada exitosamente',
          SUCCESS.status,
        ),
      );
  });

  // Eliminar imagen de una publicación
  app.delete(`/${ROUTE_PREFIX}/listing/:uuid`, async function (request, reply) {
    const {uuid} = request.params as {uuid: string};
    const {listingUuid} = request.query as {listingUuid?: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
    }

    if (!listingUuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(
            null,
            'Listing UUID no proporcionado',
            BAD_REQUEST.status,
          ),
        );
    }

    if (!filename) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(
            null,
            'Nombre de archivo no proporcionado',
            BAD_REQUEST.status,
          ),
        );
    }

    const path = `users/${uuid}/listings/${listingUuid}/${filename}`;
    await removeImageFromS3({path});
    return reply
      .code(SUCCESS.status)
      .send(
        apiResponse(
          null,
          'Imagen de listado eliminada exitosamente',
          SUCCESS.status,
        ),
      );
  });
}

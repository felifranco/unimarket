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

declare module 'fastify' {
  interface FastifyInstance {
    authenticate(request: any, reply: any): Promise<void>;
  }
}

const {BAD_REQUEST} = ApiResponses;

const ROUTE_PREFIX = 'images';

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
        apiResponse(
          undefined,
          'No se ha recibido el archivo',
          BAD_REQUEST.status,
        ),
      );
    return;
  }

  const path = getPath(data, directories);

  return uploadImageToS3({
    file: data,
    path: `${path}`,
  });
};

export const privateRoutes = async (app: FastifyInstance) => {
  app.register(multipart);
  app.register(jwtPlugin);

  // JWT auth para todas las rutas privadas
  app.addHook('onRequest', async (request, reply) => {
    await app.authenticate(request, reply);
  });

  // Subir imagen de perfil o portada
  app.post(`/${ROUTE_PREFIX}/profile`, async function (request, reply) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'profile'],
      request,
      reply,
    });
  });

  // Subir imagen de una publicación existente
  app.post(`/${ROUTE_PREFIX}/listings`, async function (request, reply) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'listings', 'publicacion_uuid'],
      request,
      reply,
    });
  });

  // Subir imagen de una nueva publicación
  app.post(`/${ROUTE_PREFIX}/listings/new`, async function (request, reply) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'listings', 'new'],
      request,
      reply,
    });
  });

  // Trasladar imagenes a de una nueva publicación a una recién creada
  // Se usa para mover las imagenes de la carpeta new a la carpeta de la publicación
  app.put(
    `/${ROUTE_PREFIX}/listings/new`,
    async function (request, reply) {
      const {uuid} = request.query as {uuid?: string};
      const {listingUuid} = request.query as {listingUuid?: string};

      if (!uuid) {
        return reply
          .code(BAD_REQUEST.status)
          .send(
            apiResponse(undefined, 'UUID no proporcionado', BAD_REQUEST.status),
          );
      }

      if (!listingUuid) {
        return reply
          .code(BAD_REQUEST.status)
          .send(
            apiResponse(
              undefined,
              'Listing UUID no proporcionado',
              BAD_REQUEST.status,
            ),
          );
      }

      const oldPath = `users/${uuid}/listings/new`;
      const newPath = `users/${uuid}/listings/${listingUuid}`;

      return renameS3Folder({oldPath, newPath});
    },
  );

  // Eliminar imagen de perfil o portada
  app.delete(`/${ROUTE_PREFIX}/profile/:uuid`, async function (request, reply) {
    const {uuid} = request.params as {uuid: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(undefined, 'UUID no proporcionado', BAD_REQUEST.status),
        );
    }

    if (!filename) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(
            undefined,
            'Nombre de archivo no proporcionado',
            BAD_REQUEST.status,
          ),
        );
    }

    return removeImageFromS3({path: `users/${uuid}/profile/${filename}`});
  });

  // Eliminar imagen de una publicación
  app.delete(`/${ROUTE_PREFIX}/listings/:uuid`, async function (request, reply) {
    const {uuid} = request.params as {uuid: string};
    const {listingUuid} = request.query as {listingUuid?: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(undefined, 'UUID no proporcionado', BAD_REQUEST.status),
        );
    }

    if (!listingUuid) {
      return reply
        .code(BAD_REQUEST.status)
        .send(
          apiResponse(
            undefined,
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
            undefined,
            'Nombre de archivo no proporcionado',
            BAD_REQUEST.status,
          ),
        );
    }

    return removeImageFromS3({
      path: `users/${uuid}/listings/${listingUuid}/${filename}`,
    });
  });
};

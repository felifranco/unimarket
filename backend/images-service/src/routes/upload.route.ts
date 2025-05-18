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

const {SUCCESS, BAD_REQUEST} = ApiResponses;

/**
 * Maneja la carga de archivos y los sube a S3.
 * @param directories Array de strings que representan los directorios en S3.
 * @param request Objeto de solicitud de Fastify.
 * @param response Objeto de respuesta de Fastify.
 */
const handleFileUpload = async ({
  directories,
  request,
  response,
}: {
  directories: Array<string>;
  request: FastifyRequest;
  response: FastifyReply;
}) => {
  const data = await request.file();
  if (!data) {
    response
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

  return response
    .code(SUCCESS.status)
    .send(apiResponse(result, 'Archivo subido exitosamente', SUCCESS.status));
};

export async function uploadRoutes(app: FastifyInstance) {
  app.register(multipart);

  // Subir imagen de perfil o portada
  app.post('/upload/profile', async function (request, response) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'profile'],
      request,
      response,
    });
  });

  // Subir imagen de una publicación existente
  app.post('/upload/listings', async function (request, response) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'listings', 'publicacion_uuid'],
      request,
      response,
    });
  });

  // Subir imagen de una nueva publicación
  app.post('/upload/listings/new', async function (request, response) {
    return handleFileUpload({
      directories: ['users', 'uuid', 'listings', 'new'],
      request,
      response,
    });
  });

  // Trasladar imagenes a de una nueva publicación a una recién creada
  // Se usa para mover las imagenes de la carpeta new a la carpeta de la publicación
  app.put('/move/listings/new', async function (request, response) {
    const {uuid} = request.query as {uuid?: string};
    const {listingUuid} = request.query as {listingUuid?: string};

    if (!uuid) {
      return response
        .code(BAD_REQUEST.status)
        .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
    }

    if (!listingUuid) {
      return response
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

    return response
      .code(SUCCESS.status)
      .send(apiResponse(null, 'Imagenes movidas exitosamente', SUCCESS.status));
  });

  // Eliminar imagen de perfil o portada
  app.delete('/profile/:uuid', async function (request, response) {
    const {uuid} = request.params as {uuid: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return response
        .code(BAD_REQUEST.status)
        .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
    }

    if (!filename) {
      return response
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

    return response
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
  app.delete('/listing/:uuid', async function (request, response) {
    const {uuid} = request.params as {uuid: string};
    const {listingUuid} = request.query as {listingUuid?: string};
    const {filename} = request.query as {filename?: string};

    if (!uuid) {
      return response
        .code(BAD_REQUEST.status)
        .send(apiResponse(null, 'UUID no proporcionado', BAD_REQUEST.status));
    }

    if (!listingUuid) {
      return response
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
      return response
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
    return response
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

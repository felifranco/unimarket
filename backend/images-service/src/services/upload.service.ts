import {s3, BUCKET_NAME} from '../config/aws';
import {PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import {ListObjectsV2Command, CopyObjectCommand} from '@aws-sdk/client-s3';
import {uploadInterface} from '../common/interfaces/upload.interface';

export async function uploadImageToS3({
  file,
  path,
}: uploadInterface): Promise<{url: string}> {
  const key = `${path}/${file.filename}`;

  const chunks = [];
  for await (const chunk of file.file) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));
  return {
    url: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
  };
}

export async function removeImageFromS3({
  path,
}: {
  path: string;
}): Promise<{Bucket: string; Key: string}> {
  const deleteParams = {
    Bucket: BUCKET_NAME,
    Key: path,
  };

  const result = await s3.send(new DeleteObjectCommand(deleteParams));

  if (result.$metadata.httpStatusCode !== 204) {
    throw new Error('Error al eliminar la imagen de S3');
  }

  return deleteParams;
}

/**
 * Renombra una "carpeta" (prefijo) en un bucket S3 moviendo todos los objetos de oldPath a newPath.
 * @param oldPath Prefijo actual de la carpeta (sin slash final)
 * @param newPath Nuevo prefijo de la carpeta (sin slash final)
 * @example
 * ```ts
 * await renameS3Folder({
 *   oldPath: 'old-folder',
 *   newPath: 'new-folder',
 * });
 * ```
 */
export async function renameS3Folder({
  oldPath,
  newPath,
}: {
  oldPath: string;
  newPath: string;
}): Promise<{
  Bucket: string;
  oldKey: string;
  newKey: string;
  moved: Array<{oldKey: string; newKey: string}> | [];
}> {
  const result: {
    Bucket: string;
    oldKey: string;
    newKey: string;
    moved: Array<{oldKey: string; newKey: string}>;
  } = {
    Bucket: BUCKET_NAME,
    oldKey: oldPath,
    newKey: newPath,
    moved: [],
  };
  // Listar todos los objetos bajo el prefijo oldPath
  const listedObjects = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: oldPath.endsWith('/') ? oldPath : oldPath + '/',
    }),
  );

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    // Nada que mover
    return result;
  }

  // Copiar cada objeto al nuevo prefijo y luego eliminar el original
  for (const object of listedObjects.Contents) {
    if (!object.Key) continue;
    const newKey = object.Key.replace(
      oldPath.endsWith('/') ? oldPath + '/' : oldPath + '/',
      newPath.endsWith('/') ? newPath + '/' : newPath + '/',
    );
    // Copiar
    await s3.send(
      new CopyObjectCommand({
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${object.Key}`,
        Key: newKey,
      }),
    );
    // Eliminar original
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: object.Key,
      }),
    );
    result.moved.push({
      oldKey: object.Key,
      newKey: newKey,
    });
  }

  return result;
}

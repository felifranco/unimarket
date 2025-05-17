import {s3, BUCKET_NAME} from '../config/aws';
import {PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
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

export async function removeImageFromS3({path}: {path: string}): Promise<void> {
  const deleteParams = {
    Bucket: BUCKET_NAME,
    Key: path,
  };

  const result = await s3.send(new DeleteObjectCommand(deleteParams));

  if (result.$metadata.httpStatusCode !== 204) {
    throw new Error('Error al eliminar la imagen de S3');
  }
}

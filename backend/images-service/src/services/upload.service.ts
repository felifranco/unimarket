import {s3, BUCKET_NAME} from '../config/aws';
import {Readable} from 'stream';
import {randomUUID} from 'crypto';

export async function uploadImageToS3(file: {
  filename: string;
  mimetype: string;
  file: Readable;
}) {
  const key = `images/${randomUUID()}-${file.filename}`;

  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.file,
    ContentType: file.mimetype,
  };

  const result = await s3.upload(uploadParams).promise();
  return {
    url: result.Location,
    key: result.Key,
  };
}

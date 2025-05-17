import {FastifyInstance} from 'fastify';
import multipart from 'fastify-multipart';
import {uploadImageToS3} from '../services/upload.service';
import {apiResponse} from '../utils/response';

export async function uploadRoutes(app: FastifyInstance) {
  app.register(multipart);

  app.post('/upload', async function (request, reply) {
    const data = await request.file();
    if (!data) {
      reply.code(400).send(apiResponse(null, 'No file uploaded', 400));
      return;
    }

    const result = await uploadImageToS3(data);
    return apiResponse(result, 'File uploaded successfully');
  });
}

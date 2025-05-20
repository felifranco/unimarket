import Fastify from 'fastify';
import cors from '@fastify/cors';
import {publicRoutes} from './routes/public.route';
import {privateRoutes} from './routes/private.route';
import {responseInterceptor} from './common/hooks/response.interceptor';
import {httpExceptionFilter} from './common/filters/http-exception.filter';
import awsLambdaFastify from '@fastify/aws-lambda';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';

/**
 * Estructura recomendada para separar rutas públicas y privadas en Fastify.
 *
 * - Las rutas públicas (como / y /health) se definen directamente sobre la instancia principal (app)
 *   usando la función publicRoutes(app). Estas rutas NO requieren autenticación JWT.
 *
 * - Las rutas privadas (que requieren autenticación JWT) se agrupan en un plugin usando app.register(privateRoutes).
 *   Dentro de privateRoutes, se recomienda registrar el plugin JWT y el hook de autenticación,
 *   así todas las rutas definidas ahí estarán protegidas.
 *
 * Ventajas de este enfoque:
 * - Claridad: Es fácil identificar qué rutas son públicas y cuáles privadas.
 * - Seguridad: El hook de autenticación solo afecta a las rutas privadas.
 * - Escalabilidad: Puedes agregar más rutas públicas o privadas sin mezclar responsabilidades.
 * - Encapsulamiento: Los hooks y decoradores aplicados en privateRoutes no afectan a las rutas públicas.
 *
 * Ejemplo de estructura:
 *   publicRoutes(app);         // Rutas públicas, sin JWT
 *   app.register(privateRoutes); // Rutas privadas, protegidas con JWT
 */

let lambdaProxy: any;
let bootstrapPromise: Promise<{app: any}> | null = null;

async function bootstrap() {
  const app = Fastify();

  // Configuración de CORS para permitir solicitudes desde cualquier origen.
  // Para producción, se recomienda restringir el origen.
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true,
  });

  // Interceptor de respuesta estándar
  app.addHook('onSend', responseInterceptor);
  // Filtro de errores estándar
  app.setErrorHandler(httpExceptionFilter);

  // Rutas públicas: no requieren autenticación.
  publicRoutes(app);

  // Rutas privadas: requieren autenticación JWT.
  app.register(privateRoutes);

  return {app};
}

function getBootstrapPromise() {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap();
  }
  return bootstrapPromise;
}

// Handler robusto para Lambda y local
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  if (!lambdaProxy) {
    // Espera a que la app esté lista y crea el adaptador solo una vez
    const {app} = await getBootstrapPromise();
    lambdaProxy = awsLambdaFastify(app);
  }
  return lambdaProxy(event, context);
};

// Ejecución local
if (require.main === module) {
  (async () => {
    const APP_PORT = parseInt(process.env.APP_PORT ?? '3000', 10);
    const {app} = await getBootstrapPromise();
    // Inicia el servidor Fastify en modo local
    // (no en modo Lambda)
    try {
      await app.ready();
      await app.listen({port: APP_PORT, host: '0.0.0.0'});
      console.log(`🚀 Images Service ready at http://localhost:${APP_PORT}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  })();
}

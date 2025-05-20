import Fastify from 'fastify';
import cors from '@fastify/cors';
import {publicRoutes} from './routes/public.route';
import {privateRoutes} from './routes/private.route';
import {responseInterceptor} from './common/hooks/response.interceptor';
import {httpExceptionFilter} from './common/filters/http-exception.filter';

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

  try {
    const APP_PORT = parseInt(process.env.APP_PORT ?? '3000', 10);
    await app.listen({port: APP_PORT, host: '0.0.0.0'});
    console.log(`🚀 Server ready at http://localhost:${APP_PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();

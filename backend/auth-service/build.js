const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['./lambda.ts'], // Cambia esto al archivo de entrada principal
    bundle: true,
    platform: 'node',
    target: 'node22', // Cambia según la versión de Node.js en AWS Lambda
    outfile: './dist/index.js', // Archivo de salida
    external: [
      'aws-sdk', // Excluir aws-sdk porque ya está disponible en Lambda
      'class-validator', // Excluir dependencias opcionales
      'class-transformer',
      '@nestjs/websockets',
      '@nestjs/microservices',
      '@nestjs/platform-fastify',
      '@fastify/view',
    ], // Excluye aws-sdk porque ya está disponible en Lambda
    minify: true,
    //sourcemap: true,
  })
  .then(() => {
    console.log('Build successful');
  })
  .catch(() => {
    process.exit(1);
  });

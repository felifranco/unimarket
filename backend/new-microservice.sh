#!/bin/bash
# This script creates a new NestJS microservice with the specified name and configurations.
# Usage: ./new-microservice.sh [nombre-del-microservicio] [nombre-de-la-base-de-datos]

# Check if the script is being run with the correct permissions
# chmod +x new-microservice.sh 

# Set the microservice name
MICROSERVICE_NAME=$1
# Set the database name
DATABASE_NAME=$2

# ---------------- CHECK INPUT ----------------

permissions=$(ls -l $0 | awk '{print $1}')
if [[ $permissions != *"x"* ]]; then
  echo -e "\n❌ Error: El script no tiene permisos de ejecución. Ejecuta 'chmod +x $0' para otorgar permisos."
  exit 1
fi
# Check if the Nest CLI is installed
if ! command -v nest &> /dev/null; then
  echo -e "\n❌ Error: Nest CLI no está instalado. Por favor, instala Nest CLI antes de continuar."
  exit 1
fi
# Check if the user is in the correct directory
if [[ "$(pwd)" != */backend ]]; then
echo -e "\n❌ Error: Debes ejecutar este script desde la carpeta 'backend'. Asegúrate de estar en la carpeta correcta ejecutando 'cd /ruta/a/backend' antes de ejecutar este script."
  exit 1
fi

# Check if the user provided a name for the microservice
if [ -z "$1" ]; then
  echo -e "\n❌ Error: No se proporcionó el nombre del microservicio."
  echo "Por favor, proporciona un nombre para el microservicio al ejecutar el script."
  echo "Ejemplo: ./new-microservice.sh nombre-del-microservicio nombre-de-la-base-de-datos"
  exit 1
fi
# Check if the user provided a database name
if [ -z "$2" ]; then
  echo -e "\n❌ Error: No se proporcionó el nombre de la base de datos."
  echo "Por favor, proporciona un nombre para la base de datos al ejecutar el script."
  echo "Ejemplo: ./new-microservice.sh nombre-del-microservicio nombre-de-la-base-de-datos"
  exit 1
fi

case $DATABASE_NAME in
  "mongodb")
    ;;
  "postgres")
    ;;
  *)
    echo -e "\n❌ Error: Base de datos no soportada. Usa 'mongodb' o 'postgres'."
    exit 1
    ;;
esac

# ---------------- PROJECT CREATION ----------------

echo -e "\n✅ Creando un nuevo microservicio NestJS llamado '$MICROSERVICE_NAME'..."
nest new --skip-git --package-manager npm $MICROSERVICE_NAME

echo -e "\n🔄 Cambiando al directorio del microservicio '$MICROSERVICE_NAME'..."
cd $MICROSERVICE_NAME

# Manejo de variables de entorno y configuración en NestJS
# @nestjs/config permite cargar y validar variables de entorno (.env) y exponerlas como providers en toda la app.
# Es la forma recomendada para manejar configuraciones seguras y desacopladas en microservicios NestJS.
echo -e "\n📦 Instalando dependencia @nestjs/config..."
npm install --save @nestjs/config

# Generación automática de documentación Swagger/OpenAPI para APIs NestJS
# @nestjs/swagger permite documentar y probar endpoints REST de forma interactiva.
# Útil para equipos grandes, integración frontend-backend y pruebas manuales.
echo -e "\n📦 Instalando dependencia @nestjs/swagger..."
npm install --save @nestjs/swagger

# Instalación de utilidades para microservicios y patrones de comunicación distribuidos en NestJS
# @nestjs/microservices permite crear microservicios y gateways (TCP, Redis, NATS, MQTT, etc.)
#npm install --save @nestjs/microservices

# ---------------- AUTH ----------------
# Instalación de dependencias para autenticación y autorización JWT y Passport
# @nestjs/jwt y @nestjs/passport integran JWT y Passport en NestJS para autenticación robusta.
# passport y passport-jwt son los middlewares base; bcryptjs para hash seguro de contraseñas.
echo -e "\n📦 Instalando dependencias: @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs"
npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs

# Instalación de tipos para desarrollo y validación de dependencias de autenticación
# @types/passport-jwt y @types/bcryptjs proveen tipado para TypeScript y mejor DX.
echo -e "\n📦 Instalando dependencias: @types/passport-jwt @types/bcryptjs"
npm install --save-dev @types/passport-jwt @types/bcryptjs

# ---------------- DATABASE ----------------

# Utilidades para transformar y mapear tipos DTO en NestJS
# @nestjs/mapped-types facilita la reutilización y extensión de DTOs (Data Transfer Objects).
echo -e "\n📦 Instalando dependencia @nestjs/mapped-types..."
npm install --save @nestjs/mapped-types

# Integración de TypeORM (ORM para bases de datos relacionales) con NestJS
# @nestjs/typeorm conecta TypeORM con el ciclo de vida y DI de NestJS.
echo -e "\n📦 Instalando dependencia @nestjs/typeorm..."
npm install --save @nestjs/typeorm

# Instalación de TypeORM (ORM para Node.js compatible con Postgres, MySQL, etc.)
# typeorm es la librería principal para modelado y acceso a datos relacionales.
echo -e "\n📦 Instalando dependencia typeorm..."
npm install --save typeorm

# Instalación de aws-lambda (SDK de AWS para Lambda)
# aws-sdk es el SDK principal para acceder a servicios de AWS desde Node.js.
# Permite interactuar con servicios de AWS desde funciones Lambda.
# Es útil para desplegar y gestionar microservicios en la nube.
# Se hace instalación en desarrollo porque este paquete se encuentra cargado en AWS Lambda.
echo -e "\n📦 Instalando dependencia aws-lambda..."
npm install --save-dev aws-lambda

# Instalación de aws-serverless-express (middleware para AWS Lambda)
# aws-serverless-express permite ejecutar aplicaciones Express en AWS Lambda.
# Facilita la integración de aplicaciones Node.js con el entorno serverless de AWS.
# Es útil para desplegar microservicios en AWS sin necesidad de reescribir el código.
# aws-serverless-express es un wrapper que adapta Express para Lambda.
# Permite manejar peticiones y respuestas de Lambda como si fueran middleware de Express.
# Esto es útil para mantener la misma lógica de negocio y estructura de código al migrar a un entorno serverless.
echo -e "\n📦 Instalando dependencia aws-serverless-express..."
npm install --save aws-serverless-express

# Instalación de serverless-offline (plugin para simular AWS Lambda localmente)
# serverless-offline permite ejecutar funciones Lambda localmente para pruebas rápidas.
# Es útil para desarrollo y depuración sin necesidad de desplegar en AWS.
# serverless es el framework principal para gestionar y desplegar aplicaciones serverless.
echo -e "\n📦 Instalando dependencia serverless-offline..."
npm install --save-dev serverless-offline


case $DATABASE_NAME in
  "mongodb")
    # Instalación de driver oficial de MongoDB para Node.js
    # mongodb permite conectar y operar con bases de datos MongoDB desde Node.js/NestJS.
    echo -e "\n📦 Instalando dependencias para MongoDB..."
    npm install --save mongodb
    ;;
  "postgres")
    # Instalación de drivers para PostgreSQL y utilidades de serialización
    # pg es el driver principal para PostgreSQL; pg-hstore para serializar/deserializar datos JSON.
    echo -e "\n📦 Instalando dependencias para PostgreSQL..."
    npm install --save pg pg-hstore
    ;;
  *)
    echo -e "\n❌ Error: Base de datos no soportada. Usa 'mongodb' o 'postgres'."
    exit 1
    ;;
esac

# ---------------- DIRECTORIES ----------------

echo -e "\n📁 Creando directorio de autenticación..."
mkdir -p src/auth/dto

# ---------------- COPY FILES ----------------

echo -e "\n📁 Copiando la carpeta config..."
cp -r ../assets/create-micro/$DATABASE_NAME/config src/config

echo -e "\n📁 Copiando archivos .env y app.module.ts..."
cp ../assets/create-micro/$DATABASE_NAME/.env .env
cp ../assets/create-micro/$DATABASE_NAME/app.module.ts src/app.module.ts

echo -e "\n📁 Copiando el archivo main.ts..."
cp ../assets/create-micro/main.ts src/main.ts

echo -e "\n📁 Copiando el archivo app.controller.ts..."
cp ../assets/create-micro/app.controller.ts src/app.controller.ts

echo -e "\n📁 Copiando la carpeta strategies..."
cp -r ../assets/create-micro/strategies src/strategies

echo -e "\n📁 Copiando la carpeta constants..."
cp -r ../assets/create-micro/constants src/constants

echo -e "\n📁 Copiando el archivo payload-auth.dto.ts..."
cp ../assets/create-micro/payload-auth.dto.ts src/auth/dto/payload-auth.dto.ts

echo -e "\n📁 Copiando la carpeta common..."
cp -r ../assets/create-micro/common src/common

echo -e "\n📁 Creando el archivo serverless.yml..."
echo "service: $MICROSERVICE_NAME

provider:
  name: aws
  runtime: nodejs22.x

functions:
  $MICROSERVICE_NAME:
    handler: dist/main.handler
    timeout: 30
    events:
      - http:
          path: /
          method: get

plugins:
  - serverless-offline
" > serverless.yml

# ---------------- SCRIPTS ----------------

echo -e "\n📝 Agregando scripts al package.json..."

npm pkg set scripts.install:dev="rm -rf node_modules && rm -rf package-lock.json && npm install"
npm pkg set scripts.install:prod="rm -rf node_modules && rm -rf package-lock.json && npm install --production --no-package-lock"
npm pkg set scripts.prepare:zip="npm run install:dev && npm run build && npm run install:prod"
npm pkg set scripts.make:zip="npm run prepare:zip && rm -f unimarket-$MICROSERVICE_NAME.zip && zip -r unimarket-$MICROSERVICE_NAME.zip dist node_modules package.json"
npm pkg set scripts.update:lambda="aws lambda update-function-code --function-name unimarket-$MICROSERVICE_NAME --zip-file fileb://unimarket-$MICROSERVICE_NAME.zip"
npm pkg set scripts.deploy:lambda="npm run make:zip && npm run update:lambda"
npm pkg set scripts.serverless:offline-debug="rm -rf dist && npm run build && npx serverless offline --debug"
npm pkg set scripts.serverless:offline="rm -rf dist && npm run build && npx serverless offline"
npm pkg set scripts.format:check="prettier --write \"src/**/*.ts\" \"test/**/*.ts\" --check"
npm pkg set scripts.lint="eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
npm pkg set scripts.lint:check="eslint \"{src,apps,libs,test}/**/*.ts\""

npm pkg set author="Feliciano Ernesto Franco Lux"

# ---------------- OTHER ----------------

# -> PRETTIER
echo -e "\n📦 Corregir formato con prettier..."
npm run format

# ---------------- NEXT STEPS ----------------

echo -e "\n✅ Microservicio '$MICROSERVICE_NAME' creado y listo para usar."

echo -e "\n🖐️ Antes de iniciar el servicio '$MICROSERVICE_NAME', asegúrate de:"
echo -e "\n\t📁 Ingresar a la carpeta '$MICROSERVICE_NAME' ejecutando 'cd $MICROSERVICE_NAME'."
echo -e "\n\t📦 Instalar las dependencias ejecutando 'npm install'."
echo -e "\n\t🔑 Configurar las credenciales de AWS en tu máquina local si necesitas desplegar el código en una Lambda."
echo -e "\n\t⚙️ Revisar el archivo .env y ajustar las variables de entorno según tus necesidades."
echo -e "\n\t📝 Cambiar el título y la descripción del servicio en el archivo src/main.ts"
echo -e "\n\t🚀 Iniciar el servicio ejecutando 'npm run start:dev' o 'serverless:offline' para una simulación Lambda."
echo -e "\n\t➕ Puedes agregar recursos NestJS ejecutando 'nest generate resource [nombre-del-recurso]'"
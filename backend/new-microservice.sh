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

echo -e "\n📦 Instalando dependencia @nestjs/config..."
npm install --save @nestjs/config

echo -e "\n📦 Instalando dependencia @nestjs/swagger..."
npm install --save @nestjs/swagger

# Install the @nestjs/microservices package
#npm install --save @nestjs/microservices

# ---------------- DATABASE ----------------

echo -e "\n📦 Instalando dependencia @nestjs/mapped-types..."
npm install --save @nestjs/mapped-types

echo -e "\n📦 Instalando dependencia @nestjs/typeorm..."
npm install --save @nestjs/typeorm

echo -e "\n📦 Instalando dependencia typeorm..."
npm install --save typeorm

echo -e "\n📁 Creando directorio de configuración..."
mkdir -p src/config

case $DATABASE_NAME in
  "mongodb")
    echo -e "\n📦 Instalando dependencias para MongoDB..."
    npm install --save mongodb
    ;;
  "postgres")
    echo -e "\n📦 Instalando dependencias para PostgreSQL..."
    npm install --save pg pg-hstore
    ;;
  *)
    echo -e "\n❌ Error: Base de datos no soportada. Usa 'mongodb' o 'postgres'."
    exit 1
    ;;
esac

# ---------------- COPY FILES ----------------

echo -e "\n📁 Copiando el archivo configurations.ts..."
cp ../assets/create-micro/$DATABASE_NAME/configurations.ts src/config/configurations.ts

echo -e "\n📁 Copiando archivos .env y app.module.ts..."
cp ../assets/create-micro/$DATABASE_NAME/.env .env
cp ../assets/create-micro/$DATABASE_NAME/app.module.ts src/app.module.ts

echo -e "\n📁 Copiando el archivo main.ts..."
cp ../assets/main.ts src/main.ts

echo -e "\n📁 Copiando el archivo app.controller.ts..."
cp ../assets/app.controller.ts src/app.controller.ts

# ---------------- OTHER ----------------

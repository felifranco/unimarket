#!/bin/bash
# This script creates a new NestJS microservice with the specified name and configurations.
# Usage: ./new-microservice.sh [nombre-del-microservicio]

# Check if the script is being run with the correct permissions
# chmod +x new-microservice.sh 

permissions=$(ls -l $0 | awk '{print $1}')
if [[ $permissions != *"x"* ]]; then
  echo "Error: El script no tiene permisos de ejecución. Ejecuta 'chmod +x $0' para otorgar permisos."
  exit 1
fi
# Check if the Nest CLI is installed
if ! command -v nest &> /dev/null; then
  echo "Error: Nest CLI no está instalado. Por favor, instala Nest CLI antes de continuar."
  exit 1
fi
# Check if the user is in the correct directory
if [[ "$(pwd)" != */backend ]]; then
echo "Error: Debes ejecutar este script desde la carpeta 'backend'. Asegúrate de estar en la carpeta correcta ejecutando 'cd /ruta/a/backend' antes de ejecutar este script."
  exit 1
fi

# Check if the user provided a name for the microservice
if [ -z "$1" ]; then
  echo "Error: No se proporcionó el nombre del microservicio."
  echo "Por favor, proporciona un nombre para el microservicio al ejecutar el script."
  echo "Ejemplo: ./new-microservice.sh nombre-del-microservicio"
  exit 1
fi
# Set the microservice name
MICROSERVICE_NAME=$1
# Create a new NestJS microservice using the Nest CLI
nest new --skip-git --package-manager npm $MICROSERVICE_NAME
# Change to the microservice directory
cd $MICROSERVICE_NAME
# Create a .env file with the APP_PORT variable
echo "APP_PORT=3000" > .env
# Install the @nestjs/config package
npm install --save @nestjs/config
# Install the @nestjs/swagger package
npm install --save @nestjs/swagger

# Install the @nestjs/microservices package
#npm install --save @nestjs/microservices
# Install the @nestjs/typeorm package
#npm install --save @nestjs/typeorm
# Install the typeorm package
#npm install --save typeorm
# Install the mysql2 package
#npm install --save mysql2

# Create the config directory and copy the configurations file
mkdir -p src/config
cp ../assets/configurations.ts src/config/configurations.ts
# Copy the app.module.ts and main.ts files to the microservice
cp ../assets/app.module.ts src/app.module.ts
cp ../assets/main.ts src/main.ts


#nest new --skip-git --package-manager npm [nombre-del-microservicio]
#cd [nombre-del-microservicio]
#echo "APP_PORT=3000" > .env
#npm i --save @nestjs/config
#mkdir -p src/config
#cp ../assets/configurations.ts src/config/configurations.ts
#cp ../assets/app.module.ts src/app.module.ts
#cp ../assets/main.ts src/main.ts
#npm install --save @nestjs/swagger
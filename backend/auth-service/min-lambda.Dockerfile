# Imagen base para Node.js en AWS Lambda
FROM public.ecr.aws/lambda/nodejs:22

# Crear directorio de trabajo
WORKDIR /var/task

# Copiar dependencias y código fuente
COPY package.json ./
#RUN npm install --production
RUN npm install

COPY ./dist ./

# Comando de entrada para AWS Lambda
CMD [ "index.handler" ]

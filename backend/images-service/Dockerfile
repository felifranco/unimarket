FROM node:22.15.0-alpine3.20
LABEL maintainer="Feliciano Franco"
LABEL email="f64franco@gmail.com"
LABEL description="Imagen para el servicio de imágenes de la arquitectura de microservicios"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

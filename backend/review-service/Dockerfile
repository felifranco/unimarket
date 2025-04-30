FROM node:22.15.0-alpine3.20
LABEL maintainer="Feliciano Franco"
LABEL email="f64franco@gmail.com"
LABEL description="Gestiona puntuaciones y comentarios sobre usuarios y productos"
EXPOSE 3000
WORKDIR /app
COPY ./dist ./
COPY ./package.json ./
RUN npm install
CMD ["node", "main.js"]
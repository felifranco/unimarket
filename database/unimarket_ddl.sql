CREATE TABLE public.usuario (
	id_usuario SERIAL PRIMARY KEY,
	uuid varchar(36) UNIQUE,
	nombre_completo varchar(100) NOT NULL,
	correo varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
	imagen_portada varchar(255),
	imagen_perfil varchar(255),
	acerca_de varchar(300),
	ubicacion varchar(150),
	telefono varchar(20),
	estrellas integer DEFAULT 0,
	calificacion integer DEFAULT 0,
	password_hash varchar(255) NOT NULL,
	rol varchar(100),
	estado varchar(50),
	refresh_token varchar(500),
	fecha_creacion timestamptz NULL,
	fecha_modificacion timestamptz NULL
);

CREATE TABLE public.publicacion (
	id_publicacion SERIAL PRIMARY KEY,
	publicacion_uuid varchar(36) UNIQUE,
	id_usuario INTEGER NOT NULL REFERENCES public.usuario(id_usuario) ON DELETE CASCADE,
	tipo_publicacion varchar NULL,
	titulo varchar NOT NULL,
	descripcion_general varchar NOT NULL,
	sku varchar NULL,
	categorias varchar(255),
	ubicacion varchar NULL,
	estado varchar NULL,
	estrellas numeric NULL,
	calificacion numeric NULL,
	vendidos numeric NULL DEFAULT 0,
	existencias numeric NULL,
	descripcion_producto varchar NULL,
	simbolo_moneda varchar NULL,
	precio_anterior numeric(10,2) DEFAULT 0,
	precio numeric(10,2) NOT NULL,
	insignia varchar NULL,
	imagenes varchar NULL,
	imagen_portada varchar NULL,
	fecha_creacion timestamptz NULL,
	fecha_modificacion timestamptz NULL
);

CREATE TABLE public.comentario (
	id_comentario SERIAL PRIMARY KEY,
	id_usuario INTEGER NOT NULL REFERENCES public.usuario(id_usuario) ON DELETE CASCADE,
	id_publicacion INTEGER NOT NULL REFERENCES public.publicacion(id_publicacion) ON DELETE CASCADE,
	id_comentario_respuesta INTEGER NULL,
	titulo varchar NOT NULL,
	contenido varchar NOT NULL,
	estrellas numeric NULL,
	likes numeric NULL,
	estado varchar NULL,
	fecha_creacion timestamptz NULL,
	fecha_modificacion timestamptz NULL
);

CREATE TABLE public.valoracion (
	id_valoracion SERIAL PRIMARY KEY,
	id_usuario INTEGER NOT NULL REFERENCES public.usuario(id_usuario) ON DELETE CASCADE,
	id_publicacion INTEGER NOT NULL REFERENCES public.publicacion(id_publicacion) ON DELETE CASCADE,
	puntuacion numeric NOT NULL,
	comentario varchar NULL,
	estado varchar NULL,
	fecha_creacion timestamptz NULL,
	fecha_modificacion timestamptz NULL
);

CREATE TABLE conversacion (
  id_conversacion SERIAL PRIMARY KEY,
  remitente VARCHAR NOT NULL,
  destinatario VARCHAR NOT NULL,
  remitente_borrado BOOLEAN DEFAULT FALSE,
  destinatario_borrado BOOLEAN DEFAULT FALSE,
  imagen_perfil_remitente VARCHAR(255),
  imagen_perfil_destinatario VARCHAR(255),
  nombre_remitente VARCHAR(100),
  nombre_destinatario VARCHAR(100),
  fecha_creacion timestamptz DEFAULT NOW(),
  fecha_modificacion timestamptz DEFAULT NOW()
);

CREATE TABLE mensaje (
  id_mensaje SERIAL PRIMARY KEY,
  id_conversacion INTEGER NOT NULL REFERENCES conversacion(id_conversacion) ON DELETE CASCADE,
  remitente VARCHAR NOT NULL,
  tipo VARCHAR NOT NULL,
  mensaje TEXT NOT NULL,
  adjunto_url VARCHAR(255) NULL,
  adjunto_nombre VARCHAR(255) NULL,
  adjunto_tipo VARCHAR(100) NULL,
  adjunto_tamano INTEGER NULL,
  leido_remitente BOOLEAN DEFAULT FALSE,
  leido_destinatario BOOLEAN DEFAULT FALSE,
  fecha_envio timestamptz DEFAULT NOW(),
  fecha_modificacion timestamptz DEFAULT NOW()
);

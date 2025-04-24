
CREATE TABLE public.usuario (
	id_usuario bigserial NOT NULL PRIMARY KEY,
	nombre_completo varchar NOT NULL,
	correo varchar NOT NULL,
	username varchar NOT NULL,
	password_hash varchar NOT NULL,
	rol varchar NULL,
	estado varchar NULL,
	fecha_creacion timestamp NULL,
	fecha_modificacion timestamp NULL
);

CREATE TABLE public.publicacion (
	id_publicacion bigserial NOT NULL PRIMARY KEY,
	id_usuario int NOT NULL,
	tipo varchar NULL,
	titulo varchar NOT NULL,
	descripcion varchar NOT NULL,
	ubicacion varchar NULL,
	estado varchar NULL,
	estrellas numeric NULL,
	calificacion numeric NULL,
	vendidos numeric NULL,
	existencias numeric NULL,
	simbolo_moneda varchar NULL,
	precio_anterior numeric NULL,
	precio numeric NULL,
	insignia varchar NULL,
	imagenes varchar NULL,
	imagen_portada varchar NULL,
	fecha_creacion timestamp NULL,
	fecha_modificacion timestamp NULL,
	CONSTRAINT publicacion_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE public.comentario (
	id_comentario int NOT NULL,
	id_usuario int NOT NULL,
	id_publicacion int NOT NULL,
	contenido varchar NOT NULL,
	estado varchar NULL,
	fecha_creacion timestamp NULL,
	fecha_modificacion timestamp NULL,
	CONSTRAINT comentario_pk PRIMARY KEY (id_comentario),
	CONSTRAINT comentario_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT,
	CONSTRAINT comentario_publicacion_fk FOREIGN KEY (id_publicacion) REFERENCES public.publicacion(id_publicacion) ON DELETE RESTRICT
);

CREATE TABLE public.valoracion (
	id_valoracion int NOT NULL,
	id_usuario int NOT NULL,
	id_publicacion int NOT NULL,
	puntuacion numeric NOT NULL,
	comentario varchar NULL,
	estado varchar NULL,
	fecha_creacion timestamp NULL,
	fecha_modificacion timestamp NULL,
	CONSTRAINT valoracion_pk PRIMARY KEY (id_valoracion),
	CONSTRAINT valoracion_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT,
	CONSTRAINT valoracion_publicacion_fk FOREIGN KEY (id_publicacion) REFERENCES public.publicacion(id_publicacion) ON DELETE RESTRICT
);
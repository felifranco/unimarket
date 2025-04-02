
CREATE TABLE public.usuario (
	id_usuario int NOT NULL,
	nombre_completo varchar NOT NULL,
	correo varchar NULL,
	username varchar NOT NULL,
	password_hash varchar NULL,
	rol varchar NULL,
	fecha_registro date NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);

CREATE TABLE public.publicacion (
	id_publicacion int NOT NULL,
	id_usuario int NOT NULL,
	tipo varchar NULL,
	titulo varchar NULL,
	descripcion varchar NOT NULL,
	precio float4 NULL,
	ubicacion varchar NULL,
	fecha_registro date NULL,
	CONSTRAINT publicacion_pk PRIMARY KEY (id_publicacion),
	CONSTRAINT publicacion_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE public.comentario (
	id_comentario int NOT NULL,
	id_usuario int NOT NULL,
	id_publicacion int NOT NULL,
	contenido varchar NOT NULL,
	fecha_registro date NULL,
	CONSTRAINT comentario_pk PRIMARY KEY (id_comentario),
	CONSTRAINT comentario_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT,
	CONSTRAINT comentario_publicacion_fk FOREIGN KEY (id_publicacion) REFERENCES public.publicacion(id_publicacion) ON DELETE RESTRICT
);

CREATE TABLE public.valoracion (
	id_valoracion int NOT NULL,
	id_usuario int NOT NULL,
	id_publicacion int NOT NULL,
	puntuacion int NOT NULL,
	comentario varchar NULL,
	fecha_registro date NULL,
	CONSTRAINT valoracion_pk PRIMARY KEY (id_valoracion),
	CONSTRAINT valoracion_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE RESTRICT,
	CONSTRAINT valoracion_publicacion_fk FOREIGN KEY (id_publicacion) REFERENCES public.publicacion(id_publicacion) ON DELETE RESTRICT
);
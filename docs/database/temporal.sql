CREATE TABLE practica1.temporal (
	id int NOT NULL,
	"text" varchar NULL,
	flag bool NULL,
	CONSTRAINT temporal_pk PRIMARY KEY (id)
);
COMMENT ON TABLE practica1.temporal IS 'Tabla de prueba';
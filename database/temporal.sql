CREATE TABLE temporal (
	id int NOT NULL,
	"text" varchar NULL,
	flag bool NULL,
	CONSTRAINT temporal_pk PRIMARY KEY (id)
);
COMMENT ON TABLE temporal IS 'Tabla de prueba';
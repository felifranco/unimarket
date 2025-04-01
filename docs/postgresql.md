# PostgreSQL

> PostgreSQL, comúnmente pronunciado "Post-GRES", es una base de datos de código abierto que goza de una sólida reputación por su fiabilidad, flexibilidad y compatibilidad con estándares técnicos abiertos. A diferencia de otros RDMBS (sistemas de gestión de bases de datos relacionales), PostgreSQL (enlace externo) admite tanto tipos de datos no relacionales como relacionales. Esto la convierte en una de las bases de datos relacionales más compatibles, estables y maduras disponibles en la actualidad. - [IBM](https://www.ibm.com/es-es/topics/postgresql)

## 📌 Docker

PostgreSQL se puede levantar sin necesidad de instalarlo en el equipo anfitrión. `Docker` es un paquete de software que incluye todo lo necesario para ejecutar la aplicación a través de un contenedor, en él se puede ejecutar la base de datos de manera fácil e independiente.

### 🔶 Contenedor PostgreSQL

Descargar la imagen más actualizada de PostgreSQL

```shell
docker pull postgres
```

Crear el volúmen que almacenará los datos del contenedor

```shell
docker volume create postgres-data
```

Ver detalles del volúmen

```shell
docker volume inspect postgres-data
```

Crear el contenedor de la base de datos

```shell
docker run -d --name local_postgres -e POSTGRES_PASSWORD=pass123 -e PGDATA=/var/lib/postgresql/data/pgdata -v postgres-data:/var/lib/postgresql/data postgres
```

### 🔶 Conectar con un cliente de base de datos

Un cliente de base de datos es una aplicación que permite la comunicación entre un usuario y un sistema de administración de bases de datos. Para seguir en un ecosistema Open Source se utilizará el software [DBeaver](https://dbeaver.io/) en su versión `Community`.

Para conectar el cliente `DBeaver` a la base de datos se necesita como mínimo:

- Host
- Port
- User
- Password

#### IP del contenedor

La IP del contenedor se puede obtener con el siguiente comando

```shell
docker inspect -f "{{ .NetworkSettings.IPAddress }}" local_postgres
```

#### Credenciales

Según la [documentación](https://hub.docker.com/_/postgres) de la imagen de Docker, el password es requerido para la creación del contenedor por lo que el parámetro `POSTGRES_PASSWORD` es enviado en el comando anterior, y el _superusuario_ predeterminado es **postgres** si no es modificado con el parámetro `POSTGRES_USER`.

```json
user: "postgres"
password: "pass123"
```

#### Cadena de conexión

```
jdbc:postgresql://172.17.0.2:5432/postgres
```

## 📌 Base de datos

Una vez creada la conexión entre el cliente y la base de datos, se pueden crear bases de datos, esquemas, tablas y demás.

### 🔶 Tabla de prueba

Se utilizará una tabla temporal para probar conexión y gestión de datos desde los microservicios, para eso crearemos una tabla con nombre `temporal` que tendrá algunas columnas. La definición completa de la tabla se encuentra en el archivo [database/temporal.sql](database/temporal.sql).

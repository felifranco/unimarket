# 📚 UniMarket - Plataforma de Intercambio Académico

## 📌 Descripción

**UniMarket** es una plataforma open source diseñada para facilitar el **intercambio, compra, alquiler y donación de recursos académicos** entre estudiantes universitarios. Basado en los principios de la **economía colaborativa**, este sistema permite a los estudiantes acceder a libros, apuntes, dispositivos electrónicos y otros materiales sin las barreras económicas tradicionales.

La plataforma ofrece una experiencia optimizada con una **arquitectura moderna y escalable**, integrando tecnologías como **ReactJS, NestJS, PostgreSQL y MongoDB**, asegurando alta disponibilidad, seguridad y facilidad de uso.

## 🚀 Características Principales

✔ **Registro y Autenticación** mediante OAuth y JWT.  
✔ **Gestión de Publicaciones** con opciones para compra, alquiler, intercambio y donación.  
✔ **Búsqueda Avanzada y Filtros** para encontrar los recursos ideales de manera eficiente.  
✔ **Sistema de Mensajería** para facilitar la comunicación entre estudiantes.  
✔ **Sistema de Valoración y Comentarios** para garantizar la confianza en las transacciones.  
✔ **Panel de Administración** con herramientas de moderación y gestión de usuarios.  
✔ **Arquitectura Escalable** con microservicios y despliegue en la nube.  
✔ **Código Abierto y Modular** bajo Apache-2.0 license para fomentar la colaboración.

## 📂 Estructura del Repositorio

```
/UniMarket
│── frontend/         # Aplicación web en ReactJS
│── backend/          # API desarrollada en NestJS
│── database/         # Modelos y scripts de base de datos (PostgreSQL y MongoDB)
│── docs/             # Documentación del proyecto (Guías, API Docs, Arquitectura)
│── infrastructure/   # Configuración para despliegue con Docker y Kubernetes
│── tests/            # Pruebas unitarias y de integración
│── LICENSE           # Licencia Open Source
│── README.md         # Documentación principal
```

## 🛠️ Tecnologías Utilizadas

| Componente          | Tecnología                 |
| ------------------- | -------------------------- |
| **Frontend**        | ReactJS, TailwindCSS, Vite |
| **Backend**         | NestJS, GraphQL, REST API  |
| **Base de Datos**   | PostgreSQL, MongoDB        |
| **Autenticación**   | OAuth 2.0, JWT             |
| **Infraestructura** | Docker, Kubernetes         |
| **Pruebas**         | Jest, Cypress              |

## 🏗️ Instalación y Configuración

### 📌 **Requisitos Previos**

Antes de iniciar, asegúrate de tener instalado:

- **Node.js** (versión 22+)
- **Docker** y **Docker Compose**
- **PostgreSQL** y **MongoDB**

### 🚀 **Instrucciones de Instalación**

1️⃣ **Clonar el Repositorio**

```sh
git clone https://github.com/felifranco/unimarket.git
cd UniMarket
```

2️⃣ **Configurar Variables de Entorno**

```sh
cp .env.example .env
```

📌 Edita el archivo `.env` con los valores de conexión de la base de datos y credenciales.

3️⃣ **Iniciar los Servicios con Docker**

```sh
docker-compose up -d
```

4️⃣ **Iniciar el Backend**

```sh
cd backend
npm install
npm run start
```

5️⃣ **Iniciar el Frontend**

```sh
cd frontend
npm install
npm run dev
```

✅ La plataforma estará disponible en `http://localhost:3000` 🚀

## 🔍 Contribuir al Proyecto

¡Las contribuciones son bienvenidas! 🎉 Sigue estos pasos:

1️⃣ **Haz un Fork** del repositorio.  
2️⃣ **Crea una Rama** (`feature/nueva-funcionalidad`).  
3️⃣ **Haz un Commit** (`git commit -m "Agregada nueva funcionalidad"`).  
4️⃣ **Envía un Pull Request**.

Se revisan activamente PRs para mantener la calidad del código y fomentar la colaboración.

## 📜 Licencia

Este proyecto está licenciado bajo la licencia **Apache-2.0 license**. Puedes usarlo, modificarlo y distribuirlo libremente.

## 📞 Contacto y Soporte

Si tienes preguntas o sugerencias, puedes crear un **Issue** o contactarnos en:

📧 **Correo:** f64franco@gmail.com

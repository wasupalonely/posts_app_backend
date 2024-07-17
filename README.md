# PostApp Backend

PostApp es una plataforma backend para soportar la aplicación web de compartir publicaciones y chatear con amigos.

## Descripción

PostApp proporciona la infraestructura necesaria para la aplicación web de PostApp, permitiendo a los usuarios registrarse, autenticarse, compartir publicaciones y chatear en tiempo real. Está construido con Node.js y Express, y utiliza MongoDB como base de datos para almacenar usuarios y publicaciones.

## Características

- **Autenticación:** Sistema de registro y login de usuarios utilizando JWT (JSON Web Tokens).
- **Gestión de Usuarios:** Creación, lectura, actualización y eliminación (CRUD) de usuarios.
- **Publicaciones:** CRUD de publicaciones con soporte para imágenes utilizando Cloudinary para almacenamiento y procesamiento de imágenes.
- **Chat en Tiempo Real:** Comunicación en tiempo real entre usuarios utilizando Socket.io.
- **Seguridad:** Uso de bcrypt para el hash de contraseñas y validación de solicitudes mediante middleware de CORS y helmet.

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript en el servidor.
- **Express:** Framework web para Node.js.
- **MongoDB:** Base de datos NoSQL para almacenar datos de usuarios y publicaciones.
- **Mongoose:** Librería para modelar datos de MongoDB en Node.js.
- **JWT (JSON Web Tokens):** Para la autenticación segura de usuarios.
- **bcrypt:** Para el hash de contraseñas.
- **Socket.io:** Biblioteca para comunicación en tiempo real.
- **Cloudinary:** Servicio para almacenamiento y manipulación de imágenes en la nube.
- **Swagger UI Express:** Para documentación y visualización de API.

## Configuración

1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en un archivo `.env` basado en `.env.example`.
4. Inicia el servidor de desarrollo con `npm run dev`.

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo con `nodemon` y `tsc` para reiniciar automáticamente con cambios.
- `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
- `npm start`: Inicia el servidor en producción desde la carpeta `dist`.
- `npm run lint`: Ejecuta ESLint para verificar el estilo del código.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, haz un fork del repositorio y envía un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Integrantes
- Santiago Jara Hernandez
- Santiago Andrés Ordoñez Puentes
- Juan Diego Macías Vargas

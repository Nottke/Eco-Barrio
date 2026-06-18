# Eco-Barrio

## Plataforma de Participación Ambiental Comunal para Santo Domingo

Eco-Barrio es una aplicación web responsiva orientada a fortalecer la participación ciudadana y la gestión de información ambiental en la comuna de Santo Domingo, Chile.

La plataforma permite que la comunidad consulte información ambiental, participe en actividades comunales, reporte incidencias, localice puntos de reciclaje y revise indicadores generados a partir de los datos registrados en el sistema.

También incorpora un panel administrativo para gestionar reportes ciudadanos, noticias, eventos, puntos de reciclaje e indicadores ambientales.

El proyecto fue desarrollado para la asignatura **Ingeniería Web y Móvil** de la **Pontificia Universidad Católica de Valparaíso**, utilizando una arquitectura Full Stack desacoplada mediante una API REST.

---

## 1. Objetivo del proyecto

Eco-Barrio busca centralizar distintos mecanismos de participación e información ambiental en una plataforma accesible, simple y adaptable a dispositivos móviles y de escritorio.

La solución está dirigida principalmente a habitantes de Santo Domingo que necesitan:

- Acceder a información ambiental comunal.
- Conocer actividades e iniciativas ecológicas.
- Reportar problemas observados en su entorno.
- Consultar puntos de reciclaje.
- Visualizar información resumida sobre la actividad del sistema.
- Configurar preferencias de notificación en su dispositivo.

Para la administración comunal, Eco-Barrio proporciona herramientas que permiten publicar contenido, revisar reportes ciudadanos y mantener actualizada la información ambiental disponible.

---

## 2. Problema abordado

La comuna de Santo Domingo presenta características que dificultan la participación ciudadana digital:

- Una proporción importante del territorio corresponde a sectores rurales.
- Existen localidades geográficamente dispersas.
- La conectividad puede variar entre distintos sectores.
- Los niveles de alfabetización digital no son uniformes.
- La información ambiental se distribuye mediante diferentes canales.
- No existe una plataforma única para informar, participar, reportar y consultar resultados.

Eco-Barrio busca complementar los canales municipales existentes mediante una solución digital centralizada, responsiva y orientada a una experiencia de uso simple.

---

## 3. Ciclo de participación ambiental

```text
Informar
   ↓
Noticias y comunicaciones ambientales

Participar
   ↓
Eventos y actividades ecológicas

Actuar
   ↓
Puntos de reciclaje e iniciativas comunitarias

Reportar
   ↓
Incidencias ambientales observadas por la ciudadanía

Gestionar
   ↓
Validación, seguimiento y resolución administrativa

Medir
   ↓
Indicadores ambientales y estadísticas del sistema
```

---

## 4. Integrante

- **Sebastián Orellana Reyes**

**Asignatura:** Ingeniería Web y Móvil  
**Institución:** Pontificia Universidad Católica de Valparaíso

---

## 5. Estado del proyecto

### EP1 — Definición y diseño

- Levantamiento del contexto y problema.
- Definición de requerimientos funcionales y no funcionales.
- Identificación de roles.
- Diseño de arquitectura de navegación.
- Creación inicial del proyecto Ionic.
- Documentación inicial del proyecto.

### EP2 — Backend y consumo de API

- Servidor backend con Node.js y Express.
- API REST modular.
- Persistencia mediante Prisma ORM.
- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Autorización mediante roles.
- CRUD de reportes, noticias, eventos, reciclaje e indicadores.
- Integración inicial entre frontend y backend.

### Entrega Final

- Migración de la base de datos a PostgreSQL.
- Dockerización de frontend, backend y base de datos.
- Orquestación mediante Docker Compose.
- Mejoras generales de UI/UX.
- Panel ciudadano y panel administrativo responsivos.
- Integración de mapas mediante Leaflet y OpenStreetMap.
- Indicadores automáticos calculados desde datos reales.
- Validaciones adicionales en frontend y backend.
- Persistencia local de preferencias de notificación.
- Reorganización visual de formularios, tarjetas y navegación.
- Secciones activas identificables en los menús.
- Consumo real de noticias, eventos, reciclaje e indicadores desde la API.

---

## 6. Funcionalidades implementadas

### 6.1 Autenticación

- Registro de nuevos usuarios.
- Inicio de sesión.
- Contraseñas almacenadas mediante hash.
- Generación y validación de tokens JWT.
- Persistencia de sesión en el frontend.
- Redirección según autenticación y rol.
- Cierre de sesión.

### 6.2 Usuario ciudadano

El usuario ciudadano puede:

- Consultar noticias comunales.
- Revisar eventos ecológicos.
- Crear reportes ambientales.
- Indicar ubicación y descripción del problema.
- Adjuntar opcionalmente una URL de imagen.
- Consultar puntos de reciclaje.
- Revisar puntos de reciclaje en un mapa interactivo.
- Visualizar indicadores automáticos del sistema.
- Consultar indicadores ambientales publicados por la administración.
- Configurar preferencias de notificación almacenadas localmente.
- Utilizar la aplicación desde dispositivos móviles y de escritorio.

### 6.3 Administrador

El administrador puede:

- Revisar reportes ciudadanos.
- Aprobar reportes.
- Rechazar reportes.
- Marcar reportes como resueltos.
- Eliminar reportes.
- Crear, editar y eliminar noticias.
- Crear, editar y eliminar eventos.
- Crear, editar y eliminar puntos de reciclaje.
- Registrar coordenadas geográficas.
- Crear, editar y eliminar indicadores manuales.
- Consultar indicadores calculados automáticamente.
- Acceder a un panel administrativo diferenciado.

---

## 7. Flujo de estados de reportes

```text
PENDING
├── APPROVED
│   └── RESOLVED
└── REJECTED
```

- **Pendiente:** el reporte fue enviado y todavía no ha sido revisado.
- **Aprobado:** la administración validó que el reporte es pertinente.
- **Resuelto:** la incidencia fue atendida y se considera finalizada.
- **Rechazado:** el reporte fue descartado por no corresponder, estar incompleto, ser duplicado o no poder validarse.

La separación entre **Aprobado** y **Resuelto** permite distinguir entre una incidencia aceptada para gestión y una incidencia efectivamente solucionada.

---

## 8. Indicadores automáticos

Eco-Barrio genera indicadores utilizando información real de la base de datos.

Actualmente se calculan:

- Total de reportes ciudadanos.
- Reportes pendientes.
- Reportes aprobados.
- Reportes rechazados.
- Reportes resueltos.
- Noticias publicadas.
- Eventos próximos.
- Puntos de reciclaje registrados.

También es posible publicar indicadores ambientales manuales mediante el panel de administración.

---

## 9. Mapas y geolocalización

Los puntos de reciclaje se presentan mediante un mapa interactivo construido con:

- **Leaflet**
- **React Leaflet**
- **OpenStreetMap**

Cada punto puede contener:

- Nombre.
- Dirección.
- Latitud.
- Longitud.
- Descripción.
- Horarios o información adicional.

La plataforma valida que la latitud y longitud sean numéricas, estén dentro de rangos geográficos válidos y se ingresen en conjunto.

---

## 10. Notificaciones

La vista de notificaciones permite seleccionar preferencias relacionadas con:

- Campañas y ferias cercanas.
- Nuevos eventos ecológicos.
- Rutas de reciclaje móvil.

Estas preferencias se almacenan mediante `localStorage` en el navegador del usuario.

> La versión actual no implementa notificaciones push reales ni integración con Firebase Cloud Messaging. La funcionalidad corresponde a persistencia local de preferencias.

---

## 11. Tecnologías utilizadas

### Frontend

- Ionic Framework
- React
- TypeScript
- React Router
- Axios
- Leaflet
- React Leaflet
- OpenStreetMap
- Capacitor
- Local Storage

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Token
- bcrypt
- CORS
- dotenv

### Infraestructura

- Docker
- Docker Compose
- Nginx
- Volumen persistente para PostgreSQL

### Desarrollo y pruebas

- Visual Studio Code
- Git
- GitHub
- Postman
- Insomnia
- Cypress
- Herramientas de desarrollo responsivo del navegador

---

## 12. Arquitectura general

```text
┌──────────────────────────────┐
│ Frontend                     │
│ Ionic + React + TypeScript   │
│ Puerto externo: 8080         │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│ Backend                      │
│ Node.js + Express            │
│ API REST                     │
│ Puerto externo: 3000         │
└──────────────┬───────────────┘
               │ Prisma ORM
               ▼
┌──────────────────────────────┐
│ Base de datos                │
│ PostgreSQL                   │
│ Puerto externo: 5432         │
└──────────────────────────────┘
```

---

## 13. Estructura general del repositorio

```text
eco-barrio/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── prisma.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── prisma.config.ts
│   ├── package.json
│   └── package-lock.json
│
├── cypress/
├── public/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── indicators/
│   │   ├── news/
│   │   ├── notifications/
│   │   ├── recycling/
│   │   └── reports/
│   ├── layouts/
│   ├── services/
│   └── theme/
│
├── compose.yaml
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
└── README.md
```

---

## 14. Modelos principales

### User

- `id`
- `name`
- `email`
- `password`
- `role`
- `createdAt`

Roles disponibles:

- `USER`
- `ADMIN`

### Report

- `id`
- `title`
- `description`
- `location`
- `status`
- `imageUrl`
- `createdAt`
- `userId`

### News

- `id`
- `title`
- `content`
- `imageUrl`
- `createdAt`

### Event

- `id`
- `title`
- `description`
- `location`
- `date`
- `createdAt`

### RecyclingPoint

- `id`
- `name`
- `address`
- `latitude`
- `longitude`
- `description`
- `createdAt`

### Indicator

- `id`
- `name`
- `value`
- `unit`
- `createdAt`

---

## 15. API REST

La URL base local del backend es:

```text
http://localhost:3000/api
```

### Autenticación

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/auth/register` | Público | Registra un usuario |
| POST | `/auth/login` | Público | Inicia sesión |
| GET | `/auth/profile` | Autenticado | Obtiene el perfil actual |

### Reportes

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| POST | `/reports` | Usuario autenticado | Crea un reporte |
| GET | `/reports` | Administrador | Lista los reportes |
| GET | `/reports/:id` | Autenticado | Obtiene un reporte |
| PUT | `/reports/:id/status` | Administrador | Actualiza su estado |
| DELETE | `/reports/:id` | Administrador | Elimina un reporte |

### Noticias

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/news` | Público | Lista las noticias |
| GET | `/news/:id` | Público | Obtiene una noticia |
| POST | `/news` | Administrador | Crea una noticia |
| PUT | `/news/:id` | Administrador | Actualiza una noticia |
| DELETE | `/news/:id` | Administrador | Elimina una noticia |

### Eventos

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/events` | Público | Lista los eventos |
| GET | `/events/:id` | Público | Obtiene un evento |
| POST | `/events` | Administrador | Crea un evento |
| PUT | `/events/:id` | Administrador | Actualiza un evento |
| DELETE | `/events/:id` | Administrador | Elimina un evento |

### Puntos de reciclaje

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/recycling-points` | Público | Lista los puntos |
| GET | `/recycling-points/:id` | Público | Obtiene un punto |
| POST | `/recycling-points` | Administrador | Crea un punto |
| PUT | `/recycling-points/:id` | Administrador | Actualiza un punto |
| DELETE | `/recycling-points/:id` | Administrador | Elimina un punto |

### Indicadores

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/indicators` | Público | Lista indicadores manuales |
| GET | `/indicators/automatic` | Público | Obtiene indicadores automáticos |
| GET | `/indicators/:id` | Público | Obtiene un indicador |
| POST | `/indicators` | Administrador | Crea un indicador |
| PUT | `/indicators/:id` | Administrador | Actualiza un indicador |
| DELETE | `/indicators/:id` | Administrador | Elimina un indicador |

---

## 16. Seguridad

La aplicación incorpora:

- Contraseñas procesadas con bcrypt.
- Autenticación mediante JWT.
- Middleware de autenticación.
- Middleware de autorización por rol.
- Rutas administrativas restringidas a usuarios `ADMIN`.
- Validación de datos en frontend y backend.
- Validación de coordenadas geográficas.
- Límites de longitud en formularios.
- Configuración de CORS.
- Variables sensibles administradas mediante archivos de entorno.
- Consultas gestionadas mediante Prisma ORM.

Los archivos `.env` no deben almacenarse en el repositorio.

---

## 17. Variables de entorno

### Backend

Crear:

```text
backend/.env
```

Ejemplo:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASENA@postgres:5432/NOMBRE_BASE_DATOS?schema=public"
JWT_SECRET="reemplazar_por_un_secreto_seguro"
PORT=3000
```

### Frontend

La URL base de la API se configura actualmente en:

```text
src/services/api.ts

Configuracion utilizada:

```text
const api = axios.create({ baseURL: "http://localhost:3000/api", });

---

## 18. Ejecución recomendada con Docker

### Requisitos

- Git
- Docker Desktop
- Docker Compose

### 18.1 Clonar el repositorio

```bash
git clone https://github.com/Nottke/Eco-Barrio.git
cd Eco-Barrio
```

### 18.2 Configurar variables de entorno

Crear los archivos de entorno requeridos según la configuración de `compose.yaml`.

### 18.3 Construir y levantar el sistema

```bash
docker compose up --build -d
```

### 18.4 Verificar servicios

```bash
docker compose ps
```

Servicios esperados:

```text
frontend
backend
postgres
```

### 18.5 Acceso local

Frontend:

```text
http://localhost:8080
```

Backend:

```text
http://localhost:3000/api
```

PostgreSQL:

```text
localhost:5432
```

### 18.6 Registros

```bash
docker compose logs
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

### 18.7 Detener contenedores

```bash
docker compose down
```

Para conservar los datos, no utilizar `-v`.

---

## 19. Prisma y migraciones

Generar cliente:

```bash
docker compose exec backend npx prisma generate
```

Aplicar migraciones existentes:

```bash
docker compose exec backend npx prisma migrate deploy
```

Consultar estado:

```bash
docker compose exec backend npx prisma migrate status
```

Crear una migración durante desarrollo:

```bash
npx prisma migrate dev --name nombre_migracion
```

No es necesario crear una migración cada vez que se levantan los contenedores.

---

## 20. Ejecución manual para desarrollo

### Frontend

```bash
npm install
npm run dev
```

Dirección habitual de Vite:

```text
http://localhost:5173
```

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

El backend requiere acceso a PostgreSQL y una `DATABASE_URL` válida.

---

## 21. Scripts principales

### Frontend

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta el frontend en desarrollo |
| `npm run build` | Compila el frontend |
| `npm run preview` | Previsualiza la compilación |

### Backend

| Comando | Descripción |
|---|---|
| `npm run dev` | Ejecuta el backend en desarrollo |
| `npm start` | Ejecuta el servidor con Node |

---

## 22. Prueba rápida del sistema

### Flujo ciudadano

1. Crear una cuenta.
2. Iniciar sesión.
3. Consultar noticias.
4. Revisar eventos.
5. Enviar un reporte ambiental.
6. Consultar puntos de reciclaje.
7. Revisar el mapa.
8. Visualizar indicadores.
9. Configurar preferencias de notificación.
10. Recargar y verificar persistencia local.
11. Cerrar sesión.

### Flujo administrativo

1. Iniciar sesión con una cuenta administradora.
2. Revisar reportes.
3. Aprobar o rechazar un reporte.
4. Marcar un reporte aprobado como resuelto.
5. Crear y editar una noticia.
6. Crear y editar un evento.
7. Crear un punto de reciclaje con coordenadas.
8. Verificar el punto en el mapa ciudadano.
9. Crear un indicador manual.
10. Revisar indicadores automáticos.
11. Eliminar contenido de prueba.
12. Cerrar sesión.

---

## 23. Persistencia de datos

PostgreSQL utiliza un volumen de Docker.

Para reiniciar sin eliminar información:

```bash
docker compose down
docker compose up -d
```

No utilizar:

```bash
docker compose down -v
```

salvo que se desee eliminar deliberadamente el volumen.

---

## 24. Diseño y experiencia de usuario

La interfaz considera:

- Navegación diferenciada por rol.
- Menú lateral para escritorio.
- Navegación inferior en dispositivos móviles.
- Identificación visual de la sección activa.
- Formularios contenidos y alineados.
- Jerarquía consistente de títulos y descripciones.
- Estados de carga y mensajes de error.
- Confirmaciones antes de eliminar.
- Botones sólidos para confirmar acciones.
- Botones de contorno para navegación y acciones secundarias.
- Diseño responsivo.
- Contraste legible en estados de reportes.
- Mapas adaptables al tamaño de la vista.

---

## 25. Decisiones técnicas relevantes

### Lecturas públicas

Las consultas de noticias, eventos, puntos de reciclaje e indicadores son públicas.

Las operaciones de creación, actualización y eliminación requieren autenticación y rol de administrador.

### Separación entre aprobado y resuelto

La aprobación valida administrativamente un reporte.

La resolución indica que la incidencia fue atendida y cerrada.

### Indicadores automáticos

Se calculan desde los registros actuales de la base de datos.

### Mapas sin Google Cloud

La plataforma utiliza OpenStreetMap y Leaflet, evitando depender de claves privadas o facturación de Google Maps.

### Preferencias locales

Las preferencias de notificación se almacenan mediante `localStorage`.

---

## 26. Limitaciones actuales

- Las notificaciones son preferencias locales y no notificaciones push.
- No existe inscripción a eventos.
- Las imágenes se registran mediante URL.
- La aplicación está configurada para ejecución local.
- No existe despliegue público en cloud.
- No existe recuperación de contraseña.
- Los indicadores automáticos corresponden a conteos del sistema y no a sensores externos.

---

## 27. Mejoras futuras

- Recuperación de contraseña.
- Carga y almacenamiento de imágenes.
- Geolocalización del dispositivo.
- Búsqueda y filtros.
- Paginación.
- Historial de estados.
- Observaciones administrativas.
- Inscripción ciudadana a eventos.
- Despliegue cloud.
- Integración con sensores.
- Pruebas automatizadas de integración y extremo a extremo.

---

## 28. Consideraciones de entrega version final

Antes de la entrega final revisado con:

```bash
npm run build
docker compose up --build -d
docker compose ps
git status
```

No deben versionarse:

```text
.env
node_modules/
dist/
*.db
*.db-journal
*.db-shm
*.db-wal
dev.backup.db
```

---

## 29. Licencia

Este proyecto está licenciado bajo la **GNU General Public License v3.0 (GPL-3.0)**.

La licencia permite usar, estudiar, modificar y distribuir el software, siempre que las obras derivadas se distribuyan bajo la misma licencia y se mantengan los avisos de copyright y licencia.

Consulta el archivo [`LICENSE`](./LICENSE) incluido en este repositorio para revisar el texto completo.

---

## 30. Contexto académico

Proyecto desarrollado con fines académicos para la asignatura **Ingeniería Web y Móvil** de la **Pontificia Universidad Católica de Valparaíso**.

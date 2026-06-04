# Arquitectura del Sistema - Eco-Barrio

## Arquitectura General

```txt
Frontend (Ionic + React + TypeScript)
            │
            ▼
        Axios / Fetch
            │
            ▼
 Backend REST API (Node.js + Express)
            │
            ▼
        Prisma ORM
            │
            ▼
 SQLite (Desarrollo)
            │
            ▼
 PostgreSQL / MySQL (Producción)
```

## Componentes

### Frontend

* Ionic React
* TypeScript
* React Router
* Context API para autenticación
* Axios para comunicación con backend

### Backend

* Node.js
* Express
* JWT para autenticación
* bcrypt para hash de contraseñas
* Middleware de autorización por roles

### Persistencia

* Prisma ORM
* SQLite durante desarrollo
* Compatible con PostgreSQL y MySQL

## Flujo de autenticación

```txt
Usuario
   │
   ▼
Login
   │
   ▼
Backend valida credenciales
   │
   ▼
JWT generado
   │
   ▼
Frontend almacena token
   │
   ▼
Rutas protegidas habilitadas
```

## Roles

### USER

* Crear reportes
* Ver noticias
* Ver eventos
* Ver indicadores
* Ver puntos de reciclaje

### ADMIN

* Todas las capacidades USER
* Gestionar reportes
* Gestionar noticias
* Gestionar eventos
* Gestionar indicadores
* Gestionar puntos de reciclaje

## Seguridad

* JWT
* bcrypt
* Validación de inputs
* Protección por roles
* Prisma ORM
* Variables sensibles mediante `.env`

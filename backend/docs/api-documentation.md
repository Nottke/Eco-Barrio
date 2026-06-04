# API Documentation - Eco-Barrio

## URL Base

```txt
http://localhost:3000/api
```

## Autenticación

Las rutas protegidas utilizan JWT.

Header requerido:

```txt
Authorization: Bearer TOKEN
```

---

# Auth

## POST /auth/register

Registro de usuario ciudadano.

### Body

```json
{
  "name": "Nox",
  "email": "nox@test.com",
  "password": "123456"
}
```

### Respuesta

```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "name": "Nox",
    "email": "nox@test.com",
    "role": "USER"
  }
}
```

---

## POST /auth/login

Obtiene token JWT.

### Body

```json
{
  "email": "nox@test.com",
  "password": "123456"
}
```

---

## GET /auth/profile

Obtiene perfil del usuario autenticado.

### Requiere JWT

Sí.

---

# Reports

| Método | Endpoint            | Rol          |
| ------ | ------------------- | ------------ |
| POST   | /reports            | USER / ADMIN |
| GET    | /reports            | USER / ADMIN |
| GET    | /reports/:id        | USER / ADMIN |
| PUT    | /reports/:id/status | ADMIN        |
| DELETE | /reports/:id        | ADMIN        |

Estados válidos:

```txt
PENDING
APPROVED
REJECTED
RESOLVED
```

---

# News

| Método | Endpoint  | Rol          |
| ------ | --------- | ------------ |
| POST   | /news     | ADMIN        |
| GET    | /news     | USER / ADMIN |
| GET    | /news/:id | USER / ADMIN |
| PUT    | /news/:id | ADMIN        |
| DELETE | /news/:id | ADMIN        |

---

# Events

| Método | Endpoint    | Rol          |
| ------ | ----------- | ------------ |
| POST   | /events     | ADMIN        |
| GET    | /events     | USER / ADMIN |
| GET    | /events/:id | USER / ADMIN |
| PUT    | /events/:id | ADMIN        |
| DELETE | /events/:id | ADMIN        |

---

# Recycling Points

| Método | Endpoint              | Rol          |
| ------ | --------------------- | ------------ |
| POST   | /recycling-points     | ADMIN        |
| GET    | /recycling-points     | USER / ADMIN |
| GET    | /recycling-points/:id | USER / ADMIN |
| PUT    | /recycling-points/:id | ADMIN        |
| DELETE | /recycling-points/:id | ADMIN        |

---

# Indicators

| Método | Endpoint        | Rol          |
| ------ | --------------- | ------------ |
| POST   | /indicators     | ADMIN        |
| GET    | /indicators     | USER / ADMIN |
| GET    | /indicators/:id | USER / ADMIN |
| PUT    | /indicators/:id | ADMIN        |
| DELETE | /indicators/:id | ADMIN        |

---

# Códigos HTTP

```txt
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

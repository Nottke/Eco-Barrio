# Seguridad Implementada - Eco-Barrio

## Autenticación JWT

La autenticación utiliza JSON Web Tokens.

Proceso:

```txt
Login
↓
Generación JWT
↓
Authorization: Bearer TOKEN
↓
Validación mediante authMiddleware
```

---

## Hash de Contraseñas

Las contraseñas se almacenan utilizando bcrypt.

Características:

* No se almacenan contraseñas en texto plano.
* Comparación segura mediante bcrypt.compare().

---

## Validación de Inputs

Registro:

* Nombre obligatorio.
* Correo obligatorio.
* Correo con formato válido.
* Contraseña mínima de 6 caracteres.

Login:

* Correo obligatorio.
* Contraseña obligatoria.
* Correo con formato válido.

---

## Protección por Roles

Roles implementados:

```txt
USER
ADMIN
```

Protección backend:

```txt
roleMiddleware("ADMIN")
```

Protección frontend:

```txt
/app/admin
```

* USER es redirigido.
* ADMIN obtiene acceso.

---

## Protección contra Escalamiento de Privilegios

El endpoint de registro ignora cualquier rol enviado desde el cliente.

Ejemplo:

```json
{
  "role": "ADMIN"
}
```

Resultado:

```json
{
  "role": "USER"
}
```

---

## Protección contra SQL Injection

La aplicación utiliza Prisma ORM.

No se realizan consultas SQL concatenadas manualmente.

Las operaciones utilizan:

```txt
findUnique()
findMany()
create()
update()
delete()
```

---

## Variables Sensibles

Variables protegidas mediante:

```txt
.env
```

Ejemplo:

```txt
JWT_SECRET
DATABASE_URL
```

---

## Rutas Protegidas

Backend:

* authMiddleware
* roleMiddleware

Frontend:

* PrivateRoute
* Control visual de menú por rol
* Protección de navegación

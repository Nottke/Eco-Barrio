# Evidencia de Pruebas Funcionales

## Autenticación

| Prueba                  | Resultado        |
| ----------------------- | ---------------- |
| Registro usuario        | Aprobado         |
| Login usuario           | Aprobado         |
| Login administrador     | Aprobado         |
| Perfil con token válido | Aprobado         |
| Perfil sin token        | 401 Unauthorized |

---

## Roles

| Prueba                            | Resultado     |
| --------------------------------- | ------------- |
| USER accede a ruta ADMIN backend  | 403 Forbidden |
| ADMIN accede a ruta ADMIN backend | Aprobado      |
| USER accede a /app/admin          | Redirección   |
| ADMIN accede a /app/admin         | Aprobado      |
| Menú oculto para USER             | Aprobado      |
| Menú visible para ADMIN           | Aprobado      |

---

## Validaciones

| Prueba                      | Resultado |
| --------------------------- | --------- |
| Correo inválido en registro | 400       |
| Contraseña corta            | 400       |
| Campos vacíos               | 400       |
| Correo inválido en login    | 400       |

---

## Seguridad

| Prueba                                | Resultado |
| ------------------------------------- | --------- |
| Contraseña almacenada con bcrypt      | Aprobado  |
| Password no retornada al frontend     | Aprobado  |
| JWT requerido en rutas protegidas     | Aprobado  |
| Escalamiento de privilegios bloqueado | Aprobado  |
| Prisma ORM utilizado                  | Aprobado  |

---

## Caso de prueba relevante

### Intento de crear administrador desde registro público

Request:

```json
{
  "name": "Hacker",
  "email": "hacker@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

Resultado verificado:

```json
{
  "id": 6,
  "name": "Hacker",
  "email": "hacker@test.com",
  "role": "USER"
}
```

Conclusión:

```txt
El backend ignora el campo role enviado por el cliente
y asigna USER de forma obligatoria.
```

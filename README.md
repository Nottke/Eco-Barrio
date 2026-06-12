# Eco-Barrio

## Plataforma de Participación Ambiental Comunal para Santo Domingo

Eco-Barrio es una aplicación web y móvil desarrollada para fortalecer la participación ciudadana en materias ambientales dentro de la comuna de Santo Domingo.

La plataforma busca facilitar la comunicación entre la comunidad y la administración comunal mediante herramientas que permitan informar, participar, reportar problemáticas ambientales y visualizar indicadores relacionados con el cuidado del entorno.

El proyecto forma parte de la asignatura **Ingeniería Web y Móvil** de la **Pontificia Universidad Católica de Valparaíso**, y ha sido desarrollado siguiendo una arquitectura Full Stack basada en API REST.

---

# 1. ¿Qué hace este proyecto?

Eco-Barrio permite que los habitantes de la comuna puedan:

* Informarse mediante noticias y campañas ambientales.
* Participar en eventos e iniciativas ecológicas.
* Reportar problemas ambientales observados en su entorno.
* Consultar puntos de reciclaje disponibles.
* Visualizar indicadores ambientales comunales.
* Recibir notificaciones sobre actividades relevantes.

Además, la plataforma incorpora herramientas administrativas para gestionar la información publicada y supervisar la participación ciudadana.

---

# 2. Problema abordado

La comuna de Santo Domingo presenta desafíos asociados a la participación ciudadana en materias ambientales debido a factores como:

* Dispersión territorial de la población.
* Presencia significativa de sectores rurales.
* Conectividad variable en algunos sectores.
* Diferencias en alfabetización digital.
* Necesidad de mejorar la difusión de iniciativas ambientales.

Actualmente existen diversos mecanismos de comunicación, pero no una plataforma digital centralizada que permita a los ciudadanos informarse, participar y colaborar activamente en el cuidado del entorno.

Eco-Barrio busca complementar los canales existentes mediante una solución digital accesible y orientada a la participación ambiental comunitaria.

---

# 3. Ciclo de participación ambiental

La plataforma fue diseñada siguiendo un ciclo de participación ciudadana que conecta todas las funcionalidades del sistema.

```text
Informar
↓
Noticias e información comunal

Participar
↓
Eventos ecológicos y campañas

Actuar
↓
Puntos de reciclaje y acciones comunitarias

Reportar
↓
Incidencias ambientales observadas por vecinos

Medir impacto
↓
Indicadores ambientales comunales
```

Este flujo representa la lógica principal del proyecto y justifica la integración de cada uno de sus módulos funcionales.

---

# 4. Integrante

* Sebastián Orellana Reyes

**Asignatura:** Ingeniería Web y Móvil
**Institución:** Pontificia Universidad Católica de Valparaíso

---

# 5. Tecnologías utilizadas

## Frontend

* Ionic Framework
* React
* TypeScript
* React Router
* Capacitor

## Backend

* Node.js
* Express.js
* Prisma ORM

## Base de datos

### Desarrollo actual

* SQLite

### Entrega Final

* PostgreSQL

## Seguridad

* JSON Web Token (JWT)
* bcrypt

## Desarrollo y pruebas

* Git
* GitHub
* Postman
* Insomnia

## Cloud Services (planificado)

* AWS o Google Cloud Platform
* Integración con servicios externos
* Servicios de geolocalización y almacenamiento

## Despliegue

* Docker
* Docker Compose

---

# 6. Arquitectura general

```text
Frontend (Ionic + React)
            │
            ▼
      API REST
      Express.js
            │
            ▼
        Prisma ORM
            │
            ▼
 PostgreSQL (Entrega Final)
```

La arquitectura separa completamente frontend y backend, facilitando escalabilidad, mantenibilidad y futuras integraciones con servicios externos.

---

# 7. Estructura del repositorio

## Frontend

```text
src/
│
├── components/
├── pages/
├── routes/
├── services/
├── features/
│   ├── auth/
│   ├── reports/
│   ├── news/
│   ├── events/
│   └── indicators/
│
├── context/
├── hooks/
└── assets/
```

## Backend

```text
backend/
│
├── prisma/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── utils/
│
└── server.js
```

---

# 8. Roles del sistema

## Usuario ciudadano

Puede:

* Consultar noticias ambientales.
* Revisar eventos ecológicos.
* Reportar problemas ambientales.
* Consultar puntos de reciclaje.
* Visualizar indicadores ambientales.
* Configurar notificaciones.

## Administrador

Puede:

* Gestionar reportes ciudadanos.
* Publicar noticias y campañas.
* Gestionar eventos ecológicos.
* Actualizar información comunal.
* Administrar indicadores ambientales.
* Supervisar contenido del sistema.

---

# 9. Funcionalidades implementadas

## Información ambiental

* Noticias comunales.
* Campañas ambientales.
* Información comunal.

## Participación ciudadana

* Eventos ecológicos.
* Inscripción a actividades.
* Notificaciones.

## Gestión ambiental

* Reporte de problemas ambientales.
* Seguimiento de reportes.
* Puntos de reciclaje.

## Indicadores

* Visualización de indicadores ambientales.
* Estadísticas comunales.

## Seguridad

* Registro de usuarios.
* Inicio de sesión.
* Autenticación JWT.
* Autorización basada en roles.

---

# 10. Configuración e instalación

## Clonar repositorio

```bash
git clone https://github.com/Nottke/Eco-Barrio.git
cd Eco-Barrio
```

---

## Frontend

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

## Backend

Instalar dependencias:

```bash
cd backend
npm install
```

Generar cliente Prisma:

```bash
npx prisma generate
```

Ejecutar servidor:

```bash
npm run dev
```

API disponible en:

```text
http://localhost:3000
```

---

# 11. Scripts principales

| Comando           | Descripción                        |
| ----------------- | ---------------------------------- |
| npm run dev       | Ejecuta servidor de desarrollo     |
| npm run build     | Compila aplicación para producción |
| npm run preview   | Visualiza versión compilada        |
| npm run lint      | Ejecuta ESLint                     |
| npm run test.unit | Ejecuta pruebas unitarias          |

---

# 12. Cómo probar rápidamente el sistema

### Usuario

* Registrar cuenta.
* Iniciar sesión.
* Revisar noticias.
* Consultar eventos.
* Reportar problema ambiental.
* Consultar puntos de reciclaje.
* Visualizar indicadores.

### Administrador

Cuenta de pruebas actual:

```text
Email: admin@test.com
Contraseña: 123456
```

Permite acceder a funcionalidades administrativas disponibles durante el desarrollo.

---

# 13. Estado actual del proyecto

## EP1

* Requerimientos funcionales y no funcionales definidos.
* Arquitectura de navegación diseñada.
* Prototipo inicial desarrollado.

## EP2

* Backend implementado mediante Express.
* Base de datos integrada mediante Prisma.
* API REST funcional.
* Sistema de autenticación implementado.
* CRUD de reportes, noticias, eventos, puntos de reciclaje e indicadores desarrollado.

## Entrega Final (en desarrollo)

* Migración a PostgreSQL.
* Integración mediante Docker.
* Optimización UI/UX.
* Dashboard administrativo.
* Indicadores automáticos.
* Integración con servicios externos.
* Mejoras avanzadas de seguridad.

---

# 14. Roadmap de desarrollo

Próximas mejoras planificadas:

* Dashboard administrativo diferenciado por rol.
* Indicadores generados automáticamente desde datos reales.
* Integración con mapas y geolocalización.
* Integración con servicios cloud.
* Despliegue mediante Docker Compose.
* Optimización de consultas.
* Mejoras de accesibilidad.
* Optimización visual de la experiencia de usuario.

---

# 15. Mentalidad técnica del proyecto

Eco-Barrio fue diseñado utilizando una arquitectura modular basada en API REST, permitiendo desacoplar frontend y backend para facilitar mantenimiento, escalabilidad y futuras integraciones.

La solución prioriza simplicidad de uso, accesibilidad y participación ciudadana, considerando especialmente las características demográficas y tecnológicas de la comuna de Santo Domingo.

---

# 16. Licencia

Proyecto académico desarrollado con fines educativos para la asignatura de Ingeniería Web y Móvil.

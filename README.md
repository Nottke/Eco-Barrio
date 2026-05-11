# Eco-Barrio (frontend piloto)

Aplicación **web‑móvil** para participación ciudadana y temas ambientales en la Comuna de Santo Domingo.

## Scripts

| Comando        | Descripción                          |
|----------------|--------------------------------------|
| `npm run dev`   | Servidor de desarrollo (Vite)        |
| `npm run build` | `tsc` + compilación producción       |
| `npm run preview` | Vista previa del `dist/`         |
| `npm run lint` | ESLint                              |
| `npm run test.unit` | Vitest + Testing Library        |

Para app nativa después de `npm run build`: `@capacitor/cli` sincroniza `dist/` con `ionic capacitor sync`.

## Navegación

| Tipo           | Ejemplos |
|----------------|----------|
| Pública        | `/login`, `/register` |
| Protegida      | Todas las rutas bajo `/app/…`, salvo redirects |
| Compatibilidad | `/home` → `/app/inicio`, `/report-problem` → `/app/reportar`, `/admin` → `/app/admin` |

**Autenticación demo:** `AuthProvider` + cliente `localStorage`; intercambiando el cliente se puede enlazar REST sin reescribir las pantallas.

**UX:** menú (**`IonMenu`**) + vistas con pestañas inferiores (**`IonTabs`**) dentro de **`IonSplitPane`** (menú lateral en pantallas grandes). Pantallas desde el menú (reciclaje, indicadores, notificaciones, administración usan rutas **`/app/…`** y cabeceras con **`IonBackButton`**).

## Ionic usado aquí

Pantallas con **`IonPage`**, **`IonHeader`**, **`IonContent`**, **`IonToolbar`**, **`IonTabs`**, **`IonMenu`**, **`IonSplitPane`**, **`IonCard`**, **`IonButton`**, **`IonSelect`**, **`IonTextarea`**, **`IonToggle`** (notificaciones), etc.

## Contenido ficticio

`src/services/mockContent.service.ts` alimenta noticias, eventos, puntos limpios e indicadores: **datos placeholder** hasta integrar servidor municipal.

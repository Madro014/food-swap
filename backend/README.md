# Backend Guide

Esta carpeta reúne todo lo que ya está preparado desde el frontend para que el backend real se implemente sin adivinar contratos.

## Archivos clave

- `contracts/api.ts`: contratos compartidos entre frontend y backend.
- `authService.ts`: flujos de autenticación y registro.
- `platosService.ts`: CRUD base de platos.
- `geoService.ts`: sesión de swipe y feed geolocalizado.
- `UbicacionServicio.ts`: utilidad actual del frontend para pedir GPS y calcular cercanía.

## Contratos base

El frontend espera respuestas con esta forma:

```ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: unknown;
};
```

Modelos ya consumidos por la app:

- `Usuario`: `id`, `nombre`, `email`, `rol`, `avatarUrl?`, `token?`
- `UbicacionFija`: `latitud`, `longitud`, `direccionFisica?`
- `Plato`: `id`, `empresaId`, `nombreRestaurante`, `nombrePlato`, `precio?`, `imagenUri`, `activo`, `createdAt?`

## Endpoints sugeridos

### Auth

- `POST /api/auth/register`
  - body:
  ```json
  {
    "nombre": "Juan Perez",
    "email": "juan@mail.com",
    "password": "123456"
  }
  ```
  - response:
  ```json
  {
    "success": true,
    "message": "Usuario registrado correctamente",
    "data": {
      "id": "u1",
      "nombre": "Juan Perez",
      "email": "juan@mail.com",
      "rol": "cliente",
      "token": "jwt"
    }
  }
  ```

- `POST /api/auth/login`
  - body:
  ```json
  {
    "email": "juan@mail.com",
    "password": "123456",
    "rol": "cliente"
  }
  ```

- `POST /api/auth/negocio/register`
  - body:
  ```json
  {
    "nombreEmpresa": "Mi Restaurante",
    "email": "negocio@mail.com",
    "password": "123456",
    "ubicacion": {
      "latitud": 4.711,
      "longitud": -74.0721,
      "direccionFisica": "Bogota"
    }
  }
  ```

- `POST /api/auth/negocio/login`
  - body:
  ```json
  {
    "email": "negocio@mail.com",
    "password": "123456",
    "rol": "negocio"
  }
  ```

### Platos

- `POST /api/platos`
  - auth: bearer token del negocio
  - content-type: `multipart/form-data`
  - campos esperados:
    - `empresaId`
    - `nombreRestaurante`
    - `nombrePlato`
    - `precio`
    - `foto`
  - response: `ApiResponse<Plato>`

- `GET /api/platos?empresaId=<id>`
  - devuelve `ApiResponse<Plato[]>`

- `PATCH /api/platos/:platoId`
  - body parcial según `Partial<Plato>`

- `PATCH /api/platos/:platoId/estado`
  - body:
  ```json
  { "activo": true }
  ```

### Geolocalización

- `POST /api/feed/sesion`
  - body:
  ```json
  {
    "usuarioId": "u1",
    "latitud": 4.711,
    "longitud": -74.0721,
    "radioBuscadoKms": 5
  }
  ```

- `GET /api/feed/cercanos?usuarioId=u1&limite=10&offset=0`
  - devuelve platos activos dentro del radio configurado

## Qué falta conectar en frontend

### 1. Login y registro real

Archivo: `src/Global/funcionalidades/auth/useAuthStore.ts`

- `login` debe pasar a `async`
- debe consumir `authService.loginUsuario` o `authService.loginNegocio`
- debe guardar `token` de respuesta
- idealmente persistir sesión con Async Storage

Archivos que hoy disparan login visual:

- `src/Global/funcionalidades/auth/LoginVista.tsx`
- `src/Global/funcionalidades/auth/RegistroVista.tsx`

### 2. Registro de platos real

Archivo: `app/(wizard)/index.tsx`

Payload real que hoy sale del wizard:

```ts
{
  nombreRestaurante: string;
  nombrePlato: string;
  imagenUri: string | null;
}
```

Si el backend va a exigir precio o `empresaId`, el frontend todavía debe ampliar ese formulario.

### 3. Feed geolocalizado real

Archivo: `src/Global/funcionalidades/platos/usePlatos.ts`

Hoy:

- pide permisos de ubicación
- lee `assets/data/platos.json`
- filtra localmente

Luego debería:

- pedir ubicación
- llamar `geoService.iniciarSesionSwipe(...)`
- luego llamar `geoService.obtenerPlatosCercanos(...)`

## Recomendaciones técnicas para backend

- auth con JWT o cookie de sesión
- almacenamiento de imágenes en S3, Cloudinary o disco expuesto por URL
- base de datos con tabla de usuarios, negocios, platos y sesiones de swipe
- para cercanía real, usar PostgreSQL + PostGIS o al menos cálculo Haversine en backend
- validar rol del usuario en endpoints de negocio
- devolver siempre `success`, `message` y `data/error` con forma estable

## Orden sugerido de implementación

1. Implementar `contracts/api.ts` en el backend real como fuente de verdad.
2. Levantar auth cliente y negocio.
3. Levantar creación y listado de platos.
4. Subir imágenes y devolver `imagenUri` pública.
5. Implementar feed geolocalizado.
6. Conectar persistencia de sesión en frontend.
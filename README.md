# Proyecto Nativas

Aplicacion hibrida construida con Expo, React Native, TypeScript y Expo Router.
El proyecto comparte logica global en `src/Global` y separa implementaciones
especificas para movil y web en `src/Movil` y `src/Web`.

## Stack principal

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript
- Expo Router
- Zustand

## Requisitos

Antes de abrir el proyecto, instala lo siguiente:

- Node.js 20 LTS recomendado
- npm 10 o superior
- Git

Herramientas opcionales segun la plataforma:

- Android Studio si quieres emulador Android
- Xcode si quieres simulador iOS
- Expo Go si quieres probar desde un celular

## Compatibilidad por sistema operativo

### Windows

Puedes desarrollar para:

- Web
- Android
- Expo Go

No puedes ejecutar el simulador de iOS en Windows.

### macOS

Puedes desarrollar para:

- Web
- Android
- iOS
- Expo Go

### Linux

Puedes desarrollar para:

- Web
- Android
- Expo Go

No puedes ejecutar el simulador de iOS en Linux.

## Como abrir el proyecto

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyectonativas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el proyecto

```bash
npm run start
```

Tambien puedes usar:

- `npm run android`
- `npm run ios`
- `npm run web`

## Comandos utiles

| Comando | Que hace |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run start` | Abre el servidor de Expo |
| `npm run android` | Inicia en Android |
| `npm run ios` | Inicia en iOS |
| `npm run web` | Inicia en navegador |
| `npm run lint` | Ejecuta ESLint |

## Guia rapida por sistema operativo

### Windows

1. Instala Node.js LTS desde la web oficial.
2. Instala Git.
3. Instala Android Studio si vas a usar emulador.
4. Abre el proyecto en VS Code.
5. Ejecuta `npm install`.
6. Ejecuta `npm run start`.

Sugerencias:

- Usa PowerShell o la terminal integrada de VS Code.
- Si Android no aparece en Expo, abre primero el emulador desde Android Studio.

### macOS

1. Instala Node.js LTS.
2. Instala Git.
3. Instala Xcode si vas a usar iOS.
4. Instala Android Studio si tambien usaras Android.
5. Abre el proyecto en VS Code.
6. Ejecuta `npm install`.
7. Ejecuta `npm run start`.

Sugerencias:

- Para iOS, abre antes el simulador desde Xcode o desde Expo.
- Si aparece un problema con permisos del simulador, reinicia Xcode y Expo.

### Linux

1. Instala Node.js LTS.
2. Instala Git.
3. Instala Android Studio si vas a usar emulador.
4. Abre el proyecto en VS Code.
5. Ejecuta `npm install`.
6. Ejecuta `npm run start`.

Sugerencias:

- Revisa que `adb` este disponible si usas Android.
- En algunas distros necesitas habilitar virtualizacion para el emulador.

## Estructura real del proyecto

```text
app/
  (negocio)/           Rutas para flujo de negocio
  (tabs)/              Rutas principales para usuario
  (wizard)/            Flujo inicial de negocio
  _layout.tsx          Layout raiz y control de navegacion
  index.tsx            Redireccion inicial
  login.tsx            Pantalla de login
  registro.tsx         Pantalla de registro
  modal.tsx            Pantalla modal

src/
  Global/              Logica y componentes compartidos
  Movil/               Implementaciones especificas de mobile
  Web/                 Implementaciones especificas de web

backend/
  authService.ts       Contratos y helpers para autenticacion
  platosService.ts     Contratos y helpers para platos
  geoService.ts        Contratos y helpers de geolocalizacion
  UbicacionServicio.ts Utilidades de ubicacion
  contracts/           Tipos compartidos con backend
  .env.example         Variables de ejemplo
```

## Alias de importacion

El proyecto usa alias definidos en `tsconfig.json`:

- `@/*`
- `@Global/*`
- `@Movil/*`
- `@Web/*`
- `@backend/*`

Ejemplo:

```ts
import { useAuthStore } from '@Global/funcionalidades/auth/useAuthStore';
import { HeaderAppApp } from '@Movil/layout/HeaderApp.App';
```

## Backend

La carpeta `backend/` no es un backend ejecutable completo. Sirve como referencia
de contratos y servicios que el frontend espera consumir.

Si necesitas revisar la forma esperada de respuestas, endpoints o payloads:

- Lee `backend/README.md`
- Revisa `backend/.env.example`

Variables de ejemplo:

```env
API_URL=http://localhost:3000/api
JWT_SECRET=change-me
DATABASE_URL=postgresql://user:password@localhost:5432/proyectonativas
UPLOAD_PROVIDER=local
```

## Solucion de problemas

### No resuelve imports como `@Movil/*`

- Verifica que abriste la carpeta raiz del proyecto, no una subcarpeta.
- Ejecuta `npm install`.
- Reinicia VS Code.
- Reinicia el servidor de TypeScript desde VS Code.

### Expo no detecta Android

- Abre el emulador manualmente desde Android Studio.
- Verifica que `adb devices` liste un dispositivo.

### Expo no detecta iOS

- Esto solo funciona en macOS.
- Abre el simulador antes de correr `npm run ios`.

### Errores raros de cache

Prueba:

```bash
npx expo start --clear
```

### ESLint o TypeScript siguen mostrando errores viejos

- Cierra y vuelve a abrir VS Code.
- Usa `Developer: Reload Window`.
- Reinicia el servidor de ESLint.

## Recomendaciones para VS Code

Extensiones utiles:

- ESLint
- Prettier
- Expo Tools

Configuracion recomendada:

- Abrir siempre la carpeta raiz `proyectonativas`
- Usar la version de TypeScript del workspace

## Estado actual

Este proyecto ya usa la carpeta `src/Movil` en lugar de la antigua `src/APP`.
Si aparece algun import viejo apuntando a `@APP/*`, debe cambiarse a `@Movil/*`.

## Licencia

Uso interno o academico, salvo que el equipo defina otra licencia.

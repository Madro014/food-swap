# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# proyectoapp
# 🍔 Food Hybrid App

Aplicación móvil híbrida construida con **React Native (Expo SDK 54)** y **TypeScript**.

---

## 📁 Estructura del Proyecto

```
├── app/                    # 🔀 Routing (Expo Router)
│   ├── _layout.tsx         # Root layout (providers globales)
│   ├── index.tsx           # Redirect según autenticación
│   ├── (auth)/             # Grupo de rutas: autenticación
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (main)/             # Grupo de rutas: app principal
│       ├── _layout.tsx
│       ├── home.tsx
│       └── profile.tsx
│
└── src/                    # 📦 Código fuente de la aplicación
    ├── api/                # Configuración HTTP (adapter pattern)
    ├── components/         # Componentes reutilizables (Button, Card, Input)
    ├── constants/          # Tokens de diseño y configuración
    ├── context/            # Estado global (React Context)
    ├── hooks/              # Custom hooks (lógica de negocio)
    ├── models/             # Interfaces TypeScript
    ├── screens/            # Pantallas/vistas de la app
    └── services/           # Funciones de llamadas al API
```

---

## 🔀 `app/` — Routing (Expo Router)

La carpeta `app/` define las **rutas de navegación** usando [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing). Cada archivo `.tsx` dentro de `app/` se convierte automáticamente en una ruta.

| Archivo       | Función                                                                   |
| ------------- | ------------------------------------------------------------------------- |
| `_layout.tsx` | Layout raíz que envuelve toda la app con `AuthProvider` y `ThemeProvider` |
| `index.tsx`   | Punto de entrada: redirige a login o home según estado de autenticación   |
| `(auth)/`     | Grupo de rutas para el flujo de autenticación (sin headers)               |
| `(main)/`     | Grupo de rutas para la app principal (con headers)                        |

> **Los archivos de ruta son thin re-exports.** Solo montan un screen de `src/screens/`. La lógica y UI no van en `app/`.

---

## 📦 `src/` — Código Fuente

### `api/` — HTTP Client (Adapter Pattern)

Desacopla la app de la librería HTTP concreta (Axios). Si mañana se cambia a `fetch` o a otra librería, solo se modifica la implementación del adapter.

```
api/
├── http-client.ts     # Interfaz HttpClient (contrato)
├── axios.config.ts    # Implementación con Axios + interceptors
└── index.ts           # Barrel export
```

**Flujo:**

```
Service → httpClient.get('/products') → Axios → Backend
```

---

### `components/` — Componentes Reutilizables

Componentes de UI genéricos usados en múltiples pantallas. Cada componente sigue la estructura:

```
components/
├── Button/
│   ├── Button.tsx     # Componente + estilos
│   └── index.ts       # Re-export
├── Card/
├── Input/
└── index.ts           # Barrel export global
```

**Uso:**

```tsx
import { Button, Card, Input } from '@/src/components';

<Button title="Enviar" onPress={handleSubmit} variant="primary" />
<Button title="Cancelar" onPress={handleCancel} variant="secondary" />
```

---

### `constants/` — Tokens de Diseño y Configuración

Valores centralizados que se reutilizan en toda la app. **Nunca hardcodear colores, tamaños o spacing directo en un componente.**

```
constants/
├── colors.ts          # Paleta de colores (brand, semantic, neutral, text, border)
├── typography.ts      # Estilos de texto (h1, h2, body, caption, etc.)
├── spacing.ts         # Escala de spacing (múltiplos de 4px) + border radius
├── config.ts          # Variables de configuración (API URL, app name)
├── endpoints.ts       # Rutas del API centralizadas
└── index.ts           # Barrel export
```

**Uso:**

```tsx
import { colors, typography, spacing, borderRadius } from "@/src/constants";

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg, // 16px
    borderRadius: borderRadius.md, // 8px
    backgroundColor: colors.surface,
  },
  title: {
    ...typography.h2, // fontSize: 24, fontWeight: bold
    color: colors.textPrimary,
  },
});
```

---

### `context/` — Estado Global (React Context)

Proveedores de estado global para datos que necesitan múltiples pantallas.

| Archivo            | Qué maneja                                                   |
| ------------------ | ------------------------------------------------------------ |
| `AuthContext.tsx`  | `isAuthenticated`, `login()`, `logout()`, `loading`, `error` |
| `ThemeContext.tsx` | `isDarkMode`, `toggleTheme()`                                |

**Los providers se montan en `app/_layout.tsx`.** Para consumir, usa el hook exportado:

```tsx
import { useAuth } from "@/src/context";

const { isAuthenticated, login, logout } = useAuth();
```

---

### `hooks/` — Custom Hooks

Encapsulan lógica de negocio reutilizable. Conectan los **services** con el **estado del componente**.

| Hook            | Qué hace                                                        |
| --------------- | --------------------------------------------------------------- |
| `useProducts()` | Carga productos del API, maneja loading/error, expone `refetch` |

**Patrón:**

```tsx
// El hook encapsula: llamar al service + manejar estado + error handling
const { products, loading, error, refetch } = useProducts();
```

---

### `models/` — Interfaces TypeScript

Definen la **forma de los datos** que maneja la app. Todas las interfaces se importan desde aquí.

| Modelo    | Campos                                                     |
| --------- | ---------------------------------------------------------- |
| `User`    | `id`, `email`, `name`, `avatar?`                           |
| `Product` | `id`, `name`, `description`, `price`, `image?`, `category` |

```tsx
import { User, Product } from "@/src/models";
```

---

### `screens/` — Pantallas

Las vistas/páginas de la app, organizadas por feature. Cada screen:

- Usa componentes de `components/`
- Consume hooks de `hooks/` o `context/`
- **No llama a services directamente** (eso lo hacen los hooks)

```
screens/
├── auth/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── index.ts
├── home/
│   ├── HomeScreen.tsx
│   └── index.ts
└── profile/
    ├── ProfileScreen.tsx
    └── index.ts
```

---

### `services/` — Llamadas al API

Funciones puras que realizan peticiones HTTP. Usan el **adapter `httpClient`** y los **endpoints centralizados**.

| Service              | Funciones                           |
| -------------------- | ----------------------------------- |
| `auth.service.ts`    | `login()`, `register()`             |
| `product.service.ts` | `getProducts()`, `getProductById()` |

```tsx
// Todos los services siguen este patrón:
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await httpClient.get<Product[]>(endpoints.products.list);
    return response.data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error");
  }
}
```

---

## 🔄 Flujo de Datos

```
Screen → Hook → Service → httpClient (adapter) → Axios → Backend
                                                       ↓
Screen ← Hook ← Service ← httpClient (adapter) ← Axios ← Response
```

---

## 🎨 Sistema de Estilos

React Native **no usa CSS**. Los estilos se definen con `StyleSheet.create()` y se colocan al final de cada archivo de componente.

Los **tokens de diseño** (colores, tipografía, spacing) se centralizan en `src/constants/` y se importan en los componentes:

```tsx
import { colors, typography, spacing } from "@/src/constants";
```

| Token         | Archivo         | Ejemplo                                  |
| ------------- | --------------- | ---------------------------------------- |
| Colores       | `colors.ts`     | `colors.primary`, `colors.textSecondary` |
| Tipografía    | `typography.ts` | `typography.h1`, `typography.body`       |
| Spacing       | `spacing.ts`    | `spacing.lg` (16px), `spacing.xl` (20px) |
| Border Radius | `spacing.ts`    | `borderRadius.md` (8px)                  |

---

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npx expo start

# Ejecutar en plataforma específica
npx expo start --android
npx expo start --ios
npx expo start --web
```

---

## 🛠️ Stack Tecnológico

| Tecnología   | Versión |
| ------------ | ------- |
| React Native | 0.81.5  |
| Expo SDK     | 54      |
| TypeScript   | ~5.9.2  |
| Expo Router  | ~6.0.23 |
| Axios        | latest  |
| React        | 19.1.0  |

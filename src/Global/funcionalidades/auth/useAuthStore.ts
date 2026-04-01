import { create } from 'zustand';
// RECOMENDACIÓN BACKEND: Importar aquí los servicios de red 
// import { authService } from '@backend/authService';
// import { platosService } from '@backend/platosService';

interface AuthState {
    userName: string | null;
    userAvatar: string | null;
    rol: 'cliente' | 'negocio' | null;
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Ojo, esta lista en memoria `platosNegocio` se debe sustituir o recargar llamando
     * a `await platosService.listarPlatosNegocio(empresaId)` cada vez que el negocio
     * inicie sesión, o utilizar una herramienta fuerte como React Query enfocada a Fetching.
     */
    platosNegocio: { nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }[];
    login: (name: string, rol: 'cliente' | 'negocio', avatar?: string) => void;
    agregarPlato: (plato: { nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userName: null,
    userAvatar: null,
    rol: null,
    platosNegocio: [],
    
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Este login actual es puramente visual y síncrono.
     * Deberás volver este método `async`, llamar a `authService.loginUsuario` o `loginNegocio`
     * (dependiendo el rol proporcionado), capturar el Token que retorna y guardarlo (ej: Async Storage).
     * Solo si `res.success === true`, ejecutar el `set({...})`.
     */
    login: (name, rol, avatar) => set({
        userName: name,
        rol: rol,
        userAvatar: avatar || `https://api.dicebear.com/7.x/notionists/png?seed=${name}&backgroundColor=f3f4f6`
    }),
    
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Igualmente, esto es simulado. Antes del `set()`, llamar a `await platosService.crearPlato(FormData)`.
     * Solo si regresa `success`, actualizar la UI con el retorno remoto del servidor.
     */
    agregarPlato: (plato) => set((state) => ({ 
        platosNegocio: [...state.platosNegocio, plato] 
    })),
    logout: () => set({ userName: null, userAvatar: null, rol: null, platosNegocio: [] }),
}));

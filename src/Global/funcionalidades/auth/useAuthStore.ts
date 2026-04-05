import { create } from 'zustand';
// RECOMENDACIÓN BACKEND: Importar aquí los servicios de red 
// import { authService } from '@backend/authService';
// import { platosService } from '@backend/platosService';

interface AuthState {
    userName: string | null;
    userAvatar: string | null;
    rol: 'cliente' | 'negocio' | null;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
    alcanceKm: number;
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Ojo, esta lista en memoria `platosNegocio` se debe sustituir o recargar llamando
     * a `await platosService.listarPlatosNegocio(empresaId)` cada vez que el negocio
     * inicie sesión, o utilizar una herramienta fuerte como React Query enfocada a Fetching.
     */
    platosNegocio: { nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }[];
    login: (data: { name: string; rol: 'cliente' | 'negocio'; avatar?: string; email?: string; telefono?: string; direccion?: string }) => void;
    agregarPlato: (plato: { nombreRestaurante: string, nombrePlato: string, imagenUri: string | null }) => void;
    logout: () => void;
    updateAvatar: (avatar: string) => void;
    setAlcanceKm: (km: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    userName: null,
    userAvatar: null,
    rol: null,
    email: null,
    telefono: null,
    direccion: null,
    alcanceKm: 200,
    platosNegocio: [],
    
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Este login actual es puramente visual y síncrono.
     * Deberás volver este método `async`, llamar a `authService.loginUsuario` o `loginNegocio`
     * (dependiendo el rol proporcionado), capturar el Token que retorna y guardarlo (ej: Async Storage).
     * Solo si `res.success === true`, ejecutar el `set({...})`.
     */
    login: (data) => set({
        userName: data.name,
        rol: data.rol,
        userAvatar: data.avatar || `https://api.dicebear.com/7.x/notionists/png?seed=${data.name}&backgroundColor=f3f4f6`,
        email: data.email || null,
        telefono: data.telefono || null,
        direccion: data.direccion || null,
    }),
    
    /**
     * @TODO AL BACKEND DEVELOPER:
     * Igualmente, esto es simulado. Antes del `set()`, llamar a `await platosService.crearPlato(FormData)`.
     * Solo si regresa `success`, actualizar la UI con el retorno remoto del servidor.
     */
    agregarPlato: (plato) => set((state) => ({ 
        platosNegocio: [...state.platosNegocio, plato] 
    })),
    logout: () => set({ userName: null, userAvatar: null, rol: null, email: null, telefono: null, direccion: null, platosNegocio: [] }),
    updateAvatar: (avatar) => set({ userAvatar: avatar }),
    setAlcanceKm: (km) => set({ alcanceKm: km }),
}));

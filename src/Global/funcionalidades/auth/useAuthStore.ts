import { create } from 'zustand';
import { authService } from '@backend/authService';
import type { UbicacionFija } from '@backend/contracts/api';

// ---------------------------------------------------------------------------
// Estado
// ---------------------------------------------------------------------------

interface AuthState {
    userName: string | null;
    userAvatar: string | null;
    rol: 'cliente' | 'negocio' | null;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
    alcanceKm: number;
    token: string | null;
    cargando: boolean;
    errorAuth: string | null;

    // Acciones de auth reales
    loginUsuario: (email: string, contrasena: string) => Promise<boolean>;
    loginNegocio: (email: string, contrasena: string) => Promise<boolean>;
    registroUsuario: (nombre: string, email: string, contrasena: string, telefono?: string) => Promise<boolean>;
    registroNegocio: (
        form: { nombreEmpresa: string; email: string; contrasena: string; telefono?: string },
        ubicacion: UbicacionFija,
    ) => Promise<boolean>;

    // Utilidades
    logout: () => void;
    updateAvatar: (avatar: string) => void;
    setAlcanceKm: (km: number) => void;
    limpiarError: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useAuthStore = create<AuthState>((set, get) => ({
    userName: null,
    userAvatar: null,
    rol: null,
    email: null,
    telefono: null,
    direccion: null,
    alcanceKm: 5,
    token: null,
    cargando: false,
    errorAuth: null,

    /**
     * Login para usuarios clientes.
     * Retorna true si el login fue exitoso.
     */
    loginUsuario: async (email, contrasena) => {
        set({ cargando: true, errorAuth: null });
        try {
            const res = await authService.loginUsuario(email, contrasena);
            if (!res.success || !res.data) {
                set({ cargando: false, errorAuth: res.message ?? 'Credenciales inválidas' });
                return false;
            }
            const { nombre, token, avatarUrl } = res.data;
            set({
                cargando: false,
                userName: nombre,
                email,
                rol: 'cliente',
                token,
                userAvatar:
                    avatarUrl ??
                    `https://api.dicebear.com/7.x/notionists/png?seed=${nombre}&backgroundColor=f3f4f6`,
                errorAuth: null,
            });
            return true;
        } catch {
            set({ cargando: false, errorAuth: 'Error inesperado al iniciar sesión' });
            return false;
        }
    },

    /**
     * Login para negocios / empresas.
     * Retorna true si el login fue exitoso.
     */
    loginNegocio: async (email, contrasena) => {
        set({ cargando: true, errorAuth: null });
        try {
            const res = await authService.loginNegocio(email, contrasena);
            if (!res.success || !res.data) {
                set({ cargando: false, errorAuth: res.message ?? 'Credenciales inválidas' });
                return false;
            }
            const { nombre, token, avatarUrl } = res.data;
            set({
                cargando: false,
                userName: nombre,
                email,
                rol: 'negocio',
                token,
                userAvatar:
                    avatarUrl ??
                    `https://api.dicebear.com/7.x/notionists/png?seed=${nombre}&backgroundColor=f3f4f6`,
                errorAuth: null,
            });
            return true;
        } catch {
            set({ cargando: false, errorAuth: 'Error inesperado al iniciar sesión' });
            return false;
        }
    },

    /**
     * Registro de usuario cliente.
     * Retorna true si el registro fue exitoso.
     */
    registroUsuario: async (nombre, email, contrasena, telefono) => {
        set({ cargando: true, errorAuth: null });
        try {
            const res = await authService.registroUsuario(nombre, email, contrasena, telefono);
            if (!res.success) {
                set({ cargando: false, errorAuth: res.message ?? 'Error al registrarte' });
                return false;
            }
            set({ cargando: false, errorAuth: null });
            return true;
        } catch {
            set({ cargando: false, errorAuth: 'Error inesperado al registrarte' });
            return false;
        }
    },

    /**
     * Registro de negocio / empresa.
     * Retorna true si el registro fue exitoso.
     */
    registroNegocio: async (form, ubicacion) => {
        set({ cargando: true, errorAuth: null });
        try {
            const res = await authService.registroNegocio(form, ubicacion);
            if (!res.success) {
                set({ cargando: false, errorAuth: res.message ?? 'Error al registrar la empresa' });
                return false;
            }
            set({ cargando: false, errorAuth: null });
            return true;
        } catch {
            set({ cargando: false, errorAuth: 'Error inesperado al registrar la empresa' });
            return false;
        }
    },

    logout: () =>
        set({
            userName: null,
            userAvatar: null,
            rol: null,
            email: null,
            telefono: null,
            direccion: null,
            token: null,
            cargando: false,
            errorAuth: null,
        }),

    updateAvatar: (avatar) => set({ userAvatar: avatar }),
    setAlcanceKm: (km) => set({ alcanceKm: km }),
    limpiarError: () => set({ errorAuth: null }),
}));

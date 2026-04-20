import { API_BASE_URL, getAuthHeaders, JSON_HEADERS } from './config';
import type {
    ApiResponse,
    LoginData,
    LoginEmpresaData,
    RegistroUsuarioData,
    RegistroEmpresaData,
    Usuario,
    UbicacionFija,
    UserProfileBackend,
    CompanyProfileBackend,
} from './contracts/api';

// ---------------------------------------------------------------------------
// Helpers internos
// ---------------------------------------------------------------------------

/** Mapea la respuesta de login de usuario al tipo Usuario del frontend */
function mapLoginToUsuario(data: LoginData): Usuario {
    return {
        id: data.user.id,
        nombre: data.user.name,
        email: data.user.email,
        rol: data.actor_type === 'company' ? 'negocio' : 'cliente',
        token: data.token,
    };
}

/** Mapea la respuesta de login de empresa al tipo Usuario del frontend */
function mapLoginEmpresaToUsuario(data: LoginEmpresaData): Usuario {
    return {
        id: data.company.id,
        nombre: data.company.name,
        email: data.company.email,
        rol: data.actor_type === 'user' ? 'cliente' : 'negocio',
        avatarUrl: data.company.logo_url,
        token: data.token,
    };
}

// ---------------------------------------------------------------------------
// Servicio de Autenticación
// ---------------------------------------------------------------------------

export const authService = {
    /**
     * Registro de usuario cliente.
     * POST /api/v1/auth/register
     */
    registroUsuario: async (
        nombre: string,
        email: string,
        contrasena: string,
        telefono?: string,
    ): Promise<ApiResponse<RegistroUsuarioData>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: JSON_HEADERS,
                body: JSON.stringify({
                    name: nombre,
                    email,
                    password: contrasena,
                    phone: telefono ?? '',
                }),
            });
            const json = await res.json();
            return {
                success: json.success ?? false,
                status: json.status,
                message: json.message,
                data: json.data,
                errors: json.errors,
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Login de usuario cliente.
     * POST /api/v1/auth/login
     * Retorna un Usuario listo para guardar en el AuthStore.
     */
    loginUsuario: async (
        email: string,
        contrasena: string,
    ): Promise<ApiResponse<Usuario>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: JSON_HEADERS,
                body: JSON.stringify({ email, password: contrasena }),
            });
            const json = await res.json();
            if (!json.success || !json.data) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            return {
                success: true,
                message: json.message,
                data: mapLoginToUsuario(json.data as LoginData),
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Registro de empresa / negocio.
     * POST /api/v1/auth/company/register
     *
     * Nota: el backend requiere lat/lng. Si no se tienen al momento del registro,
     * se envían como 0 y deben actualizarse más adelante en el perfil.
     */
    registroNegocio: async (
        form: { nombreEmpresa: string; email: string; contrasena: string; telefono?: string },
        ubicacion: UbicacionFija,
    ): Promise<ApiResponse<RegistroEmpresaData>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/company/register`, {
                method: 'POST',
                headers: JSON_HEADERS,
                body: JSON.stringify({
                    name: form.nombreEmpresa,
                    email: form.email,
                    password: form.contrasena,
                    phone: form.telefono ?? '',
                    address: ubicacion.direccionFisica ?? '',
                    lat: ubicacion.latitud,
                    lng: ubicacion.longitud,
                }),
            });
            const json = await res.json();
            return {
                success: json.success ?? false,
                status: json.status,
                message: json.message,
                data: json.data,
                errors: json.errors,
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Login de empresa / negocio.
     * POST /api/v1/auth/company/login
     * Retorna un Usuario listo para guardar en el AuthStore.
     */
    loginNegocio: async (
        email: string,
        contrasena: string,
    ): Promise<ApiResponse<Usuario>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/company/login`, {
                method: 'POST',
                headers: JSON_HEADERS,
                body: JSON.stringify({ email, password: contrasena }),
            });
            const json = await res.json();
            if (!json.success || !json.data) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            return {
                success: true,
                message: json.message,
                data: mapLoginEmpresaToUsuario(json.data as LoginEmpresaData),
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Perfil del usuario autenticado.
     * GET /api/v1/user/profile
     */
    perfilUsuario: async (token: string): Promise<ApiResponse<UserProfileBackend>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'GET',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            return { success: json.success, message: json.message, data: json.data, errors: json.errors };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Perfil de empresa autenticada.
     * GET /api/v1/company/profile
     */
    perfilEmpresa: async (token: string): Promise<ApiResponse<CompanyProfileBackend>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/company/profile`, {
                method: 'GET',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            return { success: json.success, message: json.message, data: json.data, errors: json.errors };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },
};

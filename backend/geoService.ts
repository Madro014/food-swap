import { API_BASE_URL, getAuthHeaders } from './config';
import type { ApiResponse, SesionData, FeedPlatoItem, PaginatedResponse, FeedData } from './contracts/api';

// ---------------------------------------------------------------------------
// Servicio de Geolocalización / Sesiones de Swipe
// ---------------------------------------------------------------------------

/**
 * El flujo del feed real es diferente al del mock original:
 *
 * 1. Crear sesión de swipe (POST /api/v1/sessions)
 *    → El backend guarda lat/lng/radio y retorna un sessionId
 *
 * 2. Obtener platos del feed paginados (GET /api/v1/sessions/:sessionId/feed)
 *    → Retorna platos activos dentro del radio, sin los ya swiped por el usuario
 *
 * 3. Registrar cada swipe (POST /api/v1/sessions/:sessionId/swipe)
 *
 * 4. Ver finalistas cuando se alcancen 3 likes (GET /api/v1/sessions/:sessionId/finalists)
 *
 * 5. Hacer match con el plato elegido (POST /api/v1/sessions/:sessionId/match)
 */

export const geoService = {
    /**
     * Crea una sesión de swipe con la ubicación actual del usuario.
     * Retorna el sessionId necesario para obtener el feed.
     *
     * POST /api/v1/sessions
     */
    iniciarSesionSwipe: async (
        token: string,
        latitud: number,
        longitud: number,
        radioBuscadoKms: number,
    ): Promise<ApiResponse<SesionData>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions`, {
                method: 'POST',
                headers: getAuthHeaders(token),
                body: JSON.stringify({
                    user_lat: latitud,
                    user_lng: longitud,
                    radius_km: radioBuscadoKms,
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
     * Obtiene el feed paginado de platos para una sesión activa.
     * Incluye la distancia a cada restaurante calculada por el backend.
     *
     * GET /api/v1/sessions/:sessionId/feed?page=1&per_page=20
     */
    obtenerPlatosCercanos: async (
        token: string,
        sessionId: string,
        pagina = 1,
        porPagina = 20,
    ): Promise<ApiResponse<PaginatedResponse<FeedData>>> => {
        try {
            const url = `${API_BASE_URL}/sessions/${sessionId}/feed?page=${pagina}&per_page=${porPagina}`;
            const res = await fetch(url, {
                method: 'GET',
                headers: getAuthHeaders(token),
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
     * Registra un swipe (like = 'right' / pass = 'left') sobre un plato.
     *
     * POST /api/v1/sessions/:sessionId/swipe
     */
    registrarSwipe: async (
        token: string,
        sessionId: string,
        platoId: string,
        direction: 'right' | 'left',
    ): Promise<ApiResponse<{ swipe_id: string; likes_count: number; feed_blocked: boolean }>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/swipe`, {
                method: 'POST',
                headers: getAuthHeaders(token),
                body: JSON.stringify({ dish_id: platoId, direction }),
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
     * Obtiene la sesión activa actual del usuario.
     *
     * GET /api/v1/sessions/active
     */
    obtenerSesionActiva: async (token: string): Promise<ApiResponse<SesionData>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions/active`, {
                method: 'GET',
                headers: getAuthHeaders(token),
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
     * Obtiene los 3 finalistas (platos con like) de la sesión.
     * Solo disponible cuando el usuario ya tiene 3 likes registrados.
     *
     * GET /api/v1/sessions/:sessionId/finalists
     */
    obtenerFinalistas: async (
        token: string,
        sessionId: string,
    ): Promise<ApiResponse<{ session_id: string; finalists: FeedPlatoItem[]; count: number }>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/finalists`, {
                method: 'GET',
                headers: getAuthHeaders(token),
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
     * Hace match con un plato finalista y cierra la sesión.
     *
     * POST /api/v1/sessions/:sessionId/match
     */
    hacerMatch: async (
        token: string,
        sessionId: string,
        platoId: string,
    ): Promise<ApiResponse<unknown>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/match`, {
                method: 'POST',
                headers: getAuthHeaders(token),
                body: JSON.stringify({ dish_id: platoId }),
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
     * Completa / cancela una sesión manualmente.
     *
     * POST /api/v1/sessions/:sessionId/complete
     */
    completarSesion: async (token: string, sessionId: string): Promise<ApiResponse<void>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/complete`, {
                method: 'POST',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            return { success: json.success ?? false, message: json.message, errors: json.errors };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },
};

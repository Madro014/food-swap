import { Platform } from 'react-native';

/**
 * CONFIGURACIÓN CENTRALIZADA DEL BACKEND
 *
 * Se configura dinámicamente según la plataforma:
 * - Web / iOS Simulator: 'http://localhost:8080/api/v1'
 * - Emulador Android: 'http://10.0.2.2:8080/api/v1'
 * - Dispositivo físico: usarás la IP de tu máquina en la red local (ej: 'http://192.168.1.X:8080/api/v1')
 */
export const API_BASE_URL = Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api/v1'
    : 'http://localhost:8080/api/v1';

/**
 * Construye los headers para requests autenticadas con Bearer token.
 */
export function getAuthHeaders(token: string): Record<string, string> {
    console.log('[DEBUG getAuthHeaders] Token recibido:', token ? `-token-${token.substring(0, 20)}...` : 'UNDEFINED');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
    console.log('[DEBUG getAuthHeaders] Headers generados:', headers);
    return headers;
}

/**
 * Headers base para requests públicas.
 */
export const JSON_HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
};

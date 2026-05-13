import { Platform } from 'react-native';

/**
 * CONFIGURACIÓN CENTRALIZADA DEL BACKEND
 *
 * Producción → Railway: https://swap-service-production.up.railway.app/api/v1
 *
 * En desarrollo local puedes cambiar USAR_LOCAL a true y configurar
 * la IP de tu máquina para pruebas sin redesplegar.
 */

/** Cambia a true sólo si quieres apuntar al backend local en tu máquina */
const USAR_LOCAL = false;

const LOCAL_URL =
    Platform.OS === 'android'
        ? 'http://10.0.2.2:8080/api/v1'   // Emulador Android
        : 'http://localhost:8080/api/v1';  // Web / iOS Simulator

const PROD_URL = 'https://swap-service-production.up.railway.app/api/v1';

export const API_BASE_URL = USAR_LOCAL ? LOCAL_URL : PROD_URL;

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

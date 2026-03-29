/**
 * Interfaz base para todas las respuestas provenientes del Backend.
 * @template T - El tipo de dato que esperamos recibir dentro de 'data'
 */
export interface ApiResponse<T = any> {
    /** 
     * Booleano para saber rápidamente si la petición fue exitosa (2xx) o si fracasó.
     */
    success: boolean;
    
    /** 
     * El cuerpo de datos entregado por el Backend. Si success es falso, puede venir null/undefined.
     */
    data?: T;

    /** 
     * Mensaje de éxito o detalle del error desde el Backend. Útil para mostrar en Toasts o Alertas a los usuarios.
     */
    message?: string;

    /** 
     * Errores de validación específicos u otra respuesta estandar de error (HTTP statusCode, trazas, etc).
     */
    error?: string | null | any;
}

// Modelos Base de la Aplicación

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: 'cliente' | 'negocio';
    avatarUrl?: string;
    token?: string;
}

export interface UbicacionFija {
    latitud: number;
    longitud: number;
    direccionFisica?: string;
}

export interface Plato {
    id: string;
    empresaId: string;
    nombrePlato: string;
    nombreRestaurante: string;
    precio?: number; // Opcional, según diseño
    imagenUri: string;
    activo: boolean; // Para activar/desactivar en la fase de gestión
    createdAt?: string;
}

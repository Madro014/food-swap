/**
 * CONTRATOS COMPARTIDOS ENTRE FRONTEND Y BACKEND
 *
 * Estos tipos reflejan exactamente la forma de los datos que el backend Go retorna.
 * No modificar el naming de los campos —  están alineados con los JSON tags del backend.
 */

// ---------------------------------------------------------------------------
// Respuesta base (APIResponse del backend Go)
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
    /** true si el status HTTP fue 2xx */
    success: boolean;
    /** Código HTTP numérico incluido por el backend */
    status?: number;
    /** Mensaje de éxito o descripción del error */
    message?: string;
    /** Payload principal de la respuesta */
    data?: T;
    /** Errores de validación u otros detalles de error */
    errors?: string | null | unknown;
}

// ---------------------------------------------------------------------------
// Auth — Usuario (cliente)
// ---------------------------------------------------------------------------

/** Datos devueltos al hacer login como usuario */
export interface LoginData {
    token: string;
    token_type: string;
    expires_in: number;
    actor_type: string;
    user: UsuarioInfo;
}

export interface UsuarioInfo {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

/** Datos devueltos al registrar un usuario */
export interface RegistroUsuarioData {
    id: string;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
}

// ---------------------------------------------------------------------------
// Auth — Empresa (negocio)
// ---------------------------------------------------------------------------

/** Datos devueltos al hacer login como empresa */
export interface LoginEmpresaData {
    token: string;
    token_type: string;
    expires_in: number;
    actor_type: string;
    company: EmpresaInfo;
}

export interface EmpresaInfo {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: string;
    lat: number;
    lng: number;
    logo_url?: string;
}

/** Datos devueltos al registrar una empresa */
export interface RegistroEmpresaData {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: string;
    lat: number;
    lng: number;
    created_at: string;
}

// ---------------------------------------------------------------------------
// Modelos de UI (adaptados para el frontend)
// Estos son los tipos que usa el frontend internamente — son una capa de mapeo
// sobre los datos del backend.
// ---------------------------------------------------------------------------

/** Usuario genérico para el AuthStore — agnóstico al rol */
export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: 'cliente' | 'negocio';
    avatarUrl?: string;
    token: string;
}

export interface UbicacionFija {
    latitud: number;
    longitud: number;
    direccionFisica?: string;
}

// ---------------------------------------------------------------------------
// Platos — Datos del backend (snake_case tal como los devuelve la API)
// ---------------------------------------------------------------------------

/** Plato tal como lo devuelve el backend */
export interface PlatoBackend {
    id: string;
    company_id: string;
    name: string;
    description?: string;
    price?: number;
    photo_url: string;
    is_active: boolean;
    created_at?: string;
}

/** Plato enriquecido del feed (con datos de la empresa anidados) */
export interface FeedPlatoItem {
    id: string;
    name: string;
    description?: string;
    price?: number;
    photo_url: string;
    company: {
        name: string;
        distance_km: number;
        address: string;
        logo_url?: string;
    };
}

/** Plato en el formato que usa el frontend (para compatibilidad con el resto del código) */
export interface Plato {
    id: string;
    empresaId: string;
    nombrePlato: string;
    nombreRestaurante: string;
    precio?: number;
    imagenUri: string;
    descripcion?: string;
    activo: boolean;
    createdAt?: string;
}

/** Helper: convierte un PlatoBackend al formato Plato del frontend */
export function mapPlatoBackendToPlato(p: PlatoBackend, nombreRestaurante = ''): Plato {
    return {
        id: p.id,
        empresaId: p.company_id,
        nombrePlato: p.name,
        nombreRestaurante,
        precio: p.price,
        imagenUri: p.photo_url,
        descripcion: p.description,
        activo: p.is_active,
        createdAt: p.created_at,
    };
}

// ---------------------------------------------------------------------------
// Sesiones de swipe
// ---------------------------------------------------------------------------

export interface SesionData {
    session_id: string;
    user_id: string;
    user_lat: number;
    user_lng: number;
    radius_km: number;
    status: string;
    started_at: string;
}

export interface FeedData {
    session_id: string;
    user_lat: number;
    user_lng: number;
    radius_km: number;
    dishes: FeedPlatoItem[];
}

export interface PaginationMeta {
    page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

export interface PaginatedResponse<T> {
    data: T;
    meta: PaginationMeta;
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

export interface PresignedURLData {
    url: string;
    fields: {
        api_key: string;
        timestamp: string;
        public_id: string;
        signature: string;
        quality?: string;
        fetch_format?: string;
        [key: string]: string | undefined;
    };
    public_id: string;
    expires_at: number;
}

export interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
    [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Perfiles
// ---------------------------------------------------------------------------

export interface UserProfileBackend {
    id: string;
    name: string;
    email: string;
    phone?: string;
    created_at: string;
}

export interface CompanyProfileBackend {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address: string;
    lat: number;
    lng: number;
    logo_url?: string;
    created_at: string;
}

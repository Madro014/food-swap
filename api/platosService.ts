import { Platform } from 'react-native';
import { API_BASE_URL, getAuthHeaders } from './config';
import type { ApiResponse, Plato, PlatoBackend, PresignedURLData, CloudinaryResponse } from './contracts/api';
import { mapPlatoBackendToPlato as mapPlato } from './contracts/api';

// ---------------------------------------------------------------------------
// Servicio de Platos
// ---------------------------------------------------------------------------

export const platosService = {
    /**
     * Crea un nuevo plato para la empresa autenticada.
     *
     * Flujo en dos pasos:
     * 1. Sube la imagen a Cloudinary vía POST /api/v1/upload (multipart/form-data)
     * 2. Crea el plato con la URL pública vía POST /api/v1/dishes (JSON + Bearer token)
     *
     * POST /api/v1/upload
     * POST /api/v1/dishes
     */
    crearPlato: async (
        token: string,
        nombrePlato: string,
        precio: number,
        imagenUri: string | null,
        descripcion?: string,
    ): Promise<ApiResponse<Plato>> => {
        try {
            let photoUrl = '';

            // Paso 1: subir imagen si existe mediante Presigned URL
            if (imagenUri) {
                // 1.1 Obtener la URL y los parámetros de Cloudinary firmados por nuestro backend Go
                const signatureRes = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
                    method: 'POST',
                    headers: getAuthHeaders(token),
                    body: JSON.stringify({
                        file_name: 'foto.jpg',
                        file_type: 'image/jpeg',
                        folder: 'dishes',
                    })
                });
                const signatureJson = await signatureRes.json();
                
                if (!signatureJson.success || !signatureJson.data) {
                    return { success: false, message: 'No se pudo generar la firma para subir imagen', errors: signatureJson.errors };
                }

                const cloudinaryData = signatureJson.data as PresignedURLData;
                
                // 1.2 Construir FormData inyectando todos los "fields" devueltos por el backend y finalmente la imagen.
                const formData = new FormData();
                Object.entries(cloudinaryData.fields).forEach(([key, value]) => {
                    if (value !== undefined) {
                        formData.append(key, value);
                    }
                });

                let fileToUpload: any;
                if (Platform.OS === 'web') {
                    // En la web, fetch extrae correctamente el Blob desde la URI de Expo (base64/blob)
                    const res = await fetch(imagenUri);
                    const blob = await res.blob();
                    // Append blob natively in web
                    formData.append('file', blob, 'foto.jpg');
                } else {
                    // En React Native (iOS/Android), los archivos se adjuntan así:
                    fileToUpload = {
                        uri: imagenUri,
                        name: 'foto.jpg',
                        type: 'image/jpeg',
                    };
                    formData.append('file', fileToUpload as unknown as Blob);
                }

                // 1.3 Hacer subida directa pesada hacia Cloudinary
                const directUploadRes = await fetch(cloudinaryData.url, {
                    method: 'POST',
                    // No pasamos Auth porque no es nuestro backend, sino la API pública directa
                    body: formData,
                });
                
                if (!directUploadRes.ok) {
                    return { success: false, message: 'Error directo en Cloudinary al subir imagen' };
                }
                
                const uploadJson = (await directUploadRes.json()) as CloudinaryResponse;
                photoUrl = uploadJson.secure_url;
            }

            // Paso 2: crear el plato con la URL pública
            const res = await fetch(`${API_BASE_URL}/dishes`, {
                method: 'POST',
                headers: getAuthHeaders(token),
                body: JSON.stringify({
                    name: nombrePlato,
                    description: descripcion ?? '',
                    price: precio,
                    photo_url: photoUrl,
                }),
            });
            const json = await res.json();
            if (!json.success || !json.data) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            return {
                success: true,
                message: json.message,
                data: mapPlato(json.data as PlatoBackend),
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Lista todos los platos de la empresa autenticada (activos e inactivos).
     * El backend infiere el empresaId desde el JWT, no hace falta pasarlo.
     *
     * GET /api/v1/dishes
     */
    listarPlatosNegocio: async (token: string): Promise<ApiResponse<Plato[]>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/dishes`, {
                method: 'GET',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            if (!json.success) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            const platos: Plato[] = (json.data?.dishes ?? []).map((p: PlatoBackend) => mapPlato(p));
            return { success: true, message: json.message, data: platos };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
<<<<<<< HEAD
     * Lista solo los platos activos de la empresa autenticada.
     *
     * GET /api/v1/dishes/active
     */
    listarPlatosActivos: async (token: string): Promise<ApiResponse<Plato[]>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/dishes/all`, {
                method: 'GET',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            if (!json.success) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            const platos: Plato[] = (json.data?.dishes ?? []).map((p: PlatoBackend) => mapPlato(p));
            return { success: true, message: json.message, data: platos };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
=======
>>>>>>> origin/main
     * Actualiza los datos de un plato existente.
     * Envía solo los campos que cambiaron (partial update).
     *
     * PUT /api/v1/dishes/:platoId
     */
    editarPlato: async (
        token: string,
        platoId: string,
        payload: { nombre?: string; descripcion?: string; precio?: number; imagenUri?: string },
    ): Promise<ApiResponse<Plato>> => {
        try {
            const body: Record<string, unknown> = {};
            if (payload.nombre !== undefined) body.name = payload.nombre;
            if (payload.descripcion !== undefined) body.description = payload.descripcion;
            if (payload.precio !== undefined) body.price = payload.precio;
            if (payload.imagenUri !== undefined) body.photo_url = payload.imagenUri;

            const res = await fetch(`${API_BASE_URL}/dishes/${platoId}`, {
                method: 'PUT',
                headers: getAuthHeaders(token),
                body: JSON.stringify(body),
            });
            const json = await res.json();
            if (!json.success || !json.data) {
                return { success: false, status: json.status, message: json.message, errors: json.errors };
            }
            return {
                success: true,
                message: json.message,
                data: mapPlato(json.data as PlatoBackend),
            };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },

    /**
     * Activa o desactiva un plato sin eliminarlo del historial.
     *
     * PATCH /api/v1/dishes/:platoId/toggle
     */
    cambiarEstadoPlato: async (
        token: string,
        platoId: string,
    ): Promise<ApiResponse<{ id: string; is_active: boolean; status: string }>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/dishes/${platoId}/toggle`, {
                method: 'PATCH',
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
     * Elimina permanentemente un plato.
     *
     * DELETE /api/v1/dishes/:platoId
     */
    eliminarPlato: async (token: string, platoId: string): Promise<ApiResponse<void>> => {
        try {
            const res = await fetch(`${API_BASE_URL}/dishes/${platoId}`, {
                method: 'DELETE',
                headers: getAuthHeaders(token),
            });
            const json = await res.json();
            return { success: json.success ?? false, message: json.message, errors: json.errors };
        } catch (error) {
            return { success: false, message: 'Error de conexión con el servidor', errors: String(error) };
        }
    },
};

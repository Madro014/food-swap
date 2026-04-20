import { Platform } from 'react-native';
import { API_BASE_URL, getAuthHeaders } from './config';
import type { PresignedURLData, CloudinaryResponse } from './contracts/api';

export const uploadService = {
    /**
     * Sube una imagen a Cloudinary usando una URL pre-firmada obtenida del backend.
     * @param token Token de autenticación para obtener la firma
     * @param imagenUri URI local de la imagen (de ImagePicker)
     * @param folder Carpeta en Cloudinary ('dishes', 'profiles', etc.)
     */
    subirImagen: async (
        token: string,
        imagenUri: string,
        folder: string = 'profiles'
    ): Promise<string | null> => {
        try {
            // 1. Obtener URL pre-firmada y campos del backend
            const signatureRes = await fetch(`${API_BASE_URL}/upload/presigned-url`, {
                method: 'POST',
                headers: getAuthHeaders(token),
                body: JSON.stringify({
                    file_name: 'upload.jpg',
                    file_type: 'image/jpeg',
                    folder: folder,
                })
            });
            
            const signatureJson = await signatureRes.json();
            if (!signatureJson.success || !signatureJson.data) {
                console.error('Error al obtener firma de upload:', signatureJson.message);
                return null;
            }

            const cloudinaryData = signatureJson.data as PresignedURLData;
            
            // 2. Preparar FormData para subida directa a Cloudinary
            const formData = new FormData();
            Object.entries(cloudinaryData.fields).forEach(([key, value]) => {
                if (value !== undefined) {
                    formData.append(key, value);
                }
            });

            if (Platform.OS === 'web') {
                const res = await fetch(imagenUri);
                const blob = await res.blob();
                formData.append('file', blob, 'upload.jpg');
            } else {
                const fileToUpload = {
                    uri: imagenUri,
                    name: 'upload.jpg',
                    type: 'image/jpeg',
                };
                formData.append('file', fileToUpload as unknown as Blob);
            }

            // 3. Subida directa a Cloudinary
            const directUploadRes = await fetch(cloudinaryData.url, {
                method: 'POST',
                body: formData,
            });
            
            if (!directUploadRes.ok) {
                console.error('Error en Cloudinary:', await directUploadRes.text());
                return null;
            }
            
            const uploadJson = (await directUploadRes.json()) as CloudinaryResponse;
            return uploadJson.secure_url;
        } catch (error) {
            console.error('Error en proceso de subida:', error);
            return null;
        }
    }
};
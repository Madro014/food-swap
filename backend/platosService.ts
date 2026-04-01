import { ApiResponse, Plato } from './contracts/api';

/**
 * SERVICIOS DE PLATOS (MENÚ Y GESTIÓN)
 *
 * PARA EL COMPAÑERO DE BACKEND:
 * - Los platos incluyen imágenes, por lo tanto en `crearPlato` y `editarPlato`, tendrás que
 *   probablemente implementar o recibir peticiones `multipart/form-data` para adjuntar el archivo blob/File
 *   en vez de un json básico.
 */

export const platosService = {

  /**
   * Crear un nuevo plato en servidor.
   * Jira: "Empresa registra plato con foto, nombre y precio"
   * 
   * @param imagenUri Es importante transformarlo o inyectarlo como File a tu `FormData`.
   */
  crearPlato: async (empresaId: string, nombreRestaurante: string, nombrePlato: string, precio: number, imagenUri: string | null): Promise<ApiResponse<Plato>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Si estamos en RN, el frontend construirá un objeto formData 
    // formData.append('foto', { uri: imagenUri, name: 'foto.jpg', type: 'image/jpeg' })
    // formData.append('nombre', nombrePlato)... etc.
    // Recibe esto en el servidor, guárdalo (ej. AWS S3 o carpeta estática) y devuelve la URL remota.
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => {
        const nuevoPlato: Plato = {
          id: Math.random().toString(36).substring(7),
          empresaId,
          nombreRestaurante,
          nombrePlato,
          precio,
          imagenUri: imagenUri || 'https://via.placeholder.com/300',
          activo: true,
          createdAt: new Date().toISOString()
        };
        resolve({
          success: true,
          message: "Plato subido y registrado con éxito",
          data: nuevoPlato
        });
      }, 1000);
    });
  },

  /**
   * Listar todos los platos asociados al perfil de empresa activo.
   * Jira: "Listar platos de empresa" (Ver todos los platos registrados).
   */
  listarPlatosNegocio: async (empresaId: string): Promise<ApiResponse<Plato[]>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Realizar GET a /api/platos?empresaId=X
    // -----------------------------------------------------
    return new Promise((resolve) => resolve({
        success: true,
        data: [] // Devuelve mock vacío o rellénalo si quieres probar en memoria
    }));
  },

  /**
   * Actualizar un plato.
   * Jira: "Editar plato" (Actualizar datos de un plato existente)
   */
  editarPlato: async (platoId: string, payloadPatch: Partial<Plato>): Promise<ApiResponse<Plato>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Endpoint PATCH o PUT con datos actualizados.
    // -----------------------------------------------------
    return new Promise(resolve => resolve({
        success: true,
        message: "Plato actualizado"
    }));
  },

  /**
   * Ocultar o Activar plato sin eliminarlo del historial.
   * Jira: "Activar / desactivar plato" (Control de disponibilidad sin borrar historial)
   */
  cambiarEstadoPlato: async (platoId: string, activo: boolean): Promise<ApiResponse<boolean>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Endpoint PATCH enfocado solo al booleano. Status 200 y confirmación true/false
    // -----------------------------------------------------
    return new Promise(resolve => resolve({
        success: true,
        message: activo ? "Plato marcado como Disponible" : "Plato Ocultado al público",
        data: activo
    }));
  }

};

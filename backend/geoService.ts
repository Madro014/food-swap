import { ApiResponse, Plato } from './contracts/api';

/**
 * SERVICIOS DE GEOLOCALIZACIÓN Y SWIPE
 *
 * PARA EL COMPAÑERO DE BACKEND:
 * - El sistema central de la app reside en un algoritmo geo-espacial.
 * - Necesitamos usar PostgreSQL/PostGIS u otra tecnología para devolver resultados basados 
 *   en "ST_Distance" filtrando platos activos de restaurantes cercanos al cliente.
 */

export const geoService = {
  
  /**
   * Empieza la sesión guardando la locación del cliente.
   * Jira: "Iniciar sesión de swipe" (Usuario activa GPS y define radio de búsqueda)
   */
  iniciarSesionSwipe: async (usuarioId: string, latitud: number, longitud: number, radioBuscadoKms: number): Promise<ApiResponse<boolean>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Guardar o actualizar "punto central" del usuario 
    // y almacenar en cache o base de datos que este id ha empezado sesion en [lat,lng] con radio R.
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        success: true,
        message: "Sesión de swipe inicializada y GPS fijado",
        data: true
      }), 500);
    });
  },

  /**
   * Devuelve un arreglo paginado de los Platos en ese radio de km.
   * Jira: "Obtener platos cercanos" (Feed de platos dentro del radio definido)
   */
  obtenerPlatosCercanos: async (usuarioId: string, limite: number = 10, offset: number = 0): Promise<ApiResponse<Plato[]>> => {
    // -----------------------------------------------------
    // TODO BACKEND: GET /api/feed/cercanos?usuarioId=X&limite=10
    // Backend debe calcular los platos de empresas que se sitúan DENTRO del radio
    // previamente guardado en iniciarSesionSwipe(), y que además el plato.activo === true.
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        success: true,
        data: [] // mock arrays
      }), 1200);
    });
  }

};

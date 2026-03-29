import { ApiResponse, Usuario, UbicacionFija } from '../compartido/tipos/api';

/**
 * SERVICIOS DE AUTENTICACION
 *
 * PARA EL COMPAÑERO DE BACKEND:
 * - Toda la UI del Frontend ahora depende de objetos de retorno estandarizados `ApiResponse`.
 * - Cada función aquí simula el retardo, pero la idea es que modifiques el interior para hacer:
 *   `const response = await fetch(API_URL, ...); return await response.json();`
 * - Asegurarse que el backend responda con éxito, los datos del usuario en "data" (y adjuntar el token),
 *   un mensaje opcional, o el listado de errores estructurados.
 */

export const authService = {
  
  /**
   * Registro estándar para un Cliente final.
   * Creado a partir del caso de Jira: "Crear cuenta con nombre, email y contraseña"
   */
  registroUsuario: async (nombre: string, email: string, contrasena: string): Promise<ApiResponse<Usuario>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Realizar aquí tu petición real
    // Ejemplo de Body a enviar: JSON.stringify({ nombre, email, password: contrasena })
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Usuario registrado correctamente",
          data: { id: 'u1', nombre, email, rol: 'cliente', token: 'fake-jwt-token' }
        });
      }, 1000);
    });
  },

  /**
   * Login universal (u orientado a Cliente)
   * Jira: "Autenticar con email y contraseña"
   */
  loginUsuario: async (email: string, contrasena: string): Promise<ApiResponse<Usuario>> => {
    // -----------------------------------------------------
    // TODO BACKEND: POST a /api/auth/login o similar
    // Si la contraseña no coincide devolver { success: false, message: "Credenciales inválidas" }
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Sesión iniciada con éxito",
          // Extraemos nombre del email como mock
          data: { id: 'u1', nombre: email.split('@')[0], email, rol: 'cliente', token: 'fake-jwt-token' }
        });
      }, 800);
    });
  },

  /**
   * Registro avanzado para Empresa (Negocio).
   * Jira: "Empresa crea cuenta con datos y ubicación fija"
   * 
   * @param form Object con datos básicos corporativos
   * @param ubicacion Sus coordenadas / dirección
   */
  registroNegocio: async (form: { nombreEmpresa: string; email: string; contrasena: string; }, ubicacion: UbicacionFija): Promise<ApiResponse<Usuario>> => {
    // -----------------------------------------------------
    // TODO BACKEND: Recibir ambos objetos y guardar el local/negocio asociado a un User (o su propia tabla)
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Restaurante registrado exitosamente",
          data: { id: 'n1', nombre: form.nombreEmpresa, email: form.email, rol: 'negocio', token: 'fake-jwt-token' }
        });
      }, 1200);
    });
  },

  /**
   * Login específico de Empresa.
   * Jira: "Acceso al panel de gestión de platos"
   */
  loginNegocio: async (email: string, contrasena: string): Promise<ApiResponse<Usuario>> => {
    // -----------------------------------------------------
    // TODO BACKEND: POST de autenticación para roles de empresa
    // -----------------------------------------------------
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        success: true,
        message: "Bienvenido al panel del restaurante",
        data: { id: 'n1', nombre: 'Restaurante Mock', email, rol: 'negocio', token: 'fake-jwt-token' }
      }), 800);
    });
  }

};

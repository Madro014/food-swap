import { create } from 'zustand';

// definimos cómo se ve un Plato para TypeScript
export interface PlatoType {
    id: string;
    nombre: string;
    restaurante: string;
    foto: string;
    lat: number;
    lon: number;
    distancia: number;
    precio: number;
    descripcion: string;
}

// asi será la memoria de nuestra tienda
interface MatchesStore {
    matches: PlatoType[];         // lista de los platos que te gustaron
    sessionId: string | null;     // ID de sesión actual
    agregarMatch: (plato: PlatoType, sessionId: string) => void; // funcion para añadir uno nuevo
    limpiarMatches: () => void;   // funcion para borrarlos todos (opcional)
}

// creamos la "caja fuerte" que guarda nuestros matches disponibles en toda la app
export const useMatchesStore = create<MatchesStore>((set) => ({
    matches: [], 
    sessionId: null,

    agregarMatch: (plato, sessionId) =>
        set((estadoActual) => {
            // Si la sesión cambió, resetear y añadir el primero
            if (estadoActual.sessionId !== sessionId) {
                return { 
                    matches: [plato], 
                    sessionId: sessionId 
                };
            }

            // Límite estricto de 3 matches
            if (estadoActual.matches.length >= 3) {
                return estadoActual;
            }

            // Evitar duplicados
            const yaExiste = estadoActual.matches.some(p => p.id === plato.id);
            if (yaExiste) return estadoActual;

            return { 
                matches: [plato, ...estadoActual.matches],
                sessionId: sessionId
            };
        }),

    limpiarMatches: () => set({ matches: [], sessionId: null })
}));
